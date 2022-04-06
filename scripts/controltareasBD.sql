-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-04-2022 a las 18:40:44
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `controltareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `IDcargo` int(11) NOT NULL,
  `cargonombre` varchar(50) NOT NULL,
  `cargoRS` varchar(50) NOT NULL,
  `cargoestado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`IDcargo`, `cargonombre`, `cargoRS`, `cargoestado`) VALUES
(1, 'Becario', '5186.10-10000', 1),
(2, 'Ingeniero de prueba (tester) ', '10500-14999', 1),
(3, 'Desarrollador junior', '15000-19999', 1),
(4, 'Desarrollador senior', '20000-25000', 1),
(5, 'Administrador de la base de datos', '20000-25000', 1),
(6, 'Arquitecto de software', '20000-25000', 1),
(7, 'Administrador de proyecto ', '25900-29999', 1),
(8, 'CIO ', '30000-36302', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `IDestado` int(11) NOT NULL,
  `nombreestatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`IDestado`, `nombreestatus`) VALUES
(1, 'Por iniciar'),
(2, 'En desarrollo'),
(3, 'En prueba'),
(4, 'Finalizada'),
(5, 'Cancelado'),
(6, 'En pausa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `IDgrupo` int(11) DEFAULT NULL,
  `IDusuario` int(11) DEFAULT NULL,
  `IDencargado` int(11) DEFAULT NULL,
  `IDproyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `IDhistorial` int(11) NOT NULL,
  `IDproyecto` int(11) NOT NULL,
  `IDtareas` int(11) NOT NULL,
  `historialfecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`IDhistorial`, `IDproyecto`, `IDtareas`, `historialfecha`) VALUES
(1, 1, 1, '2022-01-26 00:00:00'),
(3, 1, 2, '2022-01-26 22:38:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `IDlog` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `movimiento` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `IDproyecto` int(11) NOT NULL,
  `proyectonombre` varchar(50) NOT NULL,
  `proyectodescripcion` text NOT NULL,
  `IDestado` int(11) NOT NULL DEFAULT 1,
  `IDusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`IDproyecto`, `proyectonombre`, `proyectodescripcion`, `IDestado`, `IDusuario`) VALUES
(1, 'Prueba winston', 'se edito el registro', 2, 3),
(2, 'Prueba winston segundo', 'se edito el registro', 2, 3),
(4, 'proyecto de prueba', 'este es un proyecto de prueba', 2, 1),
(5, 'prueba del front', 'esta es una prueba del front', 1, 1),
(6, 'prueba inicio', 'esta es la prueba para el inicio', 1, 1),
(7, 'proyecto validado', 'Este proyecto debe ser validado para registrarse', 1, 1),
(8, 'Proyecto de revision ', 'este es un proyecto de revision ', 2, 2),
(9, 'prueba en clase', 'este es un proyecto', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `IDroles` int(11) NOT NULL,
  `rolesnombre` varchar(50) NOT NULL,
  `rolesestado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`IDroles`, `rolesnombre`, `rolesestado`) VALUES
(0, 'SR', 1),
(1, 'Administrador', 1),
(2, 'Desarrollador', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `IDtareas` int(11) NOT NULL,
  `IDproyecto` int(11) NOT NULL,
  `IDusuario` int(11) NOT NULL,
  `tareanombre` varchar(50) NOT NULL,
  `tareadescripcion` text NOT NULL,
  `IDestado` int(11) NOT NULL DEFAULT 1,
  `FechaInicio` date DEFAULT NULL,
  `FechaEntrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`IDtareas`, `IDproyecto`, `IDusuario`, `tareanombre`, `tareadescripcion`, `IDestado`, `FechaInicio`, `FechaEntrega`) VALUES
(1, 2, 1, 'esta la edito ivan', 'prueba', 3, '2022-03-01', '2022-04-15'),
(2, 2, 1, 'tarae editada en reision', 'Esta es una prueba del front', 1, NULL, '2022-04-09'),
(4, 2, 1, 'Tarea front', 'Esta es una prueba del front', 2, '2022-03-28', '2022-03-31'),
(5, 2, 1, 'tarea fecha correcta en el log', 'esta tarea es del usuario dos', 1, '2022-03-28', '2022-03-24'),
(6, 2, 1, 'aaa', 'aaa', 6, '2022-03-28', '2022-03-31'),
(7, 2, 1, 'Tarea front', 'Esta es una prueba del front', 5, '2022-03-29', '2022-05-29'),
(8, 2, 2, 'Tarea front 21', 'Esta es una prueba del front', 1, '2022-04-03', '2022-04-30'),
(9, 2, 2, 'prueba', 'este es una prueba de las validaciones', 1, '2022-04-03', '2022-04-10'),
(10, 7, 3, 'prueba remove item', 'esta prueba es del usuario dos', 1, '2022-04-03', '2022-04-24'),
(11, 1, 3, 'Tarea de revision', 'esta es una tarea de revision ', 1, '2022-04-04', '2022-04-30'),
(12, 8, 2, 'tarea editada', 'esta prueba es del usuario dos', 2, '2022-04-04', '2022-04-29'),
(13, 9, 1, 'tarea de prueba en clase', 'Esta es una prueba del front', 2, '2022-04-04', '2022-04-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IDusuario` int(11) NOT NULL,
  `usuarionombres` varchar(50) NOT NULL,
  `usuarioapellidoP` varchar(50) NOT NULL,
  `usuarioapellidoM` varchar(50) NOT NULL,
  `usuarioemail` varchar(50) NOT NULL,
  `usuariotelefono` varchar(10) NOT NULL,
  `IDrol` int(11) NOT NULL,
  `usuariocontrasenya` varchar(250) NOT NULL,
  `IDcargo` int(11) NOT NULL,
  `usuariosalario` float NOT NULL,
  `usuarioestado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IDusuario`, `usuarionombres`, `usuarioapellidoP`, `usuarioapellidoM`, `usuarioemail`, `usuariotelefono`, `IDrol`, `usuariocontrasenya`, `IDcargo`, `usuariosalario`, `usuarioestado`) VALUES
(0, 'Administrador', '', '', 'admin@controldetarea.com', '', 1, '$2b$10$kohrB623DuW4TYhJ1Zy2vuPlHl1DpwScj9hl/I.t0E45sfbGsLu6K', 1, 0, 1),
(1, 'Carlos Ivan', 'Mercado', 'Marin', 'karlos123jun@gmail.com', '4498671212', 1, '$2b$10$n6LsitR9BZ94tG4rRqtqCusHxXrzc8WzsufEKeVd3SQt/N7z4Li6i', 7, 8000, 1),
(2, 'Jose Guadalupe', 'Castillo', 'Sanchez', 'JGCS223@gmail.com', '4498671212', 0, '$2b$10$6Py2Ei3O2Y6QFy8Gy8BqkOQdooxYl6xB1NORnhMxLq2cgnWngqe1u', 5, 5500, 1),
(3, 'Ivan ', 'Marin', 'Mercado', 'karlos026jun@gmail.com', '', 1, '$2b$10$m8iYINY7Ohrg2BX0elpKXOoB3QknPPGcdrBsGggXYaIC.Cvb.ZOFC', 7, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`IDcargo`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`IDestado`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`IDhistorial`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`IDlog`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`IDproyecto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`IDroles`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`IDtareas`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IDusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `IDcargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `IDestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `IDhistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `IDlog` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `IDproyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `IDroles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `IDtareas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IDusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
