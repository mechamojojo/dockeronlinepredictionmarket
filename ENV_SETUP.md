# 🔑 Configuração de Variáveis de Ambiente

O CDP SDK requer chaves de API para funcionar. Você precisa configurá-las no Render.

## 📋 Variáveis Necessárias

### Obrigatórias:

- `CDP_API_KEY_ID` - Sua API Key ID do Coinbase Developer Platform
- `CDP_API_KEY_SECRET` - Sua API Key Secret do Coinbase Developer Platform

### Opcional (mas recomendado):

- `CDP_WALLET_SECRET` - Wallet secret para operações de escrita
- `THIRDWEB_ENGINE_URL` ou `CDP_ENGINE_URL` - URL do Thirdweb Engine (se necessário)

## 🚀 Como Configurar no Render

### 1. Obter as Chaves de API

1. Acesse [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Vá em **API Keys** ou **Settings**
3. Crie uma nova API Key ou use uma existente
4. Copie:
   - **API Key ID**
   - **API Key Secret**
   - **Wallet Secret** (se necessário)

### 2. Adicionar no Render

1. No Render, vá para seu serviço
2. Clique em **"Environment"** no menu lateral
3. Clique em **"Add Environment Variable"**
4. Adicione cada variável:

   **Variável 1:**

   - Key: `CDP_API_KEY_ID`
   - Value: `sua-api-key-id-aqui`

   **Variável 2:**

   - Key: `CDP_API_KEY_SECRET`
   - Value: `sua-api-key-secret-aqui`

   **Variável 3 (Opcional):**

   - Key: `CDP_WALLET_SECRET`
   - Value: `seu-wallet-secret-aqui`

   **Variável 4 (Opcional - apenas se necessário):**

   - Key: `THIRDWEB_ENGINE_URL`
   - Value: `https://seu-engine.thirdweb.com`

5. Clique em **"Save Changes"**

### 3. Fazer Novo Deploy

Após adicionar as variáveis:

1. Vá em **"Manual Deploy"**
2. Clique em **"Deploy latest commit"**
3. Aguarde o deploy completar

## 🔒 Segurança

⚠️ **IMPORTANTE:**

- **NUNCA** commite as chaves de API no código
- **NUNCA** adicione arquivos `.env` no repositório
- Use apenas variáveis de ambiente no Render
- As chaves são sensíveis - mantenha-as seguras

## 📚 Mais Informações

- [CDP SDK Documentation](https://github.com/coinbase/cdp-sdk/blob/main/typescript/README.md#api-keys)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- [Thirdweb Engine Setup](./THIRDWEB_ENGINE.md) - Se você receber erro sobre Engine

## ✅ Verificação

Após configurar, o servidor deve iniciar sem erros. Você verá:

```
✅ CDP Client configured successfully
🚀 Servidor rodando na porta [PORT]
```

Se ainda houver erros, verifique:

1. As variáveis estão corretas no Render
2. Não há espaços extras nos valores
3. Você fez um novo deploy após adicionar as variáveis
