import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // 开发时用 /，生产构建部署到 GitHub Pages 时用 /meta-create-platform/
  base: mode === 'production' ? '/meta-create-platform/' : '/',
}))
