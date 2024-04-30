import path from "path";
import fs from "fs";
import MenuItems from "../models/MenuItemsModel.js";
import Restaurants from "../models/RestaurantsModel.js";

export const getMenuItems = async (req, res) => {
  try {
    const response = await MenuItems.findAll({
      include: [{
        model: Restaurants,
        as: 'restaurant',
        attributes: ['name'],
      }],
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMenuItemsById = async (req, res) => {
  try {
    const response = await MenuItems.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveMenuItems = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { name, rating, price, description, restaurant_id, categori_id } =
    req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await MenuItems.create({
        name: name,
        rating: rating,
        price: price,
        image: fileName,
        url: url,
        description: description,
        restaurant_id: restaurant_id,
        categori_id: categori_id,
      });
      res.status(201).json({ msg: "Menu Items created successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateMenuItems = async (req, res) => {
  const menuItems = await MenuItems.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!menuItems) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  if (req.files === null) {
    fileName = MenuItems.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 7000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${menuItems.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { name, rating, price, description, restaurant_id, categori_id } =
    req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await MenuItems.update(
      {
        name: name || MenuItems.nama,
        rating: rating || MenuItems.rating,
        price: price || MenuItems.price,
        image: fileName || MenuItems.image,
        url: url || MenuItems.url,
        description: description || MenuItems.description,
        restaurant_id: restaurant_id || MenuItems.rest,
        categori_id: categori_id || MenuItems.categori,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Menu Items updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMenuItems = async (req, res) => {
  const menuItems = await MenuItems.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!menuItems) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${menuItems.image}`;
    fs.unlinkSync(filepath);
    await MenuItems.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Menu Items deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
