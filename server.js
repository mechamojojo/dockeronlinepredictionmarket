// Wrapper simples para iniciar o servidor TypeScript
import { execFile } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  console.log('🚀 Starting CDP SDK Server...');
  console.log('🔧 Node version:', process.version);
  console.log('📁 Working directory:', process.cwd());
  
  const mainTsPath = join(__dirname, 'main.ts');
  console.log('📄 Main file:', mainTsPath);
  
  // Tentar diferentes métodos para executar tsx
  const methods = [
    // Método 1: npx tsx (mais confiável)
    async () => {
      console.log('▶️  Trying: npx tsx main.ts');
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      return execAsync(`npx tsx "${mainTsPath}"`, {
        cwd: __dirname,
        env: process.env,
        stdio: 'inherit'
      });
    },
    // Método 2: tsx direto do node_modules
    async () => {
      const tsxPath = join(__dirname, 'node_modules', '.bin', 'tsx');
      if (existsSync(tsxPath)) {
        console.log('▶️  Trying: node node_modules/.bin/tsx main.ts');
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        return execAsync(`node "${tsxPath}" "${mainTsPath}"`, {
          cwd: __dirname,
          env: process.env,
          stdio: 'inherit'
        });
      }
      throw new Error('tsx not found in node_modules');
    }
  ];
  
  for (const method of methods) {
    try {
      await method();
      return; // Sucesso, sair
    } catch (error) {
      console.error('❌ Method failed:', error.message);
      // Tentar próximo método
    }
  }
  
  console.error('❌ All methods failed!');
  process.exit(1);
}

// Tratar erros não capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
