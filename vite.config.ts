import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteVConsole } from 'vite-plugin-vconsole';
import { visualizer } from 'rollup-plugin-visualizer';
import {resolve} from 'path'

const getCommandParams = () => {
  const {original} = JSON.parse(process.env.npm_config_argv);
  const commandAll = original[0];
  const [_, env] = commandAll.split(':');
  return env || 'test'
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // command vite -> server vite build -> build
  // mode development | production
  console.log('command', command)
  console.log('mode', mode)
  const scriptCommandPrarm = getCommandParams();
  console.log('scriptCommandPrarm', scriptCommandPrarm)
  const isProd = ['prod', 'visualizer'].includes(scriptCommandPrarm)

  return {
    server: {
      hmr: {
        protocol: 'ws',
        host: '127.0.0.1'
      }
    },
    define: {
      'process.env': JSON.stringify({
        __APP_ENV__: scriptCommandPrarm
      }),
    },
    plugins: [
      react(),
      viteVConsole({
        entry: resolve(__dirname, 'src/main.tsx'), // or you can use entry: [path.resolve('src/main.ts')]
        localEnabled: !isProd,
        enabled: !isProd
      }),
      scriptCommandPrarm === 'visualizer' && visualizer()
    ]
  }
})
