import { promises as fs } from "node:fs";
import { join, normalize } from "node:path";
import { minimatch } from "minimatch";
import { StartCleanOptions } from "./type";

const rootDir = process.cwd();

/**
 * 递归查找并删除目标目录
 * @param {string} currentDir - 当前遍历的目录路径
 * @param {string[]} targets - 目标集合
 * @param {string[]} excludes - 排除集合
 */
async function cleanTargetsRecursively(currentDir: string, targets: string[], excludes: string[]) {
    const items = await fs.readdir(currentDir);

    for (const item of items) {
        try {
            const itemPath = join(currentDir, item);
            // 不能是排除文件
            if (!matchPattern(itemPath, excludes)) {
                // 锁定文件
                if (matchPattern(itemPath, targets)) {
                    // 匹配到目标目录或文件时直接删除
                    await fs.rm(itemPath, { force: true, recursive: true });
                    console.log(`\x1B[31m- Deleted: ${itemPath}\x1B[0m`);
                }
                const stat = await fs.lstat(itemPath);
                if (stat.isDirectory()) {
                    await cleanTargetsRecursively(itemPath, targets, excludes);
                }
            } else {
                console.log(`\x1B[32m* Skip: ${itemPath}\x1B[0m`);
            }
        } catch (error) {
            // console.error(`Error handling item ${item} in ${currentDir}: ${error.message}`);
        }
    }
}

/**
 * 匹配排除目录或文件
 * @param {string} itemPath - 当前遍历的目录路径
 * @param {string[]} excludes - 匹配目标
 */
function matchPattern(itemPath: string, excludes: string[]) {
    return excludes.some((pattern) =>
        minimatch(itemPath, pattern, { matchBase: true })
    );
}

/**
 * 全局替换
 * @param {string} root 指定根目录
 * @param {string[]} excludes 排除文件
 * @param {ReplaceTargets} targets 替换集合
 *
 * @description targets => [
 *  {
 *    name: '项目名称（备份用）',
 *    pattern: '匹配模式支持“*”通配符',
 *    target: '目标内容',
 *    replace: '替换内容',
 *    root: '匹配指定目录，不填默认本mjs为根目录目录',
 *    flags: '正则标志不填默认"g"'
 *  }
 * ]
 */
async function startClean(option: StartCleanOptions) {
    const { targets = [], excludes = [], root } = option;
    // 去掉node和文件路径
    const args = process.argv.slice(2);
    const rootPath = args.find((arg) => arg.startsWith("--root"))?.split("=")[1];
    const rootSrc = root || normalize(rootPath || "") || rootDir;

    const deleteLockFile = process.argv.includes("--del-lock");
    const cleanupTargets = [...targets];
    if (deleteLockFile) {
        cleanupTargets.push("pnpm-lock.yaml");
        // cleanupTargets.push("package-lock.json");
    }

    console.log(`\x1B[46mStarting cleanup.\x1B[0m`);
    console.log();
    console.log(`\x1B[36mTargets: ${cleanupTargets.join(", ")}\x1B[0m`);
    console.log(`\x1B[36mRoot: ${rootSrc}\x1B[0m`);
    console.log();

    try {
        await cleanTargetsRecursively(rootSrc, cleanupTargets, excludes);
        console.log();
        console.log("\x1B[32mCleanup process completed.\x1B[0m");
        console.log();
    } catch (error) {
        // console.error(`Unexpected error during cleanup: ${error.message}`);
    }
}

export { startClean };
