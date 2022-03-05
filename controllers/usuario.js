const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

let conn = require("../config/db");

// RUTA PARA OBTENER LOS ENCARGADOS DE PROYECTO
app.get("/ENC", async (req, res) => {
  try {
    // SE EJECUTA EL QUERY PARA OBTENER A LOS ENCARGADOS DE PROYECTO
    conn.query("SELECT * FROM usuario WHERE usuarioestado=1 AND (IDcargo=7 or IDcargo=8)", (err, rows) => {
      if (err) {
        // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          err,
        });
      } else if (rows.length > 0) {
        // SI LOS ENCARGADOS DE PROYECTO SON MAYOR O IGUAL A UNO SE MUESTRAN
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "ENCARGADOS DE PROYECTO.",
          rows,
        });
      } else {
        // SI NO HAY ENCARGADOS DE PROYECTO SE MUESTRA EL MENSAJE
        return res.status(204).send({
          estatus: "204",
          err: false,
          msg: "Sin ENCARGADOS DE PROYECTOs.",
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

//RUTA PARA OBTENER LOS USUARIOS INACTIVOS
app.get("/INA", async (req, res) => {
  try {
    // SE EJECUTA UNA QUERY PARA OBTENER A LOS USUARIOS INACTIVOS
    conn.query("SELECT * FROM usuario WHERE usuarioestado=0", (err, rows) => {
      if (err) {
        // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          err,
        });
      } else if (rows.length > 0) {
        // SI LOS USARIOS OBTENIDOS SON MAYORES O IGUALES A 1 SE MUNESTRAN
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "Usuarios inactivos.",
          rows,
        });
      } else {
        // SI NO EXISTEN USUARIOS INACTIVOS SE MUESTRA EL MENSAJE
        return res.status(204).send({
          estatus: "204",
          err: false,
          msg: "Sin usuarios inactivos.",
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

// RUTA PARA OBTENER LOS USUARIOS ACTIVOS
app.get("/ACT", async (req, res) => {
  try {
    // SE EJECUTA EL QUERY PARA OBTENER A LOS USUARIOS ACTIVOS
    conn.query("SELECT * FROM usuario WHERE usuarioestado=1", (err, rows) => {
      if (err) {
        // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
        return res.status(500).send({
          estatus: "500",
          err: true,
          msg: "Ocurrio un error.",
          err,
        });
      } else if (rows.length > 0) {
        // SI LOS USUARIOS ACTIVOS SON MAYOR O IGUAL A UNO SE MUESTRAN
        return res.status(200).send({
          estatus: "200",
          err: false,
          msg: "Usuarios Activos.",
          rows,
        });
      } else {
        // SI NO HAY USUARIOS ACTIVOS SE MUESTRA EL MENSAJE
        return res.status(204).send({
          estatus: "204",
          err: false,
          msg: "Sin usuarios Activos.",
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

// RUTA PARA DAR DE ALTA USUARIOS
app.post("/", async (req, res) => {
  try {
    // DECLARAMOS LAS VARIABLES QUE VAMOS A RECIBIR
    let {
      usuarionombres,
      usuarioapellidoP,
      usuarioapellidoM,
      usuarioemail,
      usuariotelefono,
      IDrol,
      usuariocontrasenya,
      IDcargo,
      usuariosalario,
    } = req.body;

    // ENCRIPTAMOS LA CONTRASEÑA
    usuariocontrasenya = bcrypt.hashSync(usuariocontrasenya, 10);

    // VALIDAMOS QUE EL USUARIO INGRESE SU NOMBRE COMPLETO
    if (
      usuarionombres == "" ||
      usuarioapellidoP == "" ||
      usuarioapellidoM == ""
    ) {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se requiere tu nombre completo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE UN CORREO
    else if (usuarioemail == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se requiere un correo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE EL CARGO Y EL ROL
    else if (IDrol == "" || IDcargo == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se requiere un rol y un cargo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE UNA CONTRASEÑA VALIDA
    else if (usuariocontrasenya == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se requiere una contraseña.",
      });
      // VALIDAMOS QUE SE LE ASIGNE UN SUELDO AL USUARIO
    } else if (usuariosalario == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se requiere el salario del empleado.",
      });
      // SI TODO ESTA CORRECTO SE BUSCA UN CORREO
    } else {
      // SE BUSCA EL CORREO EN LA BASE DE DATOS
      conn.query(
        "SELECT * FROM usuario WHERE usuarioemail=?",
        [usuarioemail],
        (err, rows) => {
          // SI OCURRE UN ERROR CON LA CONSULTA SE MUESTRA EL ERROR
          if (err) {
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
            // SI SE ENCONTRO EL CORREO SE MUESTRA EL MENSAJE DE CORREO REGISTRADO
          } else if (rows.length > 0) {
            return res.status(100).send({
              estatus: "100",
              err: true,
              msg: "Correo ya registrado.",
            });
          } else {
            // SI TODO ESTA CORRECTO SE HACE EL REGISTRO EN LA BASE DE DATOS
            conn.query(
              "INSERT INTO usuario(usuarionombres,usuarioapellidoP,usuarioapellidoM,usuarioemail,usuariotelefono,IDrol,usuariocontrasenya,IDcargo,usuariosalario) VALUES(?,?,?,?,?,?,?,?,?)",
              [
                usuarionombres,
                usuarioapellidoP,
                usuarioapellidoM,
                usuarioemail,
                usuariotelefono,
                IDrol,
                usuariocontrasenya,
                IDcargo,
                usuariosalario,
              ],
              (err) => {
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
                    msg: `Se inserto al usuario ${usuarionombres} ${usuarioapellidoP} ${usuarioapellidoM} con exito.`,
                  });
                }
              }
            );
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

// RUTA PARA MODIFICAR DATOS DEL USUARIO SIN CONTRASEÑA
app.put("/", async (req, res) => {
  try {
    // DECLARAMOS LAS VARIABLES QUE VAMOS A RECIBIR
    let {
      usuarionombres,
      usuarioapellidoP,
      usuarioapellidoM,
      usuarioemail,
      usuariotelefono,
      IDrol,
      IDcargo,
      usuariosalario,
    } = req.body;
    // DECLARAMOS EL PARAMETRO ID
    let IDusuario = req.query.IDusuario;
    // SI SE ENVIA UN ID VACIO SE INDICA
    if (IDusuario == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se necesita el ID del usuario.",
        err,
      });
    } else {
      // BUSCAMOS AL USUARIO POR EL ID
      conn.query(
        "SELECT * FROM usuario WHERE IDusuario=?",
        [IDusuario],
        (err, rows) => {
          // SI OCURRE UN ERROR CON LA CONSULTA SE MUESTRA
          if (err) {
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else {
            // SI ALGUNO DE LOS CAMPOS ESTA VACIO SE LE ASIGNA EL VALOR QUE TIENE EN LA BASE DE DATOS
            if (usuarionombres == "") {
              usuarionombres = rows[0].usuarionombres;
            }
            if (usuarioapellidoP == "") {
              usuarioapellidoP = rows[0].usuarioapellidoP;
            }
            if (usuarioapellidoM == "") {
              usuarioapellidoM = rows[0].usuarioapellidoM;
            }
            if (usuarioemail == "") {
              usuarioemail = rows[0].usuarioemail;
            }
            if (usuariotelefono == "") {
              usuariotelefono = rows[0].usuariotelefono;
            }
            if (IDrol == "") {
              IDrol = rows[0].IDrol;
            }
            if (IDcargo == "") {
              IDcargo = rows[0].IDcargo;
            }
            if (usuariosalario == "") {
              usuariosalario = rows[0].usuariosalario;
            }
            // SE ACTUALIZA EL USUARIO
            conn.query(
              "UPDATE usuario SET usuarionombres=?,usuarioapellidoP=?,usuarioapellidoM=?,usuarioemail=?,usuariotelefono=?,IDrol=?,IDcargo=?,usuariosalario=? WHERE IDusuario=?",
              [
                usuarionombres,
                usuarioapellidoP,
                usuarioapellidoM,
                usuarioemail,
                usuariotelefono,
                IDrol,
                IDcargo,
                usuariosalario,
                IDusuario,
              ],
              (err) => {
                // SI HUBO UN ERROR SE MUESTRA
                if (err) {
                  return res.status(500).send({
                    estatus: "500",
                    err: true,
                    msg: "Ocurrio un error.",
                    err,
                  });
                  // SI NO HUBO UN ERROR SE NOTIFICA QUE EL CLIENTE SE ACTUALIZO
                } else {
                  return res.status(200).send({
                    estatus: "200",
                    err: false,
                    msg: "Usuario actualizado con exito.",
                  });
                }
              }
            );
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

// RUTA PARA MODIFICAR LA CONTRASEÑA DEL USUARIOS
app.put("/pass", async (req, res) => {
  try {
    // DECLARAMOS LAS VARIABLES A USAR
    let {
      usuariocontrasenyaold,
      usuariocontrasenyanew,
      usuariocontrasenyaconf,
    } = req.body;
    // DECLARAMOS EL PARAMETRO ID
    let IDusuario = req.query.IDusuario;
    // SI SE ENVIA UN ID VACIO SE INDICA
    if (IDusuario == "") {
      return res.status(100).send({
        estatus: "100",
        err: true,
        msg: "Se necesita el ID del usuario.",
        err,
      });
    } else {
      // SE EJECUTA EL QUERY PARA BUSCAR UN USUARIO POR ID
      conn.query(
        "SELECT usuariocontrasenya FROM usuario WHERE IDusuario=?",
        [IDusuario],
        (err, rows) => {
          // SI HUBO UN ERROR EN LA CONSULTA SE INDICA
          if (err) {
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });            
          } else {
            // SE COMPARA LA CONTRASEÑA DADA CON LA CONTRASEÑA EN LA BASE DE DATOS
            let coincide = bcrypt.compareSync(
              usuariocontrasenyaold,
              rows[0].usuariocontrasenya
            );
            // SE COMPARA LA CONTRASEÑA NUEVA CON LA CONFIRMACION DE LA CONTRASEÑA
            if (usuariocontrasenyanew == usuariocontrasenyaconf) {
              if (coincide == true) {
                // ENCRIPTAMOS LA CONTRASEÑA
                usuariocontrasenyanew = bcrypt.hashSync(
                  usuariocontrasenyanew,
                  10
                );
                // EJECUTAMOS LA QUERY PARA ACTUALIZAR LA CONTRASEÑA DEL USUARIO
                conn.query(
                  "UPDATE usuario SET usuariocontrasenya=? WHERE IDusuario=?",
                  [usuariocontrasenyanew, IDusuario],
                  (err) => {
                    // SI HUBO UN ERROR SE INDICA
                    if (err) {
                      return res.status(200).send({
                        estatus: "500",
                        err: true,
                        msg: "Ocurrio un error.",
                        err,
                      });
                    } else {
                      // SE ENVIA EL MENSAJE DE EXITO
                      return res.status(200).send({
                        estatus: "200",
                        err: false,
                        msg: "Contraseña actuaizada con exito.",
                      });
                    }
                  }
                );
              } else {
                // SI LA CONTRASEÑA DADA NO COINCIDE CON LA CONTRASEÑA DE LA BASE DE DATOS SE INDICA 
                return res.status(200).send({
                  estatus: "200",
                  err: true,
                  msg: "La contraseña es diferente a la actual.",
                });
              }
            } else {
              //  SI LA CONTRASEÑA NUEVA NO COINCIDE CON LA CONFIRMACION DE LA CONTRASEÑA SE INDICA
              return res.status(200).send({
                estatus: "200",
                err: true,
                msg: "Las contraseñas no coinciden.",
              });
            }
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

// RUTA PARA INACTIVAR USUARIO
app.delete("/", async (req, res) => {
  try {
    // DECLARAMOS EL PARAMETRO ID
    let IDusuario = req.query.IDusuario;
    // SI SE ENVIA UN ID VACIO SE INDICA
    if (IDusuario == "") {
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se necesita el ID del usuario.",
        err,
      });
    } else {
      // SE EJECUTA LA QUERY PARA DESACTIVAR EL USUARIO
      conn.query(
        "UPDATE usuario SET usuarioestado=0 WHERE IDusuario=?",
        [IDusuario],
        (err) => {
          if (err) {
            // SI HUBO UN ERROR CON LA CONSULTA SE MUESTRA
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else {
            // SE MUESTRA EL MESAJE DE EXITO
            return res.status(200).send({
              estatus: "200",
              err: false,
              msg: "Usuario desactivado con exito.",
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

// RUTA PARA ELIMINAR LOS USUARIOS
app.delete("/borrar", async (req, res) => {
  try {
    // DECLARAMOS EL PARAMETRO ID
    let IDusuario = req.query.IDusuario;
    // SI SE ENVIA UN ID VACIO SE INDICA
    if (IDusuario == "") {
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se necesita el ID del usuario.",
        err,
      });
    } else {
      // SE EJECUTA EL QUERY PARA ELIMINAR AL USUARIO DE LA BASE DE DATOS
      conn.query(
        "DELETE FROM usuario WHERE IDusuario=?",
        [IDusuario],
        (err) => {
          if (err) {
            // SI HUBO UN ERROR EN LA QUERY SE INDICA
            return res.status(500).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
          } else {
            // SE MUESTRA EL MENSAJE DE EXITO
            return res.status(200).send({
              estatus: "200",
              err: false,
              msg: "Se elimino al usuario correctamente.",
              err,
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

module.exports = app;
