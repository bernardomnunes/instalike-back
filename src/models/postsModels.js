// Definem a estrutura dos dados (por exemplo, um usuário tem nome, email e senha).
// Interagem com o banco de dados (criando, lendo, atualizando e deletando registros).
// Eles definem como os dados serão armazenados e como você irá interagir com eles
import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const db = conexao.db("instabytes");

export async function getTodosPosts() {
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const colecao = db.collection("posts");

  const objId = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
}
