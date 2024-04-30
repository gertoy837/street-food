import path from "path";
import fs from "fs";
import Categories from "../models/CategoriesModel.js";

export const getCategories = async (req, res) => {
  try {
    const response = await Categories.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const response = await Categories.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveCategories = async (req, res) => {
  const { name, categories } = req.body;

  try {
    await Categories.create({
      name: name,
      categories: categories,
    });

    res.status(201).json({ msg: "Data added successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateCategories = async (req, res) => {
  const categori = await Categories.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!categori) return res.status(404).json({ msg: "Categories Not Found" });

  const { name, categories } = req.body;

  try {
    await Categories.update(
      {
        name: name,
        email: categories,
      },
      {
        where: {
          id: categori.id,
        },
      }
    );

    res.status(200).json({ msg: "Categori Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCategories = async (req, res) => {
  const categori = await Categories.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!categori) {
    return res.status(404).json({ msg: "Categories Not Found" });
  }

  try {
    await Categories.destroy({
      where: {
        id: categori.id,
      },
    });
    res.status(200).json({ msg: "Categori deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
