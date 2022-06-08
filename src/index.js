//APLICACIÓN
const express = require("express");
const path = require("path");

const { router } = require("./routes/usuarios.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./assets", "index.html"));
});

app.use("/usuario", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
