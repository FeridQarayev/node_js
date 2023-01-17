const express = require("express");
const { v4: uuidv } = require("uuid");
const PORT = 8080;

const app = express();
app.use(express.json());

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
// --------------------------Get All Users------------------------------------
app.get("/api/users", (req, res) => {
  res.send({ message: "success", users });
});

// --------------------------Get User As Id------------------------------------
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

// --------------------------User Update ------------------------------------
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, surname, age } = req.body;
  let user = users.find((p) => p.id === id);
  if (!user) return res.status(204).send();
  if (!name && !surname && !age)
    return res
      .status(400)
      .send({ message: "Name or surname or age required!" });
  if (name) user.name = name;
  if (surname) user.surname = surname;
  if (age) user.age = age;
  res.send({ message: "User successfully updated!", user });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
