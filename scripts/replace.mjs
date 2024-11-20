import { promises as fs, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

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
      if (!excludes.includes(item)) {
        const target = targets.find((f) => f.filename === item);
        // 锁定
        if (target) await modifyTargetsFile(target, itemPath);
        // 其他
        const stat = await fs.lstat(itemPath);
        if (stat.isDirectory()) {
          await replaceTargetsRecursively(itemPath, targets, excludes);
        }
      }
    } catch(error) {
      // console.error(`Error handling item ${item} in ${currentDir}: ${error.message}`);
    }
  }
}

/**
 * 修改文件内容
 * @param {object} target - 替换目标
 * @param {string} itemPath - 当前遍历的目录路径
 */
async function modifyTargetsFile(target, itemPath) {
  // 异步读取文件
  const data = readFileSync(itemPath, 'utf8');
  // 组合正则
  const reg = new RegExp(target.target, 'g');
  // 修改文件内容
  const modifiedData = data.replace(reg, target.replace);
  // 异步写入新内容到文件
  writeFileSync(itemPath, modifiedData, 'utf8');
  // 替换完成
  console.log(`Replace: ${itemPath}`);
}

(async function startReplace() {
  // 要修改的文件
  /**
   * filename 文件名
   * target 目标字符串
   * replace 替换字符串
   */
  const targets = [
    // 替换成中文
    {
      filename: 'AboutView.vue',
      target: 'This is a about page',
      replace: '这是一个关于我们的页面',
    },
    // 替换成时间
    {
      filename: 'example.txt',
      target: '__today__',
      replace: new Date().toLocaleDateString(),
    },
  ];
  // 排除目录或文件夹
  const excludes = ['node_modules', 'dist', '.turbo', 'dist.zip'];

  const replaceTargets = [...targets.map((v) => v.filename)];

  console.log(`Starting replace of targets: ${replaceTargets.join(', ')} from root: ${rootDir}`);

  try {
    await replaceTargetsRecursively(rootDir, targets, excludes);
    console.log('Replace process completed.');
  } catch (error) {
    // console.error(`Unexpected error during replace: ${error.message}`);
  }
})();
