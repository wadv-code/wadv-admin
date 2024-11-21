import type { ReplaceTargets } from '../global';
import { startReplace } from '../lib/replace';

(async function () {
  // 排除目录或文件夹
  const excludes: string[] = ['node_modules', 'dist', '.turbo', 'dist.zip', '/utils/src/bin/*'];
  // 要修改的文件
  const targets: ReplaceTargets = [
    // 指定文件
    {
      pattern: '*.{vue,js,ts,jsx,tsx,svelte,astro,html}',
      target: '这是一个关于我们的页面',
      replace: '这是一个关于我们的页面',
    },
    // 替换成时间
    {
      pattern: 'example.txt',
      target: '__today__',
      replace: new Date().toLocaleDateString(),
    },
  ];
  await startReplace({
    targets,
    excludes,
  });
})();
