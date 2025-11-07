// Wrapper para iniciar o servidor TypeScript
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tentar diferentes caminhos para o tsx
const possibleTsxPaths = [
  join(__dirname, 'node_modules', '.bin', 'tsx'),
  join(process.cwd(), 'node_modules', '.bin', 'tsx'),
  'tsx' // Fallback para npx
];

let tsxPath = possibleTsxPaths.find(path => {
  if (path === 'tsx') return true; // npx vai resolver
  return existsSync(path);
}) || 'tsx';

const mainTsPath = join(__dirname, 'main.ts');

console.log('🚀 Starting CDP SDK Server...');
console.log('📍 TSX path:', tsxPath);
console.log('📄 Main file:', mainTsPath);
console.log('🔧 Node version:', process.version);

// Usar node para executar tsx diretamente ou npx como fallback
const command = tsxPath === 'tsx' ? 'npx' : 'node';
const args = tsxPath === 'tsx' ? ['tsx', mainTsPath] : [tsxPath, mainTsPath];

console.log('▶️  Executing:', command, args.join(' '));

const child = spawn(command, args, {
  stdio: 'inherit',
  env: { ...process.env },
  cwd: __dirname
});

child.on('error', (error) => {
  console.error('❌ Error starting server:', error);
  console.error('💡 Trying alternative method...');
  // Fallback: tentar com npx diretamente
  const fallback = spawn('npx', ['tsx', mainTsPath], {
    stdio: 'inherit',
    env: process.env,
    cwd: __dirname
  });
  
  fallback.on('error', (err) => {
    console.error('❌ Fallback also failed:', err);
    process.exit(1);
  });
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code}`);
  }
  process.exit(code || 0);
});

