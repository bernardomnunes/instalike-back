// Recebem as requisições HTTP (GET, POST, PUT, DELETE, etc.).
// Validam os dados recebidos.
// Chamam os models para acessar ou modificar dados no banco de dados.
// Preparam a resposta a ser enviada ao usuário.
import fs from "fs";

import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postsModels.js";
import {
  gerarDescricaoComGemini,
  gerarTextoAlternativo,
} from "../services/geminiService.js";

export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

export async function postarPost(req, res) {
  const post = req.body;
  try {
    const novoPost = await criarPost(post);
    res.status(201).json(novoPost);
  } catch (error) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  const post = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    const novoPost = await criarPost(post);
    const imagemAtualizada = `uploads/${novoPost.insertedId}.jpg`;
    fs.renameSync(req.file.path, imagemAtualizada);
    res.status(200).json(novoPost);
  } catch (error) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.jpg`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
    const alt = await gerarTextoAlternativo(imgBuffer);
    const descricao = await gerarTextoAlternativo(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: alt,
    };

    const novoPost = await atualizarPost(id, post);
    res.status(200).json(novoPost);
  } catch (error) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
