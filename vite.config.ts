import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({ 
  plugins: [react()],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // your backend
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     allowedHosts: [
//       'forklike-unsectarian-madge.ngrok-free.dev',
//       'localhost'
//     ]
//   }
// });
