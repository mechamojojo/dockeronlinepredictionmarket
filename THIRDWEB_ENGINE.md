# 🔧 Configuração do Thirdweb Engine

Se você está recebendo o erro "Engine instance could not be reached", pode ser necessário configurar a URL do Thirdweb Engine.

## 🔍 Problema

O erro "Engine instance could not be reached" geralmente ocorre quando:
1. O CDP SDK não consegue se conectar ao Thirdweb Engine
2. A URL do Engine não está configurada
3. Há problemas de rede/firewall bloqueando a conexão

## ✅ Solução

### Opção 1: Usar Engine URL Personalizada

Se você tem uma instância do Thirdweb Engine, adicione a URL como variável de ambiente:

1. **No Render:**
   - Vá em **Environment**
   - Adicione a variável:
     - Key: `THIRDWEB_ENGINE_URL`
     - Value: `https://seu-engine.thirdweb.com` (ou sua URL do Engine)

2. **OU use:**
   - Key: `CDP_ENGINE_URL`
   - Value: `https://seu-engine.thirdweb.com`

### Opção 2: Verificar Configuração do CDP SDK

O CDP SDK pode usar o Thirdweb Engine por padrão. Verifique:

1. **Se você precisa de um Engine próprio:**
   - O CDP SDK pode estar tentando usar um Engine que não existe
   - Verifique a documentação do CDP SDK para configurações padrão

2. **Se o erro é de rede:**
   - O Render pode estar bloqueando conexões externas
   - Verifique se há restrições de firewall

### Opção 3: Configurar Engine no Código

Se necessário, você pode configurar o Engine diretamente no código:

```typescript
const cdp = new CdpClient({
  apiKeyId: process.env.CDP_API_KEY_ID,
  apiKeySecret: process.env.CDP_API_KEY_SECRET,
  walletSecret: process.env.CDP_WALLET_SECRET,
  engineUrl: process.env.THIRDWEB_ENGINE_URL, // Opcional
});
```

## 📚 Recursos

- [CDP SDK Documentation](https://github.com/coinbase/cdp-sdk)
- [Thirdweb Engine Documentation](https://portal.thirdweb.com/engine)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

## 🔍 Debugging

Para debug, adicione logs para ver o que está acontecendo:

```typescript
console.log('CDP Options:', {
  apiKeyId: !!apiKeyId,
  apiKeySecret: !!apiKeySecret,
  walletSecret: !!walletSecret,
  engineUrl: engineUrl || 'default',
});
```

## ⚠️ Nota Importante

Se você não tem uma instância do Thirdweb Engine própria, o CDP SDK deve usar a instância padrão. Se o erro persistir:

1. Verifique se as API keys do CDP estão corretas
2. Verifique se há atualizações do CDP SDK
3. Entre em contato com o suporte do Coinbase CDP

