const express = require("express");
const app = express();

let conn = require("../config/db");

app.get("/", async (req, res) => {
  try {
    conn.query("SELECT * FROM estado", (err, rows) => {
      if (err) {
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          cont: {
            err: Object.keys(err).length === 0 ? err.message : err,
          },
        });
      } else {
        return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "Estados Disponibles.",
            rows
          });
      }
    });
  } catch (err) {
    return res.status(500).send({
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
