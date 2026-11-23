import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    proxy: {
      "/gestioneUtente": "http://localhost:8080",
      "/auth": "http://localhost:8080",
      "/gestioneCartellaClinica": "http://localhost:8080",
      "/gestionePaziente": "http://localhost:8080",
      "/gestionePet": "http://localhost:8080",
      "/gestioneCondivisioneDati": "http://localhost:8080",
      "/gestioneRecensioni": "http://localhost:8080",
      "/reportCliniche": "http://localhost:8080",
      "/analisiDermatologica": "http://localhost:8080",
    }
  }
})
