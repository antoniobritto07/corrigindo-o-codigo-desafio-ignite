const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(404).json({ error: "Mensagem de erro" })
  }
  if (request.body.likes) {
    repository.likes = repository.likes;
  }
  title ? repository.title = title : null
  url ? repository.url = url : null
  techs ? repository.techs = techs : null

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 1) {
    return response.status(404).json({ error: "Mensagem de erro" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(404).json({ error: "Mensagem de erro" });
  }

  repository.likes = repository.likes + 1;

  return response.json(repository);
});

module.exports = app;
