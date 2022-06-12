//APLICACIÓN
const express = require("express");
const path = require("path");

const { router: userRouter } = require("./routes/usuarios.routes");
const { router: transRouter } = require("./routes/transferencias.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./assets", "index.html"));
});

app.use("/usuario", userRouter);
app.use("/usuarios", userRouter);
app.use("/usuario?", userRouter);
app.use("/usuarios?", userRouter);
app.use("/transferencia", transRouter);
app.use("/transferencias", transRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
