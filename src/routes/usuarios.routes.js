const { Router } = require("express");
const router = Router();

const {
  createUser,
  onlistUsers,
  onDeleteUser,
  onEditeUser,
} = require("../controllers/usuarios.controller");

// const router = new Router(); // Para manejar datos que son referentes a rutas

router.post("/", createUser); // "/usuario"
router.get("/", onlistUsers); // "/usuarios"
router.delete("/", onDeleteUser);
router.put("/", onEditeUser);

module.exports = {
  router,
};
