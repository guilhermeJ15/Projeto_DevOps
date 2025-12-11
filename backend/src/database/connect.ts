import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(" ERRO: Variável MONGO_URI não encontrada no ambiente.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // evita travar tentando conectar
    });

    console.log(" MongoDB conectado com sucesso!");
  } catch (error) {
    console.error(" Erro ao conectar no MongoDB:", error);
    throw error; // deixa o server.ts controlar o fluxo
  }
}
