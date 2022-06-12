// const { request, response } = require("express");

const {
  crearUsuario,
  listUsers,
  deleteUser,
  editUser,
  eliminarTransferencia,
} = require("../services/db");

const createUser = async (req, res) => {
  try {
    const { nombre, balance } = req.body;

    if (typeof balance !== "number" && !balance)
      throw new Error("El balance debe ser un número");
    if (balance < 0) throw new Error("El balance no puede ser 0 o mas");
    if (!nombre) throw new Error("El nombre es requerido");
    const result = await crearUsuario({ nombre, balance });
    console.log("Ultimo registro: ", result.rows[0]);
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const onlistUsers = async (req, res) => {
  try {
    const result = await listUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const onDeleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw new Error("El id es requerido");
    await eliminarTransferencia(+id);
    await deleteUser(+id);
    res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "No se puede eliminar un usuario que tiene una transferencia",
    });
    res.status(500).json({ error });
  }
};

const onEditeUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name: nombre, balance } = req.body;

    if (typeof balance !== "number" && !balance)
      throw new Error("El balance debe ser un número");
    if (balance < 0) throw new Error("El balance no puede ser 0 o mas");
    if (!nombre) throw new Error("El nombre es requerido");
    const result = await editUser({ id, nombre, balance });

    res
      .status(200)
      .json({ message: "Usuario editado correctamente", user: result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
  onlistUsers,
  onDeleteUser,
  onEditeUser,
};
