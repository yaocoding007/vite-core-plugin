import type { Plugin } from 'vite';

import { ResolvedConfig } from 'vite';


export interface viteVConsoleOptions {
    entry: string[] | string; // entry file
    localEnabled?: boolean; // serve dev enabled
    enabled?: boolean; // enabled
    config?: voption; // vconsole option
  }
  
  export interface voption {
    defaultPlugins?: string[];
    onReady?: () => void;
    onClearLog?: () => void;
    maxLogNumber?: number;
    disableLogScrolling?: boolean;
    theme?: 'light' | 'dark';
  }

export function viteVConsole(opt: viteVConsoleOptions): Plugin {
  let viteConfig: ResolvedConfig;
  let isDev = false;
  const { entry, enabled = true, localEnabled = false, config = {} } = opt;

  // Compatible to solve the windows path problem
  let entryPath = Array.isArray(entry) ? entry : [entry];
  if (process.platform === 'win32')
    entryPath = entryPath.map((item) => item.replace(/\\/g, '/'));

  return {
    name: 'vite:vconsole',
    /**
    	一个 Vite 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）来调整它的应用顺序。enforce 的值可以是pre 或 post。解析后的插件将按照以下顺序排列：
      1. Alias
      2. 带有 enforce: 'pre' 的用户插件
      3. Vite 核心插件
      4. 没有 enforce 值的用户插件
      5. Vite 构建用的插件
    	6.  带有 enforce: 'post' 的用户插件
      7. Vite 后置构建插件（最小化，manifest，报告）
    */
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      isDev = viteConfig.command === 'serve';
    },
    transform(_source: string, id: string) {
      if (entryPath.includes(id) && localEnabled && isDev) {
        // serve dev
        return `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          config
        )});/* eslint-enable */${_source}`;
      }
      if (entryPath.includes(id) && enabled && !isDev) {
        // build prod
        return `/* eslint-disable */;import VConsole from 'vconsole';new VConsole(${JSON.stringify(
          config
        )});/* eslint-enable */${_source}`;
      }
      return _source;
    }
  };
}