import { promises as fs, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { minimatch } from 'minimatch';

const rootDir = process.cwd();

/**
 * 递归查找并删除目标目录
 * @param {string} currentDir - 当前遍历的目录路径
 */
async function replaceTargetsRecursively(currentDir, targets, excludes) {
  const items = await fs.readdir(currentDir);

  for (const item of items) {
    try {
      const itemPath = join(currentDir, item);
      if (!matchPattern(itemPath, excludes)) {
        // 锁定
        const target = findPattern(itemPath, targets);
        // 修改文件
        if (target) modifyTargetsFile(itemPath, target);
        // 目录
        const stat = await fs.lstat(itemPath);
        if (stat.isDirectory()) await replaceTargetsRecursively(itemPath, targets, excludes);
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
function matchPattern(itemPath, excludes) {
  return excludes.some((pattern) => minimatch(itemPath, pattern, { matchBase: true, nodir: true }));
}

/**
 * 检出匹配排除目录或文件
 * @param {string} itemPath - 当前遍历的目录路径
 * @param {string[]} targets - 匹配目标
 */
function findPattern(itemPath, targets) {
  return targets.find((target) =>
    minimatch(itemPath, target.pattern, { matchBase: true, nodir: true }),
  );
}

/**
 * 修改文件内容
 * @param {string} itemPath - 当前遍历的目录路径
 * @param {object} target - 替换目标
 */
function modifyTargetsFile(itemPath, target) {
  // 异步读取文件
  const data = readFileSync(itemPath, 'utf8');
  // 组合正则
  const reg = new RegExp(target.target, 'g');
  if (reg.test(data)) {
    // 修改文件内容
    const modifiedData = data.replace(reg, target.replace);
    // 异步写入新内容到文件
    writeFileSync(itemPath, modifiedData, 'utf8');
    // 替换完成
    console.log(`* Replace: ${itemPath}`);
  }
}

(async function startReplace() {
  // 要修改的文件
  /**
   * pattern 匹配名称或者模式
   * target 目标字符串
   * replace 替换字符串
   */
  const targets = [
    // 指定文件
    {
      pattern: '*.{vue,js,ts,jsx,tsx,svelte,astro,html}',
      target: 'This is a about page',
      replace: '这是一个关于我们的页面',
    },
    // 替换成时间
    {
      pattern: 'example.txt',
      target: '__today__',
      replace: new Date().toLocaleDateString(),
    },
  ];
  // 排除目录或文件夹
  const excludes = ['node_modules', 'dist', '.turbo', 'dist.zip'];

  const replaceTargets = [...targets.map((v) => v.pattern)];

  console.log(`Starting replace of targets: ${replaceTargets.join(', ')} from root: ${rootDir}\n`);

  try {
    await replaceTargetsRecursively(rootDir, targets, excludes);
    console.log('\nReplace process completed.');
  } catch {
    // console.error(`Unexpected error during replace: ${error.message}`);
  }
})();
