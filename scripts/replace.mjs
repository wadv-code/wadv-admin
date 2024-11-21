import { start } from '@wadv/utils/lib';

/**
 * 全局替换
 * @param {ReplaceTargets} root 指定根目录
 * @param {string[]} excludes 排除文件
 * @param {ReplaceTargets} targets 替换集合
 * @description targets => [
 *  {
 *    pattern: '匹配模式支持“*”通配符',
 *    target: '目标内容',
 *    replace: '替换内容',
 *    root: '选填：匹配指定目录，不填默认"root"或"replace.mjs"为相对目录',
 *    flags: '正则标志不填默认"g"'
 *  }
 * ]
 */
(async function () {
  // 排除目录或文件夹
  const excludes = [
    'node_modules',
    'dist',
    '.turbo',
    'dist.zip',
    // 排除自身
    'replace.mjs',
  ];
  // 要修改的文件
  const targets = [
    // 指定文件
    {
      pattern: '*.{vue,js,ts,jsx,tsx,svelte,astro,html}',
      target: 'This is a about page',
      replace: '这是一个关于我们的页面',
      // root: 'C:/Users/laptop/Desktop/utils', 指定目录
    },
    // 替换成时间
    {
      pattern: 'example.txt',
      target: '__today__',
      replace: new Date().toLocaleDateString(),
      // root: 'C:/Users/laptop/Desktop/utils', 指定目录
    },
  ];
  await start({
    // 目标集合
    targets,
    // 排除文件
    excludes,
    // 指定目录不填默认"replace.mjs"所在为根目录
    // root: undefined,
  });
})();
