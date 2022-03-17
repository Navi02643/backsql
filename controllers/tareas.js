const express = require("express");
const app = express();

let conn = require("../config/db");
const logger = require("../logs/logger");

// RUTA PARA OBTENER TODAS LAS TAREAS QUE NO ESTEN CANCELADAS
app.get("/", async (req, res) => {
  try {
    conn.query(
      "SELECT TA.IDtareas,PO.proyectonombre,CONCAT(US.usuarionombres,'',US.usuarioapellidoP,'',US.usuarioapellidoM) AS 'usuario',TA.tareanombre,TA.tareadescripcion FROM tareas TA INNER JOIN proyecto PO ON PO.IDproyecto=TA.IDproyecto INNER JOIN usuario US ON US.IDusuario = TA.IDusuario",
      (err, rows) => {
        if (err) {
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else {
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "Tareas obtenidas con exito.",
            rows,
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

// RUTA PARA OBTENER TODAS LAS TAREAS QUE ESTEN CANCELADAS
app.get("/cancel", async (req, res) => {
  try {
    conn.query(
      "SELECT TA.IDtareas,PO.proyectonombre,CONCAT(US.usuarionombres,'',US.usuarioapellidoP,'',US.usuarioapellidoM) AS 'usuario',TA.tareanombre,TA.tareadescripcion, ES.nombreestatus FROM tareas TA INNER JOIN proyecto PO ON PO.IDproyecto=TA.IDproyecto INNER JOIN usuario US ON US.IDusuario = TA.IDusuario INNER JOIN estado ES ON ES.IDestado=TA.IDestado WHERE TA.IDestado=5",
      (err, rows) => {
        if (err) {
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else {
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "Tareas obtenidas con exito.",
            rows,
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

// RUTA PARA OBTENER TODAS LAS TAREAS POR EL ESTADO
app.get("/estado", async (req, res) => {
  try {
    let estado = req.query.estado;
    conn.query(
      "SELECT TA.IDtareas,PO.proyectonombre,CONCAT(US.usuarionombres,'',US.usuarioapellidoP,'',US.usuarioapellidoM) AS 'usuario',TA.tareanombre,TA.tareadescripcion, ES.nombreestatus FROM tareas TA INNER JOIN proyecto PO ON PO.IDproyecto=TA.IDproyecto INNER JOIN usuario US ON US.IDusuario = TA.IDusuario INNER JOIN estado ES ON ES.IDestado=TA.IDestado WHERE TA.IDestado=?",
      [estado],
      (err, rows) => {
        if (err) {
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else {
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "Tareas obtenidas con exito.",
            rows,
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

// RUTA PARA OBTENER TODAS LAS TAREAS POR EL USUARIO
app.get("/usuario", async (req, res) => {
  try {
    let IDusuario = req.query.IDusuario;
    conn.query(
      "SELECT PO.proyectonombre,CONCAT(US.usuarionombres,'',US.usuarioapellidoP,'',US.usuarioapellidoM) AS 'usuario',TA.tareanombre,TA.tareadescripcion, ES.nombreestatus FROM tareas TA INNER JOIN proyecto PO ON PO.IDproyecto=TA.IDproyecto INNER JOIN usuario US ON US.IDusuario = TA.IDusuario INNER JOIN estado ES ON ES.IDestado=TA.IDestado WHERE TA.IDusuario=?",
      [IDusuario],
      (err, rows) => {
        if (err) {
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else {
          return res.status(200).send({
            estatus: "200",
            err: false,
            msg: "Tareas obtenidas con exito.",
            rows,
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

// RUTA PARA REGISTRAR UNA TAREA
app.post("/", async (req, res) => {
  try {
    let { IDproyecto, IDusuario, tareanombre, tareadescripcion, tareafechaf } =
      req.body;
    let date = new Date();
    let dia = String(date.getDate()).padStart(2, "0");
    let mes = String(date.getMonth() + 1).padStart(2, "0");
    let anyo = date.getFullYear();
    let fechaini = anyo + "-" + mes + "-" + dia;
    if (IDproyecto == "") {
      return res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Se requiere un proyecto.",
        err,
      });
    }
    if (IDusuario == "") {
      return res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Se requiere un usuario.",
        err,
      });
    }
    if (tareanombre == "") {
      return res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Se requiere el nombre de la tarea.",
        err,
      });
    }
    if (tareadescripcion == "") {
      return res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Se requiere la descripción de la tarea.",
        err,
      });
    }
    if (tareafechaf == "") {
      return res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Se requiere la fecha de finalización de la tarea.",
        err,
      });
    } else {
      conn.query(
        "INSERT INTO tareas(IDproyecto, IDusuario, tareanombre, tareadescripcion, FechaInicio,FechaEntrega) VALUES(?,?,?,?,?,?)",
        [IDproyecto, IDusuario, tareanombre, tareadescripcion,fechaini, tareafechaf],
        (err) => {
          if (err) {
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else {
            logger.info(`SE REGISTRO LA TAREA: ${tareanombre}`);
            return res.status(200).send({
              estatus: "200",
              err: false,
              msg: `Se registro la tarea: ${tareanombre}`,
            });
          }
        }
      );
    }
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

// RUTA PARA ACTUALIZAR UNA TAREA
app.put("/", async (req, res) => {
  try {
    let { IDproyecto, IDusuario, tareanombre, tareadescripcion, tareafechaf } =
      req.body;
    let IDtareas = req.query.IDtareas;
    conn.query(
      "SELECT * FROM tareas WHERE IDtareas=?",
      [IDtareas],
      (err, row) => {
        if (err) {
        } else if (row.length > 0) {
          // if (IDproyecto == "") {
          //   IDproyecto = row[0].IDproyecto;
          // }
          // if (IDusuario == "") {
          //   IDusuario = row[0].IDusuario;
          // }
          if (tareanombre == "") {
            tareanombre = row[0].tareanombre;
          }
          if (tareadescripcion == "") {
            tareadescripcion = row[0].tareadescripcion;
          }
          if (tareafechaf == "") {
            tareafechaf = row[0].tareafechaf;
          }
          conn.query(
            "UPDATE tareas SET tareanombre=?, tareadescripcion=?, tareafechaf=? WHERE IDtareas=?",
            [
              // IDproyecto,
              // IDusuario,
              tareanombre,
              tareadescripcion,
              tareafechaf,
              IDtareas,
            ],
            (err) => {
              if (err) {
              } else {
                logger.warn(` SE ACTUALIZÓ EL PROYECTO CON ID: ${IDtareas}
                Datos Antiguos:
                    Nombre: ${row[0].tareanombre},
                    Descripcion: ${row[0].tareadescripcion},
                    Encargado: ${row[0].IDusuario},    
                    Fecha de Finalización: ${row[0].tareafechaf}                
                Datos Nuevos:
                    Nombre: ${tareanombre},
                    Descripcion: ${tareadescripcion},
                    Encargado: ${IDusuario},        
                    Fecha de Finalización: ${tareafechaf},  
                `);
              }
            }
          );
        } else {
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

// RUTA PARA PAUSAR UNA TAREA
app.put("/estado", async (req, res) => {
  try {
    let estado = req.body.estado;
    let IDtareas = req.query.IDtareas;
    conn.query(
      "SELECT * FROM tareas WHERE IDtareas=?",
      [IDtareas],
      (err, row) => {
        if (err) {
          return res.status(500).send({
            estatus: "500",
            err: true,
            msg: "Ocurrio un error.",
            err,
          });
        } else {
          conn.query(
            "UPDATE tareas SET IDestado=? WHERE IDtareas=?",
            [estado, IDtareas],
            (err) => {
              if (err) {
                return res.status(500).send({
                  estatus: "500",
                  err: true,
                  msg: "Ocurrio un error.",
                  err,
                });
              } else {
                logger.warn(`LA TAREA ${row[0].tareanombre} CAMBIO DE ESTADO`);
                return res.status(200).send({
                  estatus: "200",
                  err: false,
                  msg: "Tarea modificada",
                });
              }
            }
          );
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

// RUTA PARA ELIMINAR UNA TAREA
app.delete("/", async (req, res) => {
  try {
    let IDtareas = req.query.IDtareas;
    conn.query("DELETE FROM tareas WHERE IDtareas=?", [IDtareas], (err) => {
      if (err) {
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          err,
        });
      } else {
        logger.warn(`LA TAREA CON ID ${IDtareas} FUE ELIMINADA`);
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "Tarea eliminada.",
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
