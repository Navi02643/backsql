const { createLogger, format, transports } = require("winston");

let date = new Date();
let dia = String(date.getDate()).padStart(2, "0");
let mes = String(date.getMonth() + 1).padStart(2, "0");
let anyo = date.getFullYear();

let fecha = dia + "-" + mes + "-" + anyo;

var diasMes = new Date(anyo, mes, 0).getDate();
const NomMes = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
let carpeta = NomMes[Number(mes)];

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) => `[${info.timestamp} ${info.level} ${info.message}] `
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: diasMes,
      filename: `${__dirname}/ArchivosLogs/${carpeta}/log-api_${fecha}.txt`,
    }),
  ],
});
