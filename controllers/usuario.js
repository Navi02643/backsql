const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

let conn = require("../config/db");

app.post("/", async (req, res) => {
  try {
    // DECLARAMOS LOS PARAMETROS QUE VAMOS A RECIBIR
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
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se requiere tu nombre completo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE UN CORREO
    else if (usuarioemail == "") {
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se requiere un correo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE EL CARGO Y EL ROL
    else if (IDrol == "" || IDcargo == "") {
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se requiere un rol y un cargo.",
      });
    }
    // VALIDAMOS QUE EL USUARIO INGRESE UNA CONTRASEÑA VALIDA
    else if ((usuariocontrasenya = "")) {
      return res.status(200).send({
        estatus: "500",
        err: true,
        msg: "Se requiere una contraseña.",
      });
      // VALIDAMOS QUE SE LE ASIGNE UN SUELDO AL USUARIO
    } else if (usuariosalario == "") {
      return res.status(200).send({
        estatus: "500",
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
            res.status(200).send({
              estatus: "500",
              err: true,
              msg: "Ocurrio un error.",
              err,
            });
            // SI SE ENCONTRO EL CORREO SE MUESTRA EL MENSAJE DE CORREO REGISTRADO
          } else if (rows.length > 0) {
            res.status(200).send({
              estatus: "500",
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
                  res.status(200).send({
                    estatus: "500",
                    err: true,
                    msg: "Ocurrio un error.",
                    err,
                  });
                } else {
                  res.status(200).send({
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

app.put("", async (req, res) => {
  try {
  } catch (err) {
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
