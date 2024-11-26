import { startClean } from '@wadv/node-utils';

/**
 * 全局替换
 * @param {string} root 指定根目录
 * @param {string[]} excludes 排除文件
 * @param {string[]} targets 替换集合
 */
(async function () {
  // 排除文件
  const excludes = ['**/Outside/node-utils'];
  // 要删除的目录及文件名称
  const targets = [
    'node_modules',
    'backup_file',
    'dist',
    '.turbo',
    'dist.zip',
    'dist.7z',
    'dist.tar',
  ];
  await startClean({
    // 目标集合
    targets,
    // 排除文件
    excludes,
    // 指定目录不填默认"utils"所在为根目录
    // root: "D:\\projects\\Outside\\wadv-admin",
  });
})();
