const moment = require("moment");
const { transferencia, hacerTransferencia } = require("../services/db");

const crearTransaccion = async (req, res) => {
  try {
    const { emisor, receptor, monto } = req.body;
    // El emisor no puede ser igual al receptor
    if (emisor === receptor)
      throw new Error("El emisor no puede ser igual al receptor");
    // El monto debe ser un número
    if (typeof monto !== "number" && !monto)
      throw new Error("El monto debe ser un número");
    const fecha = moment();
    const parametros = {
      emisor,
      receptor,
      monto,
      fecha,
    };

    const respuesta = await transferencia(parametros);

    if (respuesta.status === "ERROR") throw new Error(respuesta.mensaje);

    res.status(201).json(respuesta);
  } catch (error) {
    res.status(400).json(error);
  }
};

const onlistTransferencias = async (req, res) => {
  try {
    const respuesta = await hacerTransferencia();
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  crearTransaccion,
  onlistTransferencias,
};
