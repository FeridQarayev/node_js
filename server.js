const express = require("express");
const { v4: uuidv } = require("uuid");
const PORT = 8080;

const app = express();

const users = [
  {
    id: "1",
    name: "Alakisi",
    surname: "Baxiseliyev",
    age: 31,
    email: "code@gamil.com",
    password: "Akif123",
  },
  {
    id: "2",
    name: "Alakisi",
    surname: "Baxiseliyev",
    age: 31,
    email: "code@gamil.com",
    password: "Akif123",
  },
];
app.get("/api/users", (req, res) => {
  res.send({ message: "success", users });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((p) => p.id === id);
  if (user) {
    res.send({
      message: "success",
      user,
    });
  } else res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
