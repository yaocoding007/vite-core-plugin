import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteVConsole } from 'vite-plugin-vconsole';
import { visualizer } from 'rollup-plugin-visualizer';
import {resolve} from 'path'
import SetEnvByCommandArg, { getCommandArgv } from 'vite-plugin-env-command';

import DemoPlugin from './demo-plugin'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // command vite -> server|build
  // mode development | production
  console.log('command', command)
  console.log('mode', mode)
  const scriptCommandArg = getCommandArgv();
  console.log('scriptCommandPrarm', scriptCommandArg)
  const isProd = ['prod', 'visualizer'].includes(scriptCommandArg)

  return {
    plugins: [
      react(),
      viteVConsole({
        entry: resolve(__dirname, 'src/main.tsx'), // or you can use entry: [path.resolve('src/main.ts')]
        localEnabled: !isProd,
        enabled: !isProd
      }),
      scriptCommandArg === 'visualizer' && visualizer(),
      DemoPlugin(),
      SetEnvByCommandArg({})
    ]
  }
})
