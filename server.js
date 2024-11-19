import express from "express";

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "lorim ipsum dolor sit amet consectetur adipisicing elit fjdsalkjflkdsa jfkl dsajlk fjdsalk jfdsakl; jfkldsajfkldasjklfdjsalfjdsalkjf"
    );
});
