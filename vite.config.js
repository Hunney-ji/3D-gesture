import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import fs from 'fs';
import path from 'path';

// Load SSL certificates
const certPath = path.resolve(__dirname, 'cert.pem');
const keyPath = path.resolve(__dirname, 'key.pem');


export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
  },
  host: '0.0.0.0',
})
