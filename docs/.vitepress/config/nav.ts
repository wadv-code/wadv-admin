import { type DefaultTheme } from 'vitepress';

/**
 * 导航栏
 * @returns DefaultTheme.SidebarItem[]
 */
export function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Examples', link: '/markdown-examples' },
  ];
}
