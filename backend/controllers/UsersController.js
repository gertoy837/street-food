import bcrypt from 'bcrypt';
import Users from "../models/UsersModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUsers = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const saltRounds = 10;

  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
      address: address,
    });

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const { name, email, password, phone, address } = req.body;
  const saltRounds = 10;

  let hashPassword;

  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await bcrypt.hash(password, saltRounds);
  }

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        address: address,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User tidak ditemukan" });
  }

  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
