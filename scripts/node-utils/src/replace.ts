import {
  copyFile,
  existsSync,
  promises as fs,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { minimatch } from 'minimatch';

// 根目录
const rootDir = process.cwd();
// 备份文件名
const backupDir = 'backup_file';
// 当前目录计数
let count = 0;
// 总计数
let allCount = 0;

/**
 * 递归查找并删除目标目录
 * @param {string} currentDir - 当前遍历的目录路径
 */
async function replaceTargetsRecursively(
  currentDir: string,
  targets: ReplaceTargets,
  excludes: string[],
  root?: string,
) {
  const items = await fs.readdir(currentDir);

  for (const item of items) {
    try {
      const itemPath = join(currentDir, item);
      if (!matchPattern(itemPath, excludes)) {
        // 锁定
        const target = findPattern(itemPath, targets);
        // 修改文件
        if (target) await modifyTargetsFile(itemPath, target, root);
        // 目录
        const stat = await fs.lstat(itemPath);
        if (stat.isDirectory()) await replaceTargetsRecursively(itemPath, targets, excludes, root);
      }
    } catch {
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
  return excludes.some((pattern) => minimatch(itemPath, pattern, { matchBase: true }));
}

/**
 * 检出匹配排除目录或文件
 * @param {string} itemPath - 当前遍历的目录路径
 * @param {string[]} targets - 匹配目标
 */
function findPattern(itemPath: string, targets: ReplaceTargets) {
  return targets.find((target) => minimatch(itemPath, target.pattern, { matchBase: true }));
}

/**
 * 修改文件内容
 * @param {string} itemPath - 当前遍历的目录路径
 * @param {object} target - 替换目标
 * @param {string} root - 根目录
 */
async function modifyTargetsFile(itemPath: string, target: ReplaceTarget, root: string = rootDir) {
  // 异步读取文件
  const data = readFileSync(itemPath, 'utf8');
  // 组合正则
  const reg = new RegExp(target.target, 'g');
  if (reg.test(data)) {
    // 备份
    await copyAndBackup(itemPath, root);
    // 修改文件内容
    const modifiedData = data.replace(reg, target.replace);
    // 异步写入新内容到文件
    writeFileSync(itemPath, modifiedData, 'utf8');
    // 替换完成
    console.log(`* Replace: ${itemPath}`);
    // 自增
    count++;
  }
}

/**
 * 确保目录存在
 * @param itemPath - 当前遍历的目录路径
 * @returns
 */
async function ensureDirectoryExistence(itemPath: string) {
  const fileName = dirname(itemPath);
  if (existsSync(fileName)) {
    return true;
  }
  await ensureDirectoryExistence(fileName);
  mkdirSync(fileName);
}

/**
 * 备份
 * @param itemPath - 当前遍历的目录路径
 * @param root - 根目录
 */
async function copyAndBackup(itemPath: string, root: string = rootDir) {
  const date = new Date();
  const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`;
  // 组合正则
  const rootReg = new RegExp(root.replace(/\\/g, '/'), 'g');
  const joinPath = normalize(join(process.cwd(), `/${backupDir}/${dateString}/`));
  const writePath = normalize(itemPath.replace(/\\/g, '/').replace(rootReg, joinPath));
  // 确保目录存在
  await ensureDirectoryExistence(writePath);
  // 备份文件;
  await new Promise((resolve, reject) => {
    copyFile(itemPath, writePath, (error) => {
      if (error) return reject();
      resolve(true);
    });
  });
}

async function startReplace({ targets, excludes, root = rootDir }: StartReplaceOptions) {
  const replaceTargets = [...targets.map((v) => v.pattern)];
  console.log(`\x1B[36m\nTargets: ${replaceTargets.join(', ')}\x1B[0m`);
  console.log(`\x1B[36mRoot: ${root}\x1B[0m`);

  try {
    await replaceTargetsRecursively(root, targets, excludes, root);
    // 输出当前目录计数
    console.log(`'\x1B[32m${root} for ${count} times\n\x1B[0m`);
    // 计入总数
    allCount += count;
    // 清除当前目录计数
    count = 0;
  } catch {
    // console.error(`Unexpected error during replace: ${error.message}`);
  }
}

/**
 * 全局替换
 * @param {ReplaceTargets} root 指定根目录
 * @param {string[]} excludes 排除文件
 * @param {ReplaceTargets} targets 替换集合
 *
 * @description targets => [
 *  {
 *    pattern: '匹配模式支持“*”通配符',
 *    target: '目标内容',
 *    replace: '替换内容',
 *    root: '匹配指定目录，不填默认本mjs为根目录目录',
 *    flags: '正则标志不填默认"g"'
 *  }
 * ]
 */
async function start(option: StartReplaceOptions) {
  const { targets, excludes = [] } = option;
  const roots = targets.filter((f) => f.root);
  const notRoots = targets.filter((f) => !f.root);

  // 加入备份目录
  excludes.push(backupDir);

  if (roots.length) {
    console.warn(`\x1B[46mMultiple directory\x1B[0m`);
    for (const item of roots) {
      await startReplace({ ...option, targets: [item], root: item.root });
    }
    if (notRoots.length) await startReplace({ ...option, targets: notRoots });
  } else {
    console.warn(`\x1B[46mSingle directory\x1B[0m`);
    await startReplace(option);
  }

  console.log(`'\x1B[32m\nThe replace process completed a total of ${allCount} files\n\x1B[0m`);
}

export { start };
