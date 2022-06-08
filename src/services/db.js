const { Pool } = require("pg");

const pool = new Pool({
  user: "sararincon",
  host: "localhost",
  database: "bancosolar",
  password: "123456",
  port: 5432,
});

const crearUsuario = async ({ nombre, balance }) => {
  const dbQuery = {
    text: "INSERT INTO usuarios(nombre, balance) VALUES($1, $2) RETURNING *",
    values: [nombre, balance],
  };
  const result = await pool.query(dbQuery);
  return result;
};

module.exports = {
  crearUsuario,
};
