// Definem a estrutura dos dados (por exemplo, um usuário tem nome, email e senha).
// Interagem com o banco de dados (criando, lendo, atualizando e deletando registros).
// Eles definem como os dados serão armazenados e como você irá interagir com eles
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getTodosPosts() {
  const db = conexao.db("instabytes");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}
