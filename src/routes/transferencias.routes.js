const { Router } = require("express");
const router = Router();

const {
  crearTransaccion,
  onlistTransferencias,
} = require("../controllers/transferencias.controller");

router.post("/", crearTransaccion); // "transferencia"
router.get("/", onlistTransferencias);

module.exports = {
  router,
};
