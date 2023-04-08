-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Kwi 2023, 20:06
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `moviemaniac_users`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `id` varchar(36) NOT NULL,
  `commented_id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `comment` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `avatar` smallint(2) NOT NULL,
  `type` varchar(5) NOT NULL,
  `liked` int(5) NOT NULL DEFAULT 0,
  `disliked` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`id`, `commented_id`, `name`, `comment`, `created_at`, `avatar`, `type`, `liked`, `disliked`) VALUES
('a47ba0e1-3038-4f1e-9a6e-b8867165a8d2', 'tt0088247', 'Jarek', 'dfddfdf', '2023-03-28 20:21:35', 1, 'movie', 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments_answers`
--

CREATE TABLE `comments_answers` (
  `id` varchar(36) NOT NULL,
  `comment_id` varchar(36) NOT NULL,
  `comment` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user` varchar(20) NOT NULL,
  `avatar` smallint(2) NOT NULL,
  `liked` int(5) NOT NULL DEFAULT 0,
  `disliked` int(5) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `comments_answers`
--

INSERT INTO `comments_answers` (`id`, `comment_id`, `comment`, `created_at`, `user`, `avatar`, `liked`, `disliked`) VALUES
('6f886cef-7085-4d46-9bb1-ff3021a50b0a', 'b8227dbc-b61a-49cc-aa4c-164d420fc157', 'fdfdf', '2023-03-28 20:19:09', 'Jarek', 1, 0, 0),
('74697c52-3d97-434d-9d32-02e24c8d7ccb', '88a2fc71-6afa-4c3e-b2db-04e39af1b1e5', 'fgfggfgf', '2023-03-28 20:09:22', 'Jarek', 1, 0, 0),
('ddfb5c30-d2bd-4685-8e26-6f2a4a08f82c', 'a2f2532e-b9f2-438e-89d1-b1d77f4b49ee', 'fghgggh', '2023-03-28 20:11:41', 'Jarek', 1, 0, 0),
('de444f04-ca0a-4b67-8e2d-8cda961b9932', '88a2fc71-6afa-4c3e-b2db-04e39af1b1e5', 'ffff', '2023-03-28 20:10:50', 'Jarek', 1, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments_dislikes`
--

CREATE TABLE `comments_dislikes` (
  `id` varchar(36) NOT NULL,
  `disliked_id` varchar(36) NOT NULL,
  `user` varchar(20) NOT NULL,
  `original_comment_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments_likes`
--

CREATE TABLE `comments_likes` (
  `id` varchar(36) NOT NULL,
  `liked_id` varchar(36) NOT NULL,
  `user` varchar(20) NOT NULL,
  `original_comment_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `comments_likes`
--

INSERT INTO `comments_likes` (`id`, `liked_id`, `user`, `original_comment_id`) VALUES
('e6ae2852-958c-4325-ae28-f386978bc680', 'a47ba0e1-3038-4f1e-9a6e-b8867165a8d2', 'Jarek', 'a47ba0e1-3038-4f1e-9a6e-b8867165a8d2');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourites`
--

CREATE TABLE `favourites` (
  `id` varchar(36) NOT NULL,
  `movie_id` varchar(40) NOT NULL,
  `user` varchar(50) NOT NULL,
  `name` varchar(80) NOT NULL,
  `image` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `favourites`
--

INSERT INTO `favourites` (`id`, `movie_id`, `user`, `name`, `image`) VALUES
('0e053318-180d-4afc-94cf-5082f8e34f42', 'tt0052520', 'Jarek', 'The Twilight Zone', 'https://m.media-amazon.com/images/M/MV5BNTAzMDI5MzgtMGNkMC00MzllLWJhNjctNjA1NmViNGUxMzYxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6757_AL_.jpg'),
('420e23de-053e-414b-b426-1d3ae3f9a7ed', 'tt0119594', 'Jarek', 'Twilight', 'https://m.media-amazon.com/images/M/MV5BZmJiMjBmMzYtYzIxNi00NjA2LWIxZmEtYzJlMWVkMDg1MTlmXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_Ratio0.6757_AL_.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `favourite_actors`
--

CREATE TABLE `favourite_actors` (
  `id` varchar(36) NOT NULL,
  `actor_id` varchar(40) NOT NULL,
  `user` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(320) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `favourite_actors`
--

INSERT INTO `favourite_actors` (`id`, `actor_id`, `user`, `name`, `image`) VALUES
('91875e5e-a81f-48f3-9b85-79d9b1365891', 'nm0785245', 'Jarek', 'Rod Serling', 'https://m.media-amazon.com/images/M/MV5BMTY3OTU5NjMwMV5BMl5BanBnXkFtZTcwODYwNDMzMQ@@._V1_Ratio0.6751_AL_.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `userslist`
--

CREATE TABLE `userslist` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `passwordhash` varchar(65) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isverified` smallint(2) NOT NULL DEFAULT 0,
  `avatar` smallint(1) NOT NULL DEFAULT 0,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `verification_code` smallint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `userslist`
--

INSERT INTO `userslist` (`id`, `name`, `passwordhash`, `email`, `isverified`, `avatar`, `date`, `verification_code`) VALUES
('5968d62f-1139-410c-b226-01dd90ed7675', 'bobek', '$2b$10$Ix.y3Fo6x81BQxm514nrn.mkbGmAhyDg/5MI0PkrTBLBbb/gBr7mu', 'jarekkrolik@vp.pl', 1, 6, '2023-02-23', 3579),
('229bb8e9-8d1a-456c-ac06-47b43d94dff5', 'Jarek', '$2b$10$7uBBCHV82Oyu/8Vie/oGr.2olVgVIHtLsF/I8YUiaZ.aXpygpgqwC', 'jarekkrolik@vp.pl', 1, 5, '2023-02-19', 3357),
('ad3e8168-0195-4ae6-94ce-1f6da8d0e6be', 'testowy', '$2b$10$lpd0GFyZXsktcE6Nlqxl5.CrFrrUTMKPgFiaBaRro8XtsvvBXl6Xy', 'jarekkrolik@vp.pl', 1, 0, '2023-04-04', 2433),
('c451eafe-38f5-48e4-b69e-4ca0c73bca33', 'TestUser', '$2b$10$Rr1oq3JUSPV.V2WveBdsWO3yK08memW5zZUggAMOT0rtE5.u3Tnz.', 'madmax@onet.eu', 1, 0, '2023-04-03', 2037);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `comments_answers`
--
ALTER TABLE `comments_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- Indeksy dla tabeli `comments_dislikes`
--
ALTER TABLE `comments_dislikes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `comments_likes`
--
ALTER TABLE `comments_likes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `favourites`
--
ALTER TABLE `favourites`
  ADD KEY `id` (`id`);

--
-- Indeksy dla tabeli `favourite_actors`
--
ALTER TABLE `favourite_actors`
  ADD KEY `id` (`id`);

--
-- Indeksy dla tabeli `userslist`
--
ALTER TABLE `userslist`
  ADD PRIMARY KEY (`name`),
  ADD KEY `name` (`name`),
  ADD KEY `id` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
