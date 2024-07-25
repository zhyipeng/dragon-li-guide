import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from 'child_process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'prebuild-script',
      buildStart() {
        execSync('node scripts/gen_data.mjs', { stdio: 'inherit'})
      }
    }
  ],
})
