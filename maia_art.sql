-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2023 a las 12:26:46
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `maia_art`
--
CREATE DATABASE IF NOT EXISTS `maia_art` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `maia_art`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id_obra_arte` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id_obra_arte`, `id_usuario`) VALUES
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'Argentina'),
(2, 'England'),
(3, 'Uruguay'),
(4, 'Paraguay'),
(5, 'Venezuela');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuadros_arte`
--

CREATE TABLE `cuadros_arte` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `order_picture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuadros_arte`
--

INSERT INTO `cuadros_arte` (`id`, `name`, `price`, `description`, `order_picture`) VALUES
(1, 'arg', 500, 'solid', 1),
(2, 'isr', 900, 'solid', 2),
(3, 'dog', 400, 'soft solid', 3),
(4, 'Presence', 600, 'Acrylic Paint', 4),
(5, 'Illumine', 600, 'Mixed Media', 5),
(6, 'Nightfall', 600, 'Acrylic on Canvas 120x90 cm', 6),
(7, 'Pierrot', 600, 'Mixed media on Canvas 120x90 cm', 7),
(8, 'Nirvana', 600, 'Mixed media on Canvas 120x90 cm', 8),
(9, 'Radiance', 600, 'Acrylic Paint on Canvas 90 x 60 cm', 9),
(10, 'Surrender', 600, 'Acrylic Paint on Canvas 90 x 60 cm', 10),
(11, 'Tranquil', 600, 'Acrylic Paint on Canvas 90 x 60 cm', 11),
(12, 'Farewall', 600, 'Mixed Media on Canvas 120 x 90 cm', 12),
(13, 'Felicity', 600, 'Acrylic Paint on Deep Edge Canvas 120 x 60 com', 13),
(14, 'Ethereal', 600, 'Acrylic Paint, Oil Pastels, Gloss Finish', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_cuadros_arte`
--

CREATE TABLE `imagenes_cuadros_arte` (
  `id` int(11) NOT NULL,
  `id_cuadros_arte` int(11) NOT NULL,
  `file_image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes_cuadros_arte`
--

INSERT INTO `imagenes_cuadros_arte` (`id`, `id_cuadros_arte`, `file_image`) VALUES
(1, 1, 'image1.JPG'),
(2, 2, 'image2.JPG'),
(3, 3, 'image3.JPG'),
(4, 4, 'image4.JPG'),
(5, 5, 'image5.JPG'),
(6, 1, 'image5.JPG'),
(7, 6, 'image6.JPG'),
(8, 7, 'image7.JPG'),
(9, 8, 'image8.JPG'),
(10, 9, 'image9.JPG'),
(11, 10, 'image10.JPG'),
(12, 11, 'image11.JPG'),
(13, 12, 'image12.JPG'),
(14, 13, 'image13.JPG'),
(15, 14, 'image14.jpg'),
(16, 1, 'image7.JPG'),
(17, 1, 'image12.JPG'),
(18, 3, 'image9.JPG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `address` varchar(70) NOT NULL,
  `city` varchar(50) NOT NULL,
  `id_country` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `postcode` varchar(50) NOT NULL,
  `id_obra_arte` int(11) NOT NULL,
  `price_picture` int(11) NOT NULL,
  `fecha_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `estado_pago` enum('no_pagado','pagado','','') NOT NULL DEFAULT 'no_pagado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `address`, `city`, `id_country`, `name`, `id_user`, `phone`, `postcode`, `id_obra_arte`, `price_picture`, `fecha_compra`, `estado_pago`) VALUES
(4, 'gfhgfh', 'gfhgfhgf', 2, 'Facundo somoza', 1, 'hgfhgfh', 'gfhfgh', 1, 1000, '2022-12-13 11:03:22', 'no_pagado'),
(5, 'gfhgfh', 'gfhgfhgf', 2, 'Facundo somoza', 1, 'hgfhgfh', 'gfhfgh', 1, 1000, '2022-12-13 11:03:30', 'no_pagado'),
(6, 'fwef', 'fwefew', 2, 'fwef', 6, 'ewfwef', 'fewfwe', 1, 1000, '2022-12-13 11:08:44', 'no_pagado'),
(7, 'fwefwe', 'fewfew', 3, 'pablo ', 6, 'fwef', 'ewffwef', 1, 1000, '2022-12-13 11:10:05', 'no_pagado'),
(8, 'fwefwe', 'fewfew', 3, 'pablo ', 6, 'fwef', 'ewffwef', 1, 1000, '2022-12-13 11:10:14', 'no_pagado'),
(11, 'frefre', 'ferfer', 2, 'joseeeee', 14, 'ferfre', 'ferfre', 1, 1000, '2022-12-13 11:23:30', 'no_pagado'),
(12, 'frefre', 'ferfer', 2, 'joseeeee', 14, 'ferfre', 'ferfre', 1, 1000, '2022-12-13 11:23:38', 'no_pagado'),
(13, 'vdsv', 'dsvsdvds', 5, 'fsdfcsd', 15, 'vcsdvds', 'vdsvds', 1, 1000, '2022-12-13 11:28:09', 'no_pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'facundo@gmail.com', '123456'),
(3, 'fsomoza@gmail.com', '123456'),
(4, 'vdsdvds', 'vdsvdsvsd'),
(5, 'pp@pp.com', '123456'),
(6, 'facu@gmail.com', '123456'),
(7, 'ggg@gmail.com', '123456'),
(8, 'lionel@gmail.com', '123456'),
(9, 'lionel@gmail.com', '123456'),
(10, 'jo@gmail.com', '123456'),
(11, 'jo1@gmail.com', '123456'),
(12, 'jo2@gmail.com', '123456'),
(13, 'jo5@gmail.com', '123456'),
(14, 'jo6@gmail.com', '123456'),
(15, 'jo10@gmail.com', '123456'),
(16, 'enrique@gmail.com', '123456'),
(17, 'pppp@gmail.com', '123456'),
(18, 'rororo@gmail.com', '123456'),
(19, 'rolo@gmail.com', '123456'),
(20, 'angel100@gmail.com', '123456'),
(21, 'juli1@gmail.com', '123456'),
(22, 'juli2@gmail.com', '123456'),
(23, 'juli3@gmail.com', '123456'),
(24, 'juli5@gmail.com', '123456'),
(25, 'juli6@gmail.com', '123456'),
(26, 'juli11@gmail.com', '123456'),
(27, 'juli12@gmail.com', '123456'),
(28, 'lele@gmail.com', '123456'),
(29, 'ggggg@gmail.com', '123456');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_obra_arte`,`id_usuario`) USING BTREE,
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuadros_arte`
--
ALTER TABLE `cuadros_arte`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_cuadros_arte`
--
ALTER TABLE `imagenes_cuadros_arte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cuadros_arte` (`id_cuadros_arte`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_country` (`id_country`),
  ADD KEY `id_obra_arte` (`id_obra_arte`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id_obra_arte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cuadros_arte`
--
ALTER TABLE `cuadros_arte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `imagenes_cuadros_arte`
--
ALTER TABLE `imagenes_cuadros_arte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_obra_arte`) REFERENCES `cuadros_arte` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `imagenes_cuadros_arte`
--
ALTER TABLE `imagenes_cuadros_arte`
  ADD CONSTRAINT `imagenes_cuadros_arte_ibfk_1` FOREIGN KEY (`id_cuadros_arte`) REFERENCES `cuadros_arte` (`id`);

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`id_country`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`id_obra_arte`) REFERENCES `cuadros_arte` (`id`),
  ADD CONSTRAINT `purchases_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
