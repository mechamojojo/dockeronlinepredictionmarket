# 🔧 Instruções para Corrigir o Deploy no Render

## ⚠️ Problema Comum

Se o deploy está falhando, pode ser que o Render não esteja usando o `render.yaml` automaticamente. Você precisa configurar manualmente no painel do Render.

## ✅ Solução: Configuração Manual no Render

### Passo 1: Acesse seu Serviço no Render

1. Vá para [render.com](https://render.com)
2. Entre no dashboard
3. Clique no seu serviço `cdp-sdk-example`

### Passo 2: Vá para Settings

1. Clique na aba **"Settings"** no menu lateral
2. Role até a seção **"Build & Deploy"**

### Passo 3: Configure os Comandos

**IMPORTANTE:** Configure manualmente os seguintes campos:

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

### Passo 4: Verifique as Variáveis de Ambiente

Na seção **"Environment"**, certifique-se de que:

- `NODE_ENV` = `production` (opcional, mas recomendado)
- `PORT` = (deixe vazio - Render define automaticamente)

### Passo 5: Salve e Faça Novo Deploy

1. Clique em **"Save Changes"**
2. Vá para a aba **"Manual Deploy"**
3. Clique em **"Deploy latest commit"**

## 🎯 Por que isso funciona?

- `tsx` está em `dependencies`, então será instalado
- `npm start` executa `tsx main.ts` diretamente
- Não precisa compilar TypeScript - tsx faz isso em runtime
- Mais simples e confiável

## 🔍 Verificando os Logs

Após o deploy, verifique os logs:

1. Vá para a aba **"Logs"**
2. Procure por mensagens de erro
3. Se tudo estiver OK, você verá: `🚀 Servidor CDP SDK rodando!`

## 📝 Checklist de Configuração

No painel do Render, verifique:

- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Node Version:** 20 ou superior (ou deixe automático)
- [ ] **Auto-Deploy:** Habilitado (para deploy automático)
- [ ] **Health Check Path:** `/health` (opcional, mas recomendado)

## 🆘 Se ainda não funcionar

1. **Verifique os logs completos** no Render
2. **Teste localmente primeiro:**
   ```bash
   npm install
   npm start
   ```
3. **Verifique se `tsx` está instalado:**
   ```bash
   npm list tsx
   ```
4. **Certifique-se de que o código mais recente está no GitHub**

## 💡 Alternativa: Usar Build Compilado

Se `tsx` não funcionar, você pode usar a versão compilada:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run start:compiled
```

Mas a versão com `tsx` é mais simples e deve funcionar! 🚀

