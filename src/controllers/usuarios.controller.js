// const { request, response } = require("express");

const { crearUsuario } = require("../services/db");

const createUser = async (req, res) => {
  try {
    // console.log("LALAAA", req.body);
    const { nombre, balance } = req.body;
    console.log("LALAAA", nombre, balance);

    if (balance < 0) throw new Error("El balance no puede ser 0 o mas");
    if (!nombre) throw new Error("El nombre es requerido");
    const result = await crearUsuario({ nombre, balance });
    console.log(result.rows[0]);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
};
