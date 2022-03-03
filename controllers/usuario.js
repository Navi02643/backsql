const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

let conn = require("../config/db");

app.get("/", async (req, res) => {
  try {
    let { usuarioemail, usuariocontrasenya } = req.body;
    console.log(usuarioemail);
    conn.query("SELECT * FROM usuario WHERE usuarioemail=?",[usuarioemail],
      (err, rows) => {
        if (err) {
          res.status(200).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err: Object.keys(err).length === 0 ? err.message : err,
          });
        } else if(rows.length > 0) {
          let coincide = bcrypt.compareSync(
            usuariocontrasenya,
            rows[0].usuariocontrasenya
          );
          if (coincide == true) {
            res.status(200).send({
              estatus: "500",
              err: false,
              msg: `Bienvenido ${rows[0].usuarionombres} ${rows[0].usuarioapellidoP} ${rows[0].usuarioapellidoM}`,
              Info: rows[0]
            });
          } else {
            res.status(200).send({
              estatus: "500",
              err: true,
              msg: "Contraseña incorrecta.",
            });
          }
        } else {
          res.status(200).send({
            estatus: "500",
            err: true,
            msg: "Correo incorrecto.",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Ocurrio un error.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
