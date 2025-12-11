import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connect";
import routes from "./routes/items.routes";
import cors from "cors";

dotenv.config();

async function startServer() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Rotas
  app.use("/items", routes);

  const PORT = process.env.PORT || 3000;

  try {
    // Conecta ao MongoDB antes de subir o servidor
    await connectDB();
    console.log("MongoDB conectado com sucesso!");

    // Inicia servidor após conexão
    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(" Erro ao iniciar servidor:", error);
    process.exit(1); // encerra se falhar
  }
}

startServer();
