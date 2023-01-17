const express = require("express");
const { v4: uuidv4 } = require("uuid");
const PORT = 8080;

const app = express();
app.use(express.json());

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
    password: "Akif1234",
  },
];

const posts = [
  {
    id: "1",
    description: "Ogru yolu dogru yolu",
    createdOn: "18.01.2023",
    user: {
      id: "2",
      name: "Alakisi",
      surname: "Baxiseliyev",
      email: "code2@gamil.com",
    },
  },
  {
    id: "2",
    description: "Ata min esseye catinca",
    createdOn: "19.01.2023",
    user: {
      id: "2",
      name: "Alakisi",
      surname: "Baxiseliyev",
      email: "code1@gamil.com",
    },
  },
];
let isLoggedIn = false;

const checkLogin = (req, res, next) => {
  if (!isLoggedIn) {
    return res.status(401).send({ message: "You must login!" });
  }
  next();
};

// --------------------------Login------------------------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).send({
      message: "Email and password are required!",
    });
    return;
  }
  const user = users.find(
    (user) => user.email == email && user.password == password
  );
  if (!user) {
    res.status(401).send({
      message: "Email or password is incorrect!",
    });
    return;
  }
  isLoggedIn = true;
  res.send({ message: "Success logined" });
});

// --------------------------Register------------------------------------
app.post("/api/register", (req, res) => {
  const { name, surname, age, email, password } = req.body || {};
  if (!name || !surname || !age || !email || !password) {
    res.status(400).send({
      message: "Name, surname, email, password and age are required!",
    });
    return;
  }
  let user = users.find((user) => user.email == email);
  if (user) {
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

  res.status(201).send({ message: "User successfully registered!", newUser });
});

// --------------------------Logout------------------------------------
app.post(
  "/api/logout",
  (req, res, next) => checkLogin(req, res, next),
  (req, res) => {
    isLoggedIn = false;
    res.send({ message: "Success logouted" });
  }
);

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
app.put(
  "/api/users/:id",
  (req, res, next) => checkLogin(req, res, next),
  (req, res) => {
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
  }
);

// --------------------------User Delete ------------------------------------
app.delete(
  "/api/users/:id",
  (req, res, next) => checkLogin(req, res, next),
  (req, res) => {
    const { id } = req.params;
    let userIndex = users.findIndex((p) => p.id === id);
    if (userIndex === -1) return res.status(204).send();
    let deletedUser = users.splice(userIndex, 1);
    res.send({
      message: "User successfully deleted!",
      deletedUser,
    });
  }
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

// --------------------------Get All Posts------------------------------------
app.get("/api/posts", (req, res) => {
  res.send({ message: "success", posts });
});

// --------------------------Get Post As Id------------------------------------
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => p.id === id);
  if (post) {
    res.send({
      message: "success",
      post,
    });
  } else res.status(204).send();
});
