const { Router } = require("express");
const router = Router();

const { createUser } = require("../controllers/usuarios.controller");

// const router = new Router(); // Para manejar datos que son referentes a rutas

router.post("/", createUser); // /usuario/

module.exports = {
  router,
};
