import path from "path";
import fs from "fs";
import Restaurant from "../models/RestaurantsModel.js";

export const getRestaurants = async (req, res) => {
  try {
    const response = await Restaurant.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRestaurantsById = async (req, res) => {
  try {
    const response = await Restaurant.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveRestaurants = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { name, address, no_hp, city, description } = req.body;
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
      await Restaurant.create({
        name: name,
        address: address,
        image: fileName,
        url: url,
        no_hp: no_hp,
        city: city,
        description: description,
      });
      res.status(201).json({ msg: "Restaurant created successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateRestaurants = async (req, res) => {
  const restaurant = await Restaurant.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!restaurant) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  if (req.files === null) {
    fileName = Restaurant.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${restaurant.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { name, address, no_hp, city, description } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await Restaurant.update(
      {
        name: name || Restaurant.nama,
        address: address || Restaurant.address,
        image: fileName || Restaurant.image,
        url: url || Restaurant.url,
        no_hp: no_hp || Restaurant.no_hp,
        city: city || Restaurant.city,
        description: description || Restaurant.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Restaurant updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRestaurants = async (req, res) => {
  const restaurant = await Restaurant.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!restaurant) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${restaurant.image}`;
    fs.unlinkSync(filepath);
    await Restaurant.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Restaurant deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
