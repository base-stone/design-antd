import { defineConfig } from 'vite'
import shell from 'rollup-plugin-shell'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    shell({
      commands: ['sudo rm -rf dist'],
      hook: 'buildStart'
    }),
    dts({ rollupTypes: true })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'dayjs'],
      output: {
        dir: `./dist`,
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOM",
          "dayjs": "dayjs"
        }
      }
    },
    lib: {
      entry: './src/main.ts',
      name: 'Antd',
      fileName: (format: string) => {
        format = format.replace(/umd/, 'global')
        return `design-antd.${format}.prod.js`
      },
      formats: ['umd', 'es']
    },
    cssCodeSplit: false
  }
})
