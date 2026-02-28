const { v4: uuidv4 } = require("uuid");

let users = [];

exports.getAllUsers = (req, res) => {
  res.json({
    total: users.length,
    data: users
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email required"
    });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    createdAt: new Date()
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    data: newUser
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter(user => user.id !== id);

  res.json({
    message: "User deleted"
  });
};
