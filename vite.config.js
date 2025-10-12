import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

// Function to get all HTML files recursively
function getHtmlFiles(dir, baseDir = dir) {
  let files = {}
  const items = readdirSync(dir)
  
  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      Object.assign(files, getHtmlFiles(fullPath, baseDir))
    } else if (item.endsWith('.html')) {
      const relativePath = fullPath.substring(baseDir.length + 1)
      const name = relativePath.replace(/\.html$/, '').replace(/\//g, '_')
      files[name] = resolve(fullPath)
    }
  }
  
  return files
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getHtmlFiles('.'),
    },
  },
})
