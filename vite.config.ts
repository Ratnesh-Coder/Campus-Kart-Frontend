import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({ 
  plugins: [react()],
})




// import { defineConfig } from 'vite'

// export default defineConfig({
//   server: {
//     host: true, // allow network access
//     port: 3000,
//     strictPort: false,
//     allowedHosts: [
//       'forklike-unsectarian-madge.ngrok-free.dev', // ngrok URL
//     ],
//   },
// })
