const express = require("express");
const app = express();

let conn = require("../config/db");

app.get("/", async (req, res) => {
  try {
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query("SELECT * FROM proyecto", (err, rows) => {
      if (err) {
        // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          err,
        });
      } else if (rows.length > 0) {
        // SI LOS PROYECTOS SON MAYOR O IGUAL A UNO SE MUESTRAN
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "PROYECTOS.",
          rows,
        });
      } else {
        // SI NO EXISTEN PROYECTOS SE MUESTRA
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "SIN PROYECTOS.",
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

app.get("/estado", async (req, res) => {
  try {
    let estado = req.body.estado;
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT * FROM proyecto WHERE IDestado = ?",
      [estado],
      (err, rows) => {
        if (err) {
          // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else if (rows.length > 0) {
          // SI LOS PROYECTOS SON MAYOR O IGUAL A UNO SE MUESTRAN
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "PROYECTOS.",
            rows,
          });
        } else {
          // SI NO EXISTEN PROYECTOS SE MUESTRA
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "SIN PROYECTOS.",
          });
        }
      }
    );
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

app.post("/", async (req, res) => {
  try {
    let { proyectonombre, proyectodescripcion, IDusuario } = req.body;
    if (proyectonombre == "") {
      // SI EL CAMPO ESTA VACIO SE MUESTRA LA ALERTA
      return res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Se requiere un nombre para el proyecto.",
      });
    } else if (IDusuario == "") {
      // SI EL CAMPO ESTA VACIO SE MUESTRA LA ALERTA
      return res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Se requiere un encargado de proyecto.",
      });
    } else {
      conn.query(
        "SELECT proyectonombre FROM proyecto WHERE proyectonombre=?",
        [proyectonombre],
        (err, row) => {
          if (err) {
            // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else if (row.length > 0) {
            // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
            return res.status(200).send({
              estatus: "200",
              err: true,
              msg: `El proyecto ${proyectonombre} ya existe.`,
              err,
            });
          } else {
            // SI TODO ESTA CORRECTO SE HACE LA INSERCION
            conn.query(
              "INSERT INTO proyecto( proyectonombre, proyectodescripcion, IDusuario) VALUES(?,?,?)",
              [proyectonombre, proyectodescripcion, IDusuario],
              (err) => {
                if (err) {
                  // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
                  return res.status(500).send({
                    estatus: "500",
                    err: true,
                    msg: "Ocurrio un error.",
                    err,
                  });
                } else {
                  // SI TODO SALIO BIEN SE INDICA
                  return res.status(200).send({
                    estatus: "200",
                    err: false,
                    msg: `Se registro el proyecto ${proyectonombre}.`,
                  });
                }
              }
            );
          }
        }
      );
    }
  } catch (error) {
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

app.put("/", async (req, res) => {
  try {
    let { proyectonombre, proyectodescripcion, IDusuario } = req.body;
    let IDproyecto = req.query.IDproyecto;
    if (proyectonombre == "") {
      // SI EL CAMPO ESTA VACIO SE MUESTRA LA ALERTA
      return res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Se requiere un nombre para el proyecto.",
      });
    } else if (IDusuario == "") {
      // SI EL CAMPO ESTA VACIO SE MUESTRA LA ALERTA
      return res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Se requiere un encargado de proyecto.",
      });
    } else {
      conn.query(
        "UPDATE proyecto SET proyectonombre=?, proyectodescripcion=?, IDusuario=? WHERE IDproyecto=?",
        [proyectonombre, proyectodescripcion, IDusuario, IDproyecto],
        (err) => {
          if (err) {
            // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else {
            // SI TODO SALIO BIEN SE INDICA
            return res.status(200).send({
              estatus: "200",
              err: false,
              msg: `Se actualizo el proyecto ${proyectonombre}.`,
            });
          }
        }
      );
    }
  } catch (error) {
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

app.put('/pause', async(req,res)=>{
try {
    
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
