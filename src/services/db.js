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

const listUsers = async () => {
  const result = await pool.query("SELECT * FROM usuarios ORDER BY id");
  return result.rows;
};

const deleteUser = async (id) => {
  const dbQuery = {
    text: "DELETE FROM usuarios WHERE id = $1",
    values: [id],
  };

  const result = await pool.query(dbQuery);
  return result;
};

const editUser = async ({ id, nombre, balance }) => {
  const dbQuery = {
    text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *",
    values: [nombre, balance, id],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

/////////// Transacciones SQL ////////////////

const transferencia = async (datos) => {
  const { emisor, receptor, monto, fecha } = datos;

  try {
    await pool.query("BEGIN");
    const datosEmisor = await pool.query(
      "SELECT id FROM usuarios WHERE nombre= $1",
      [emisor]
    );
    const datosReceptor = await pool.query(
      "SELECT id FROM usuarios WHERE nombre= $1",
      [receptor]
    );
    const parametros = {
      text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES($1, $2, $3, $4) RETURNING*",
      values: [datosEmisor.rows[0].id, datosReceptor.rows[0].id, monto, fecha],
    };

    const paramsEmisor = {
      text: "UPDATE usuarios SET balance = balance - $1 WHERE id=$2 RETURNING*",
      values: [monto, datosEmisor.rows[0].id],
    };
    const paramsReceptor = {
      text: "UPDATE usuarios SET balance= balance + $1 WHERE id=$2 RETURNING*",
      values: [monto, datosReceptor.rows[0].id],
    };

    const transferencia = await pool.query(parametros);
    const clienteEnvia = await pool.query(paramsEmisor);
    const clienteRecibe = await pool.query(paramsReceptor);

    await pool.query("COMMIT");
    return {
      status: "OK",
      transferencia: transferencia.rows[0],
      envia: clienteEnvia.rows[0],
      recibe: clienteRecibe.rows[0],
    };
  } catch (error) {
    await pool.query("ROLLBACK");
    return { status: "ERROR", mensaje: error.message };
  }
};

const hacerTransferencia = async () => {
  const dbQuery = {
    text: "SELECT t.fecha, u.nombre, u2.nombre, monto FROM transferencias t INNER JOIN usuarios u on u.id = t.emisor  INNER JOIN usuarios u2  on u2.id= t.receptor ORDER BY t.fecha DESC",
    values: [],
    rowMode: "array",
  };
  const { rows } = await pool.query(dbQuery);
  return rows;
};

const eliminarTransferencia = async (userID) => {
  const dbQuery = {
    text: "DELETE FROM transferencias WHERE emisor = $1 OR receptor = $1",
    values: [userID],
  };
  await pool.query(dbQuery);
};

module.exports = {
  crearUsuario,
  listUsers,
  deleteUser,
  editUser,
  transferencia,
  hacerTransferencia,
  eliminarTransferencia,
};
