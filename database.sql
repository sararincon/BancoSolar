--Eliminando Base de Datos
DROP DATABASE bancosolar;
-- Creando Base de Datos 
CREATE DATABASE bancosolar;
\c bancosolar
--Creando Tablas de la Base de Datos
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE,
  balance FLOAT CHECK (balance >= 0),
  vigente BOOLEAN DEFAULT true
);
CREATE TABLE transferencias (
  id SERIAL PRIMARY KEY,
  emisor INT,
  receptor INT,
  monto FLOAT,
  fecha TIMESTAMP,
  FOREIGN KEY (emisor) REFERENCES usuarios(id),
  FOREIGN KEY (receptor) REFERENCES usuarios(id)
);
SELECT * FROM usuarios;
SELECT * FROM transferencias;
\q