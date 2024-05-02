import CartsItems from "../models/CartItemsModel.js";
import Carts from "../models/CartsModel.js";
import MenuItems from "../models/MenuItemsModel.js";
import Restaurant from "../models/RestaurantsModel.js";

export const getCartItems = async (req, res) => {
  try {
    const response = await CartsItems.findAll({
      include: [
        {
          model: MenuItems,
          as: "menu",
          // attributes: ['name'],
        },
        {
          model: Carts,
          as: "cart",
          include: [{
            model: Restaurant,
            as: 'restaurant',
          }]
          // attributes: ['name'],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCartItemsById = async (req, res) => {
  try {
    const response = await CartsItems.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveCartItems = async (req, res) => {
  const { cart_id, menu_item_id, quantity, notes } = req.body;

  try {
    await CartsItems.create({
      cart_id: cart_id,
      menu_item_id: menu_item_id,
      quantity: quantity,
      notes: notes,
    });

    res.status(201).json({ msg: "Cart Items created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCartItems = async (req, res) => {
  const cartItems = await CartsItems.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!cartItems)
    return res.status(404).json({ msg: "Cart Items tidak ditemukan" });
  const { cart_id, menu_item_id, quantity, notes } = req.body;

  try {
    await CartsItems.update(
      {
        cart_id: cart_id,
        menu_item_id: menu_item_id,
        quantity: quantity,
        notes: notes,
      },
      {
        where: {
          id: cartItems.id,
        },
      }
    );

    res.status(200).json({ msg: "Cart Items Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCartItems = async (req, res) => {
  const cartItems = await CartsItems.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!cartItems) {
    return res.status(404).json({ msg: "Cart Items tidak ditemukan" });
  }

  try {
    await CartsItems.destroy({
      where: {
        id: cartItems.id,
      },
    });
    res.status(200).json({ msg: "Cart Items deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAllCartItems = async (req, res) => {
  try {
    await CartsItems.destroy({
      truncate: true, // Menghapus semua data
      cascade: true, // Mengikuti constraint foreign key jika ada
      restartIdentity: true, // Mereset auto-increment primary key ke 1
    });
    res.status(200).json({ msg: "All Cart Items deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};