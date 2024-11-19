import express from "express";

const posts = [
  {
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    description: "Un altro post interessante con dettagli aggiuntivi.",
    image: "https://picsum.photos/id/237/300/200",
    category: "tecnologia",
  },
];

console.log(posts[1]);

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function searchPost(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

app.get("/posts/:id", (req, res) => {
  const index = searchPost(req.params.id);
  console.log(index);
  res.status(200).json(posts[index]);
});
