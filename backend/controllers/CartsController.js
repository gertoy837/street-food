import Carts from "../models/CartsModel.js";

export const getCarts = async (req, res) => {
  try {
    const response = await Carts.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCartsById = async (req, res) => {
  try {
    const response = await Carts.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveCarts = async (req, res) => {
  const { user_id, restaurant_id } = req.body;

  try {
    const id = await Carts.create({
      user_id: user_id,
      restaurant_id: restaurant_id,
    });

    res.status(201).json({ msg: "Carts created successfully", id: id.id});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCarts = async (req, res) => {
  const cart = await Carts.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!cart) return res.status(404).json({ msg: "Cart tidak ditemukan" });
  const { user_id, restaurant_id } = req.body;

  try {
    await Carts.update(
      {
        user_id: user_id,
        restaurant_id: restaurant_id,
      },
      {
        where: {
          id: cart.id,
        },
      }
    );

    res.status(200).json({ msg: "Cart Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCarts = async (req, res) => {
  const cart = await Carts.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!cart) {
    return res.status(404).json({ msg: "Cart tidak ditemukan" });
  }

  try {
    await Carts.destroy({
      where: {
        id: cart.id,
      },
    });
    res.status(200).json({ msg: "Cart deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
