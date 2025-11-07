import { CdpClient } from "@coinbase/cdp-sdk";
import { parseEther } from "viem";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

// CORS - permite requisições de qualquer origem
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Configurar CDP Client com variáveis de ambiente
const apiKeyId = process.env.CDP_API_KEY_ID;
const apiKeySecret = process.env.CDP_API_KEY_SECRET;
const walletSecret = process.env.CDP_WALLET_SECRET;

// Detectar a URL do Engine (este servidor)
// Prioridade: variável de ambiente > URL do Render > null (usar padrão)
const engineUrl =
  process.env.THIRDWEB_ENGINE_URL ||
  process.env.CDP_ENGINE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  null;

if (!apiKeyId || !apiKeySecret) {
  console.error("❌ ERROR: CDP API keys are required!");
  console.error("Please set the following environment variables:");
  console.error("  - CDP_API_KEY_ID");
  console.error("  - CDP_API_KEY_SECRET");
  console.error(
    "  - CDP_WALLET_SECRET (optional, but required for write operations)"
  );
  console.error(
    "\nFor more info: https://github.com/coinbase/cdp-sdk/blob/main/typescript/README.md#api-keys"
  );
  process.exit(1);
}

// Configurar opções do CDP Client
const cdpOptions: any = {
  apiKeyId,
  apiKeySecret,
};

if (walletSecret) {
  cdpOptions.walletSecret = walletSecret;
}

// Configurar Engine URL se disponível
// Se este servidor É o Engine, use a própria URL do Render
if (engineUrl) {
  console.log(`🔧 Engine URL: ${engineUrl}`);
  cdpOptions.engineUrl = engineUrl;
} else {
  console.log("ℹ️  No Engine URL configured - using CDP SDK default");
}

const cdp = new CdpClient(cdpOptions);

console.log("✅ CDP Client configured successfully");
if (engineUrl) {
  console.log(`✅ Engine URL: ${engineUrl}`);
}

// Endpoint raiz
app.get("/", (req, res) => {
  res.json({
    message: "CDP SDK API",
    endpoints: {
      "POST /api/create-smart-account": "Cria uma smart account",
      "POST /api/send-user-operation": "Envia uma user operation",
      "POST /api/wait-for-user-operation": "Aguarda confirmação",
      "GET /health": "Health check",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Criar smart account
app.post("/api/create-smart-account", async (req, res) => {
  try {
    const owner = await cdp.evm.createAccount({});
    const smartAccount = await cdp.evm.createSmartAccount({ owner });

    res.json({
      success: true,
      ownerAddress: owner.address,
      smartAccountAddress: smartAccount.address,
    });
  } catch (error) {
    console.error("Error creating smart account:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: message,
    });
  }
});

// Enviar user operation
app.post("/api/send-user-operation", async (req, res) => {
  try {
    const {
      smartAccountAddress,
      ownerAddress,
      to = "0x0000000000000000000000000000000000000000",
      value = "0",
      data = "0x",
      network = "base-sepolia",
    } = req.body;

    // NOTA: Este exemplo cria uma nova conta a cada requisição
    // Para produção, você deveria:
    // 1. Receber smartAccountAddress e reutilizar a conta existente
    // 2. Ou armazenar as chaves de forma segura para reutilizar
    // Por enquanto, sempre cria uma nova conta para simplicidade
    const owner = await cdp.evm.createAccount({});
    const smartAccount = await cdp.evm.createSmartAccount({ owner });

    const callValue = parseEther(value);
    const result = await cdp.evm.sendUserOperation({
      smartAccount,
      network,
      // @ts-ignore
      calls: [
        {
          to,
          value: callValue,
          data,
        },
      ],
    });

    res.json({
      success: true,
      userOpHash: result.userOpHash,
      status: result.status,
      smartAccountAddress: smartAccount.address,
      ownerAddress: owner.address,
    });
  } catch (error) {
    console.error("Error sending user operation:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: message,
    });
  }
});

// Aguardar confirmação
app.post("/api/wait-for-user-operation", async (req, res) => {
  try {
    const { smartAccountAddress, userOpHash } = req.body;

    if (!smartAccountAddress || !userOpHash) {
      return res.status(400).json({
        success: false,
        error: "smartAccountAddress and userOpHash are required",
      });
    }

    const userOperation = await cdp.evm.waitForUserOperation({
      smartAccountAddress,
      userOpHash,
    });

    if (userOperation.status === "complete") {
      res.json({
        success: true,
        status: userOperation.status,
        transactionHash: userOperation.transactionHash,
        explorerLink: `https://sepolia.basescan.org/tx/${userOperation.transactionHash}`,
      });
    } else {
      res.json({
        success: false,
        status: userOperation.status,
      });
    }
  } catch (error) {
    console.error("Error waiting for user operation:", error);
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      error: message,
    });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Detectar URL do servidor
const serverUrl =
  process.env.RENDER_EXTERNAL_URL ||
  process.env.RAILWAY_PUBLIC_DOMAIN ||
  (process.env.NODE_ENV === "production"
    ? null
    : `http://localhost:${PORT}`);

app.listen(Number(PORT), HOST, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  if (serverUrl) {
    console.log(`🌍 URL pública: ${serverUrl}`);
    console.log(`🔧 Esta URL deve ser configurada como THIRDWEB_ENGINE_URL`);
  } else {
    console.log(`📍 Local: http://localhost:${PORT}`);
  }
  
  // Mostrar informações importantes
  console.log("\n📋 Configuração do Engine:");
  if (engineUrl) {
    console.log(`   ✅ Engine URL: ${engineUrl}`);
  } else if (serverUrl) {
    console.log(`   ⚠️  Configure THIRDWEB_ENGINE_URL=${serverUrl} no Render`);
  }
  console.log("");
});
