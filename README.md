# CDP SDK Example Server

Servidor HTTP para acessar o CDP SDK remotamente.

## Instalação

```bash
npm install
```

## Configuração

O servidor está configurado para ouvir em `0.0.0.0`, o que permite acesso de outras máquinas na rede.

### Variáveis de Ambiente (opcional)

Crie um arquivo `.env` para configurar:

```env
PORT=3000
HOST=0.0.0.0
```

## Como Executar

```bash
npm start
```

Para desenvolvimento com auto-reload:

```bash
npm run dev
```

## Acessando o Servidor

### Localmente
- http://localhost:3000

### De Outras Máquinas

1. **Descubra o IP da sua máquina:**
   - macOS/Linux: `ifconfig` ou `ip addr`
   - Windows: `ipconfig`
   
2. **Acesse usando o IP:**
   - http://SEU_IP:3000
   - Exemplo: http://192.168.1.100:3000

### Configuração do Firewall

Se não conseguir acessar de outras máquinas, pode ser necessário permitir a porta no firewall:

**macOS:**
```bash
# Permitir conexões na porta 3000
sudo pfctl -f /etc/pf.conf
```

Ou configure através das Preferências do Sistema > Segurança > Firewall.

**Linux:**
```bash
# UFW
sudo ufw allow 3000/tcp

# Ou firewalld
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload
```

## Endpoints Disponíveis

### GET /
Lista todos os endpoints disponíveis.

### GET /health
Health check do servidor.

### POST /api/create-account
Cria uma nova conta.

**Resposta:**
```json
{
  "success": true,
  "address": "0x..."
}
```

### POST /api/create-smart-account
Cria uma smart account.

**Resposta:**
```json
{
  "success": true,
  "smartAccountAddress": "0x...",
  "ownerAddress": "0x..."
}
```

### POST /api/send-user-operation
Envia uma user operation.

**Body:**
```json
{
  "smartAccountAddress": "0x...",
  "to": "0x0000000000000000000000000000000000000000",
  "value": "0",
  "data": "0x",
  "network": "base-sepolia"
}
```

**Resposta:**
```json
{
  "success": true,
  "userOpHash": "...",
  "status": "..."
}
```

### POST /api/wait-for-user-operation
Aguarda confirmação de uma user operation.

**Body:**
```json
{
  "smartAccountAddress": "0x...",
  "userOpHash": "..."
}
```

**Resposta:**
```json
{
  "success": true,
  "status": "complete",
  "transactionHash": "0x...",
  "explorerLink": "https://sepolia.basescan.org/tx/..."
}
```

## Exemplo de Uso

### Com cURL

```bash
# Health check
curl http://SEU_IP:3000/health

# Criar smart account
curl -X POST http://SEU_IP:3000/api/create-smart-account \
  -H "Content-Type: application/json"
```

### Com JavaScript/Fetch

```javascript
// Criar smart account
const response = await fetch('http://SEU_IP:3000/api/create-smart-account', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await response.json();
console.log(data);
```

## Notas de Segurança

⚠️ **IMPORTANTE:** Este é um servidor de exemplo. Para produção:

1. Adicione autenticação/autorização
2. Use HTTPS (TLS/SSL)
3. Implemente rate limiting
4. Gerencie as chaves privadas de forma segura
5. Adicione validação de entrada mais rigorosa
6. Configure CORS adequadamente se necessário

## 🌐 Deploy Online

Para tornar o servidor acessível online (não apenas na rede local), você tem várias opções:

### Opção Rápida: Ngrok (Testes)
```bash
# Terminal 1: Inicie o servidor
npm start

# Terminal 2: Crie o túnel
npx ngrok http 3000
```

### Opção Gratuita: Render.com ou Railway.app

**Render.com:**
1. Faça push do código para o GitHub
2. Crie uma conta em [render.com](https://render.com)
3. Conecte o repositório e faça deploy
4. ✅ Servidor online com HTTPS automático!

**Railway.app:**
1. Faça push do código para o GitHub
2. Crie uma conta em [railway.app](https://railway.app)
3. Conecte o repositório
4. ✅ Deploy automático!

📖 **Veja o guia completo:** [DEPLOY.md](./DEPLOY.md)

⚠️ **Atenção:** Expor o servidor na internet sem segurança adequada pode ser perigoso!

