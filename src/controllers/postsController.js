// Recebem as requisições HTTP (GET, POST, PUT, DELETE, etc.).
// Validam os dados recebidos.
// Chamam os models para acessar ou modificar dados no banco de dados.
// Preparam a resposta a ser enviada ao usuário.

import getTodosPosts from "../models/postsModels.js";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}
