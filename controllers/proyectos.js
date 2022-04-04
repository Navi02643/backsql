const express = require("express");
const app = express();

let conn = require("../config/db");
const logger = require("../logs/logger");

// RUTA PARA OBTENER TODOS LOS PROYECTOS QUE NO ESTEN CANCELADOS
app.get("/", async (req, res) => {
  try {
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT PO.IDproyecto,PO.proyectonombre, PO.proyectodescripcion, ES.nombreestatus,CONCAT(US.usuarionombres,' ',US.usuarioapellidoP,' ',US.usuarioapellidoM) AS 'nombre' FROM proyecto PO INNER JOIN estado ES ON ES.IDestado=PO.IDestado INNER JOIN usuario US ON US.IDusuario=PO.IDusuario WHERE PO.IDestado != 5 AND PO.IDestado != 6",
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

// RUTA PARA OBTENER TODOS LOS PROYECTOS QUE  ESTEN CANCELADOS
app.get("/cancel", async (req, res) => {
  try {
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT PO.IDproyecto,PO.proyectonombre, PO.proyectodescripcion, ES.nombreestatus,CONCAT(US.usuarionombres,' ',US.usuarioapellidoP,' ',US.usuarioapellidoM) AS 'nombre' FROM proyecto PO INNER JOIN estado ES ON ES.IDestado=PO.IDestado INNER JOIN usuario US ON US.IDusuario=PO.IDusuario WHERE PO.IDestado = 5",
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
            SA: 1,
            rows,
          });
        } else {
          // SI NO EXISTEN PROYECTOS SE MUESTRA
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "SIN PROYECTOS.",
            SA: 0,
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

// RUTA PARA OBTENER LOS PROYECTOS DEPENDIENDO DEL ESTADO
app.get("/estado", async (req, res) => {
  try {
    let estado = req.query.estado;
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT PO.IDproyecto,PO.proyectonombre, PO.proyectodescripcion, ES.nombreestatus,CONCAT(US.usuarionombres,' ',US.usuarioapellidoP,' ',US.usuarioapellidoM) AS 'nombre' FROM proyecto PO INNER JOIN estado ES ON ES.IDestado=PO.IDestado INNER JOIN usuario US ON US.IDusuario=PO.IDusuario WHERE PO.IDestado = ?",
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

// RUTA PARA OBTENER LOS PROYECTOS DEPENDIENDO DEL ESTADO
app.get("/usuario", async (req, res) => {
  try {
    let IDusuario = req.query.IDusuario;
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT PO.IDproyecto,PO.proyectonombre, PO.proyectodescripcion, ES.nombreestatus,CONCAT(US.usuarionombres,' ',US.usuarioapellidoP,' ',US.usuarioapellidoM) AS 'nombre' FROM proyecto PO INNER JOIN estado ES ON ES.IDestado=PO.IDestado INNER JOIN usuario US ON US.IDusuario=PO.IDusuario WHERE PO.IDusuario = ?",
      [IDusuario],
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

app.get("/proyecto", async (req, res) => {
  try {
    let IDproyecto = req.query.IDproyecto;
    // SE EJECUTA UNA QUERY PARA OBTENER TODOS LOS PROYECTOS
    conn.query(
      "SELECT PO.IDproyecto,PO.proyectonombre, PO.proyectodescripcion, ES.nombreestatus,CONCAT(US.usuarionombres,' ',US.usuarioapellidoP,' ',US.usuarioapellidoM) AS 'nombre',PO.IDusuario,PO.IDestado FROM proyecto PO INNER JOIN estado ES ON ES.IDestado=PO.IDestado INNER JOIN usuario US ON US.IDusuario=PO.IDusuario WHERE PO.IDproyecto = ?",
      [IDproyecto],
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

// RUTA PARA REGISTRAR UN PROYECTO
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
                  logger.info(`SE CREO EL PROYECTO ${proyectonombre}`);
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

//RUTA PARA ACTUALIZAR UN PROYECTO
app.put("/", async (req, res) => {
  try {
    let { proyectonombre, proyectodescripcion, IDusuario, IDestado } = req.body;
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
        "SELECT * FROM proyecto WHERE IDproyecto=?",
        [IDproyecto],
        (err, rows) => {
          if (err) {
          } else {
            if (proyectonombre == "") {
              proyectonombre = rows[0].proyectonombre;
            }
            if (proyectodescripcion == "") {
              proyectodescripcion = rows[0].proyectodescripcion;
            }
            if (IDestado == "") {
              IDestado = rows[0].IDestado;
            }
            if (IDusuario == "") {
              IDusuario = rows[0].IDusuario;
            }
            if (IDestado == "") {
              IDestado = rows[0].IDestado;
            }
            conn.query(
              "UPDATE proyecto SET proyectonombre=?, proyectodescripcion=?, IDusuario=?,IDestado=? WHERE IDproyecto=?",
              [
                proyectonombre,
                proyectodescripcion,
                IDusuario,
                IDestado,
                IDproyecto,
              ],
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
                  logger.warn(`
                SE ACTUALIZO EL PROYECTO CON EL ID: ${IDproyecto}              
                Datos Nuevos:
                    Nombre: ${rows[0].proyectonombre},
                    Descripcion: ${rows[0].proyectodescripcion},
                    IDEncargado: ${rows[0].IDusuario} ,
                    IDEstado: ${rows[0].IDestado}
                Datos Nuevos:
                    Nombre: ${proyectonombre},
                    Descripcion: ${proyectodescripcion},
                    IDEncargado: ${IDusuario},
                    IDEstado: ${IDestado}
                `);
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

// RUTA PARA PAUSAR UN PROYECTO
app.put("/reac", async (req, res) => {
  try {
    let IDproyecto = req.query.IDproyecto;
    conn.query(
      "UPDATE proyecto SET IDestado=2 WHERE IDproyecto=?",
      [IDproyecto],
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
          logger.warn(`SE REACTIVO EL PROYECTO CON EL ID: ${IDproyecto}`);
          // SI TODO SALIO BIEN SE INDICA
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: `Se actualizo el proyecto`,
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

// RUTA PARA ELIMINAR UN PROYECTO
app.delete("/", async (req, res) => {
  try {
    let IDproyecto = req.query.IDproyecto;
    conn.query(
      "DELETE FROM proyecto WHERE IDproyecto=?",
      [IDproyecto],
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
          logger.info(`SE ELIMINO EL PROYECTO CON ID ${IDproyecto}`);
          // SI TODO SALIO BIEN SE INDICA
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: `Se elimino el proyecto`,
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

module.exports = app;
