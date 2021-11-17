import path from 'path'
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
const config = ({ command, mode }: ConfigEnv): UserConfigExport => {
  return defineConfig({
    build: {
      target: 'es2015',
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, './src/main.ts'),
        name: 'PiniaPersistedstatePlugin',
        fileName: `pinia-persistedstate-plugin`
      },
      rollupOptions: {
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            PiniaPersistedstatePlugin: 'PiniaPersistedstatePlugin'
          }
        }
      }
    },
    plugins: [
      dts({
        insertTypesEntry: true,
        copyDtsFiles: false
      })
    ]
  })
}

export default config
