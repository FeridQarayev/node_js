const express = require("express");
const { v4: uuidv4 } = require("uuid");
const PORT = 8080;

const app = express();
app.use(express.json());
let isLoggedIn = false;

const users = [
  {
    id: "1",
    name: "Alakisi",
    surname: "Baxiseliyev",
    age: 31,
    email: "code1@gamil.com",
    password: "Akif123",
  },
  {
    id: "2",
    name: "Alakisi",
    surname: "Baxiseliyev",
    age: 31,
    email: "code2@gamil.com",
    password: "Akif123",
  },
];

app.post("/api/register", (req, res) => {
  const { name, surname, age, email, password } = req.body || {};
  if (!name || !surname || !age || !email || !password) {
    res.status(400).send({
      message: "Name, surname, email, password and age are required!",
    });
    return;
  }
  let user = users.filter((user) => user.email == email);
  if (user.length > 0) {
    res.status(409).send({
      message: "Email address is already in use",
    });
    return;
  }
  let newUser = {
    name,
    surname,
    age,
    email,
    password,
    id: uuidv4(),
  };
  users.push(newUser);

  res.status(201).send({ message: "User successfully added!", newUser });
});

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

// --------------------------User Delete ------------------------------------
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let userIndex = users.findIndex((p) => p.id === id);
  if (userIndex === -1) return res.status(204).send();
  let deletedUser = users.splice(userIndex, 1);
  res.send({
    message: "User successfully deleted!",
    deletedUser,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
