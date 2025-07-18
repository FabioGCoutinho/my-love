import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: '0.0.0.0', // Garante que o servidor Vite escuta em todas as interfaces
    port: 5173,      // Opcional, mas boa prática para deixar explícito
    hmr: {
      clientPort: 443, // Importante para HTTPS/WSS no CapRover
      host: 'laylaketna.myfinan.com.br', // Use seu domínio real aqui
      protocol: 'wss', // Use wss para WebSocket Secure
    },
    cors: true, // Habilita CORS para todas as origens (opcional, dependendo da sua necessidade)
    // --- O mais importante para o erro "Blocked request" ---
    fs: {
      strict: true,
      cachedirectory: 'node_modules/.vite', // Adicionado para ambientes de contêiner
      // Adicione seus hosts permitidos aqui
      // server.allowedHosts pode ser um array de strings ou um booleano (true para permitir qualquer host)
      // Para segurança, liste apenas os hosts que você espera que acessem seu Vite.
      // Se tiver subdomínios, liste-os individualmente ou use um wildcard (com cautela).
      // allowedHosts: ['laylaketna.myfinan.com.br', 'localhost', '127.0.0.1'], // Se usar uma lista
      // OU, para simplificar em ambientes controlados como Docker/CapRover:
      allow: ['.'], // Permite acesso a arquivos no diretório atual e seus subdiretórios
    },
    // Removendo allowedHosts conforme a documentação mais recente do Vite
    // a configuração de `fs.allow` é mais comum para controle de acesso a arquivos.
    // Para resolver "Blocked request", o `server.host: '0.0.0.0'` e `server.hmr.host`
    // geralmente são suficientes quando combinados com o `server.fs.allow`.
  },
})
