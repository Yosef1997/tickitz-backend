-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2021 at 04:12 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express-backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `priceOneSeat` varchar(11) NOT NULL,
  `time` varchar(100) DEFAULT NULL,
  `picture` varchar(80) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `address`, `priceOneSeat`, `time`, `picture`, `createdBy`) VALUES
(1, 'ebv.id', 'Whatever street No.12, South Purwokerto', '$ 10.0', '09.00 am, 11.30 pm, 14.30 pm, 09.00 am, 10.00 am, 11.30 pm', 'uploadsebv.png', 2),
(2, 'CineOne21', 'Downcare street No. 21, East Purwokerto', '$ 10.0', '09.00 am, 11.30 pm, 14.30 pm', 'uploadsCineOne21.png', 2),
(3, 'hiflix Cinema', 'Colonel street No. 2, East Purwokerto', '$ 10.0', '09.00 am, 11.30 pm, 14.30 pm', 'uploadshiflix.png', 2);

-- --------------------------------------------------------

--
-- Table structure for table `cinemaschedule`
--

CREATE TABLE `cinemaschedule` (
  `id` int(11) NOT NULL,
  `idCinemas` int(11) DEFAULT NULL,
  `idShowTime` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `uploadedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cinemaschedule`
--

INSERT INTO `cinemaschedule` (`id`, `idCinemas`, `idShowTime`, `createdAt`, `uploadedAt`) VALUES
(13, 1, 1, '2021-01-27 16:00:42', NULL),
(14, 1, 3, '2021-01-27 16:00:42', NULL),
(15, 1, 6, '2021-01-27 16:00:42', NULL),
(19, 5, 1, '2021-01-27 16:55:28', NULL),
(20, 5, 2, '2021-01-27 16:55:28', NULL),
(21, 5, 3, '2021-01-27 16:55:28', NULL),
(22, 6, 1, '2021-01-27 16:57:06', NULL),
(23, 6, 2, '2021-01-27 16:57:06', NULL),
(24, 6, 3, '2021-01-27 16:57:06', NULL),
(25, 1, 1, '2021-01-27 16:59:53', NULL),
(26, 1, 2, '2021-01-27 16:59:53', NULL),
(27, 1, 3, '2021-01-27 16:59:53', NULL),
(40, 3, 1, '2021-01-27 17:40:12', NULL),
(41, 3, 3, '2021-01-27 17:40:12', NULL),
(42, 3, 6, '2021-01-27 17:40:12', NULL),
(52, 2, 1, '2021-01-27 18:14:52', NULL),
(53, 2, 3, '2021-01-27 18:14:52', NULL),
(54, 2, 6, '2021-01-27 18:14:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `genre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `genre`) VALUES
(1, 'Action'),
(2, 'Adventure'),
(3, 'Animation'),
(4, 'Biography'),
(5, 'Comedy'),
(6, 'Crime'),
(7, 'Documentary'),
(8, 'Drama'),
(9, 'Family'),
(10, 'History'),
(11, 'Horor'),
(12, 'Sci-Fi'),
(13, 'Thriller'),
(14, 'Mystery');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `city` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `city`, `createdAt`, `updatedAt`) VALUES
(1, 'jakarta barat', '2021-01-27 06:00:54', NULL),
(2, 'jakarta utara', '2021-01-27 06:01:13', NULL),
(3, 'jakarta selatan', '2021-01-27 06:01:22', '2021-01-27 06:06:53'),
(4, 'jakarta timur', '2021-01-27 06:01:32', NULL),
(5, 'depok', '2021-01-27 06:01:38', NULL),
(6, 'bekasi', '2021-01-27 06:01:44', NULL),
(7, 'tangerang', '2021-01-27 06:01:50', NULL),
(8, 'bandung', '2021-01-27 06:01:55', NULL),
(9, 'semarang', '2021-01-27 06:02:00', NULL),
(10, 'yogyakarta', '2021-01-27 06:02:22', NULL),
(11, 'purwokerto', '2021-01-27 06:07:34', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movierelation`
--

CREATE TABLE `movierelation` (
  `id` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `idGenre` int(11) NOT NULL,
  `createAT` timestamp NOT NULL DEFAULT current_timestamp(),
  `uploadAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movierelation`
--

INSERT INTO `movierelation` (`id`, `idMovie`, `idGenre`, `createAT`, `uploadAt`) VALUES
(1, 1, 2, '2021-01-26 08:51:57', NULL),
(2, 1, 3, '2021-01-26 08:51:57', NULL),
(3, 1, 5, '2021-01-26 08:51:57', NULL),
(4, 2, 7, '2021-01-26 08:56:34', NULL),
(5, 3, 1, '2021-01-26 09:04:27', NULL),
(6, 3, 13, '2021-01-26 09:04:27', NULL),
(7, 4, 8, '2021-01-26 09:06:33', NULL),
(8, 4, 13, '2021-01-26 09:06:33', NULL),
(9, 5, 1, '2021-01-26 09:08:09', NULL),
(10, 6, 8, '2021-01-26 09:10:11', NULL),
(11, 7, 6, '2021-01-26 09:13:23', NULL),
(12, 7, 8, '2021-01-26 09:13:23', NULL),
(13, 7, 13, '2021-01-26 09:13:23', NULL),
(14, 8, 11, '2021-01-26 10:24:06', NULL),
(15, 8, 13, '2021-01-26 10:24:06', NULL),
(16, 8, 14, '2021-01-26 10:24:06', NULL),
(17, 9, 8, '2021-01-26 10:25:41', NULL),
(18, 10, 4, '2021-01-26 10:28:32', NULL),
(19, 10, 8, '2021-01-26 10:28:32', NULL),
(20, 10, 10, '2021-01-26 10:28:32', NULL),
(21, 11, 5, '2021-01-26 10:29:54', NULL),
(22, 11, 8, '2021-01-26 10:29:54', NULL),
(23, 12, 2, '2021-01-26 10:32:20', NULL),
(24, 12, 3, '2021-01-26 10:32:20', NULL),
(25, 12, 5, '2021-01-26 10:32:20', NULL),
(26, 13, 1, '2021-01-26 10:34:19', NULL),
(27, 13, 6, '2021-01-26 10:34:19', NULL),
(28, 13, 8, '2021-01-26 10:34:19', NULL),
(29, 14, 2, '2021-01-26 10:35:56', NULL),
(30, 14, 12, '2021-01-26 10:35:56', NULL),
(31, 15, 1, '2021-01-26 10:37:49', NULL),
(32, 15, 2, '2021-01-26 10:37:49', NULL),
(33, 15, 3, '2021-01-26 10:37:49', NULL),
(34, 16, 1, '2021-01-26 10:39:08', NULL),
(35, 16, 2, '2021-01-26 10:39:08', NULL),
(36, 16, 5, '2021-01-26 10:39:08', NULL),
(37, 17, 1, '2021-01-26 10:42:02', NULL),
(38, 17, 12, '2021-01-26 10:42:02', NULL),
(39, 17, 13, '2021-01-26 10:42:02', NULL),
(40, 18, 1, '2021-01-26 10:43:30', NULL),
(41, 18, 2, '2021-01-26 10:43:30', NULL),
(42, 18, 13, '2021-01-26 10:43:30', NULL),
(43, 19, 8, '2021-01-26 10:45:01', NULL),
(44, 19, 11, '2021-01-26 10:45:01', NULL),
(45, 19, 12, '2021-01-26 10:45:01', NULL),
(46, 20, 1, '2021-01-26 10:46:16', NULL),
(47, 20, 2, '2021-01-26 10:46:16', NULL),
(48, 20, 12, '2021-01-26 10:46:16', NULL),
(49, 21, 1, '2021-01-26 10:48:09', NULL),
(50, 21, 2, '2021-01-26 10:48:09', NULL),
(51, 21, 12, '2021-01-26 10:48:09', NULL),
(52, 22, 3, '2021-01-26 10:50:07', NULL),
(53, 22, 4, '2021-01-26 10:50:07', NULL),
(54, 22, 9, '2021-01-26 10:50:07', NULL),
(55, 23, 1, '2021-01-26 10:51:27', NULL),
(56, 23, 2, '2021-01-26 10:51:27', NULL),
(57, 23, 5, '2021-01-26 10:51:27', NULL),
(58, 24, 1, '2021-01-26 10:52:38', NULL),
(59, 24, 2, '2021-01-26 10:52:38', NULL),
(60, 24, 6, '2021-01-26 10:52:38', NULL),
(61, 25, 1, '2021-01-26 13:22:27', NULL),
(62, 25, 8, '2021-01-26 13:22:27', NULL),
(63, 26, 2, '2021-01-27 07:46:58', NULL),
(64, 26, 3, '2021-01-27 07:46:58', NULL),
(65, 26, 5, '2021-01-27 07:46:58', NULL),
(66, 27, 2, '2021-01-27 07:54:57', NULL),
(67, 27, 3, '2021-01-27 07:54:57', NULL),
(68, 27, 5, '2021-01-27 07:54:57', NULL),
(69, 28, 1, '2021-01-27 07:55:44', '2021-01-27 09:37:30'),
(70, 28, 1, '2021-01-27 07:55:44', '2021-01-27 09:37:30'),
(71, 28, 1, '2021-01-27 07:55:44', '2021-01-27 09:37:30'),
(72, 29, 1, '2021-01-27 10:35:37', NULL),
(73, 29, 2, '2021-01-27 10:35:37', NULL),
(74, 29, 6, '2021-01-27 10:35:37', NULL),
(78, 31, 1, '2021-01-27 11:03:42', NULL),
(79, 31, 2, '2021-01-27 11:03:42', NULL),
(80, 31, 6, '2021-01-27 11:03:42', NULL),
(81, 32, 1, '2021-01-27 12:52:50', NULL),
(82, 32, 2, '2021-01-27 12:52:50', NULL),
(83, 32, 6, '2021-01-27 12:52:50', NULL),
(99, 33, 1, '2021-01-27 13:59:50', NULL),
(100, 33, 2, '2021-01-27 13:59:50', NULL),
(101, 33, 6, '2021-01-27 13:59:50', NULL),
(102, 34, 1, '2021-01-27 14:00:39', NULL),
(105, 30, 1, '2021-01-27 16:04:31', NULL),
(106, 30, 2, '2021-01-27 16:04:31', NULL),
(107, 35, 1, '2021-01-27 16:07:59', NULL),
(108, 35, 2, '2021-01-27 16:07:59', NULL),
(109, 35, 6, '2021-01-27 16:07:59', NULL),
(110, 36, 1, '2021-01-27 17:47:22', NULL),
(111, 36, 2, '2021-01-27 17:47:22', NULL),
(112, 36, 6, '2021-01-27 17:47:22', NULL),
(113, 37, 1, '2021-01-27 17:48:35', NULL),
(114, 37, 2, '2021-01-27 17:48:35', NULL),
(115, 37, 6, '2021-01-27 17:48:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `releaseDate` date NOT NULL,
  `duration` varchar(20) NOT NULL,
  `genre` text NOT NULL,
  `description` text NOT NULL,
  `director` text NOT NULL,
  `stars` text DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `name`, `picture`, `releaseDate`, `duration`, `genre`, `description`, `director`, `stars`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Minions: The Rise of Gru', 'uploadsMinion.jpg', '2021-06-30', '1h 30m', 'Adventure, Animation, Comedy', 'The untold story of one twelve-year-old\'s dream to become the world\'s greatest supervillain. ', 'Kyle Balda, Brad Ableson', 'Steve Carell, Julie Andrews, Michelle Yeoh', 8, '2021-01-26 08:51:57', '2021-01-26 08:51:58'),
(2, 'Some Kind of Heaven', 'uploadsSome Kind of Heaven.jpg', '2021-01-21', '1h 21min', 'Documentary', 'Behind the gates of a palm tree-lined fantasyland, four residents of America\'s largest retirement community, The Villages, FL, strive to find solace and meaning.', 'Lance Oppenheim', 'null', 8, '2021-01-26 08:56:34', '2021-01-26 08:56:34'),
(3, 'The Marksman', 'uploadsThe Marksman.jpg', '2021-01-21', '1h 48min', 'Action, Thriller', 'A rancher on the Arizona border becomes the unlikely defender of a young Mexican boy desperately fleeing the cartel assassins who\'ve pursued him into the U.S.', 'Robert Lorenz', 'Katheryn Winnick, Liam Neeson, Teresa Ruiz, Juan Pablo Raba', 8, '2021-01-26 09:04:27', '2021-01-26 09:04:28'),
(4, 'Don\'t Tell a Soul', 'uploadsDon\'t Tell a Soul.jpg', '2021-01-15', '1h 23min', 'Drama, Thriller', 'Two thieving teenage brothers, stealing money to help their sick mom, match wits with a troubled security guard stuck at the bottom of a forgotten well.', 'Alex McAulay', 'Fionn Whitehead, Jack Dylan Grazer, Mena Suvari, Rainn Wilson', 8, '2021-01-26 09:06:33', '2021-01-26 09:06:33'),
(5, 'Run Hide Fight', 'uploadsRun Hide Fight.jpg', '2021-01-14', '1h 49min', 'Action', '17-year-old Zoe Hull uses her wits, survival skills, and compassion to fight for her life, and those of her fellow classmates, against a group of live-streaming school shooters.', 'Kyle Rankin', 'Thomas Jane, Radha Mitchell, Isabel May, Eli Brown', 8, '2021-01-26 09:08:09', '2021-01-26 09:08:10'),
(6, 'The Friend', 'uploadsThe Friend.jpg', '2021-01-22', '2h 4min', 'Drama', 'After receiving life-altering news, a couple finds unexpected support from their best friend, who puts his own life on hold and moves into their family home, bringing an impact much greater and more profound than anyone could have imagined', 'Gabriela Cowperthwaite', 'Dakota Johnson, Gwendoline Christie, Casey Affleck', 8, '2021-01-26 09:10:11', '2021-01-26 09:10:11'),
(7, 'The Little Things', 'uploadsThe Little Things.jpg', '2021-01-29', 'undefined', 'Crime, Drama, Thriller', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 8, '2021-01-26 09:13:23', '2021-01-26 10:03:53'),
(8, 'The Night', 'uploadsThe Night.jpg', '2021-01-29', '1h 45min', 'Horor, Thriller, Mystery', 'An Iranian couple living in the US become trapped inside a hotel when insidious events force them to face the secrets that have come between them, in a night that never ends.', 'Kourosh Ahari', 'Shahab Hosseini, Niousha Noor, George Maguire', 8, '2021-01-26 10:24:06', '2021-01-26 10:24:06'),
(9, 'Minamata', 'uploadsMinamata.jpg', '2021-03-13', '1h 55min', 'Drama', 'War photographer W. Eugene Smith travels back to Japan where he documents the devastating effect of mercury poisoning in coastal communities.', 'Andrew Levitas', 'Johnny Depp, Bill Nighy, Hiroyuki Sanada', 8, '2021-01-26 10:25:41', '2021-01-26 10:25:41'),
(10, 'Judas and the Black Messiah', 'uploadsJudas and the Black Messiah.jpg', '2021-02-12', '2h 6m', 'Biography, Drama, History', 'The story of Fred Hampton, Chairman of the Illinois Black Panther Party, and his fateful betrayal by FBI informant William O\'Neal.', 'Shaka King', 'Daniel Kaluuya, LaKeith Stanfield, Jesse Plemons', 8, '2021-01-26 10:28:32', '2021-01-26 10:28:32'),
(11, 'French Exit', 'uploadsFrench Exit.jpg', '2021-02-26', '1h 50min', 'Comedy, Drama', 'An aging Manhattan socialite living on what\'s barely left of her inheritance moves to a small apartment in Paris with her son and cat.', 'Azazel Jacobs', 'Michelle Pfeiffer, Lucas Hedges, Tracy Letts', 8, '2021-01-26 10:29:54', '2021-01-26 10:29:54'),
(12, 'Tom and Jerry', 'uploadsTom and Jerry.jpg', '2021-02-11', '', 'Adventure, Animation, Comedy', 'Adaption of the classic Hanna-Barbera property, which reveals how Tom and Jerry first meet and form their rivalry.', 'Tim Story', 'Chloë Grace Moretz, Michael Peña, Rob Delaney', 8, '2021-01-26 10:32:20', '2021-01-26 10:32:20'),
(13, 'Nobody', 'uploadsNobody.jpg', '2021-02-26', '1h 32min', 'Action, Crime, Drama', 'A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.', 'Ilya Naishuller', 'Bob Odenkirk, Connie Nielsen, Christopher Lloyd', 8, '2021-01-26 10:34:19', '2021-01-26 10:34:19'),
(14, 'Chaos Walking', 'uploadsChaos Walking.jpg', '2021-03-05', '1h 48m', 'Adventure, Sci-Fi', 'A dystopian world where there are no women and all living creatures can hear each other\'s thoughts in a stream of images, words, and sounds called Noise.', 'Doug Liman', 'Tom Holland, Mads Mikkelsen, Daisy Ridley', 8, '2021-01-26 10:35:56', '2021-01-26 10:35:56'),
(15, 'Raya and the Last Dragon', 'uploadsRaya and the Last Dragon.jpg', '2021-03-10', '', 'Action, Adventure, Animation', 'In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon.', 'Don Hall, Carlos López Estrada', 'Kelly Marie Tran, Awkwafina', 8, '2021-01-26 10:37:49', '2021-01-26 10:37:50'),
(16, 'The King\'s Man', 'uploadsThe King\'s Man.jpg', '2021-03-12', '2h 11m', 'Action, Adventure, Comedy', 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.', 'Matthew Vaughn', 'Matthew Goode, Gemma Arterton, Aaron Taylor-Johnson', 8, '2021-01-26 10:39:08', '2021-01-26 10:39:09'),
(17, 'Godzilla vs. Kong', 'uploadsGodzilla vs. Kong.jpg', '2021-03-26', '', 'Action, Sci-Fi, Thriller', 'The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.', 'Adam Wingard', 'Alexander Skarsgård, Millie Bobby Brown, Rebecca Hall', 8, '2021-01-26 10:42:02', '2021-01-26 10:42:02'),
(18, 'No Time to Die', 'uploadsNo Time to Die.jpg', '2021-03-31', '2h 43min', 'Action, Adventure, Thriller', 'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.', 'Cary Joji Fukunaga', 'Daniel Craig, Ana de Armas, Rami Malek', 8, '2021-01-26 10:43:30', '2021-01-26 10:43:31'),
(19, 'A Quiet Place Part II', 'uploadsA Quiet Place Part II.jpg', '2021-04-21', '1h 37min', 'Drama, Horor, Sci-Fi', 'Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize the creatures that hunt by sound are not the only threats lurking beyond the sand path.', 'John Krasinski', 'Emily Blunt, Millicent Simmonds, Cillian Murphy', 8, '2021-01-26 10:45:01', '2021-01-26 10:45:01'),
(20, 'Black Widow', 'uploadsA Quiet Place Part II.jpg', '2021-05-05', '1h 37min', 'Action, Adventure, Sci-Fi', 'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.', 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', 8, '2021-01-26 10:46:16', '2021-01-26 10:46:17'),
(21, 'Black Widow', 'uploadsBlack Widow.jpg', '2021-05-05', '1h 37min', 'Action, Adventure, Sci-Fi', 'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.', 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', 8, '2021-01-26 10:48:09', '2021-01-26 10:48:09'),
(22, 'Rumble', 'uploadsRumble.jpg', '2021-05-14', '', 'Animation, Biography, Family', 'In a world where monster wrestling is a global sport and monsters are superstar athletes, teenage Winnie seeks to follow in her father\'s footsteps by coaching a loveable underdog monster into a champion.', 'Hamish Grieve', 'Ben Schwartz, Terry Crews, Will Arnett', 8, '2021-01-26 10:50:07', '2021-01-26 10:50:07'),
(23, 'Free Guy', 'uploadsFree Guy.jpg', '2021-05-21', '', 'Action, Adventure, Comedy', 'A bank teller discovers that he\'s actually an NPC inside a brutal, open world video game.', 'Shawn Levy', 'Ryan Reynolds, Jodie Comer, Taika Waititi', 8, '2021-01-26 10:51:26', '2021-01-26 10:51:27'),
(24, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', 'Action, Adventure, Crime', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 8, '2021-01-26 10:52:38', '2021-01-26 10:52:38'),
(25, 'Top Gun: Maverick', 'uploadsTop Gun Maverick.jpg', '2021-06-02', '1h', 'Action, Drama', 'After more than thirty years of service as one of the Navy\'s top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. ', 'Joseph Kosinski', 'Tom Cruise, Jennifer Connelly, Miles Teller', 8, '2021-01-26 13:22:27', '2021-01-26 13:36:22'),
(26, 'The Boss Baby: Family Business', 'uploadsThe Boss Baby Family Business.jpg', '2021-09-17', '', 'Adventure, Animation, Comedy', 'The Templeton brothers have become adults and drifted away from each other, but a new boss baby with a cutting-edge approach is about to bring them together again - and inspire a new family business. ', 'Tom McGrath', 'James Marsden, Amy Sedaris, Jeff Goldblum', 2, '2021-01-27 07:46:58', '2021-01-27 07:46:58'),
(27, 'The Boss Baby: Family Business', 'uploadsThe Boss Baby Family Business.jpg', '2021-09-17', '', '', 'The Templeton brothers have become adults and drifted away from each other, but a new boss baby with a cutting-edge approach is about to bring them together again - and inspire a new family business. ', 'Tom McGrath', 'James Marsden, Amy Sedaris, Jeff Goldblum', 2, '2021-01-27 07:54:57', NULL),
(28, 'The Boss Baby: Family Business', 'uploadsThe Little Things.jpg', '2021-09-17', '2h', '', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 2, '2021-01-27 07:55:44', '2021-01-27 10:59:04'),
(29, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', 'Action, Adventure, Crime', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 10:35:37', '2021-01-27 10:35:37'),
(30, 'The Boss Baby: Family Business', 'uploadsThe Little Things.jpg', '2021-09-17', '2h', '', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 2, '2021-01-27 10:36:30', '2021-01-27 11:03:55'),
(31, 'The Boss Baby: Family Business', 'uploadsThe Little Things.jpg', '2021-09-17', '2h', '1,2,4', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 2, '2021-01-27 11:03:42', '2021-01-27 18:08:18'),
(32, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', '', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 12:52:50', NULL),
(33, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', '', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 13:59:50', NULL),
(34, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', '', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 14:00:39', NULL),
(35, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', '', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 16:07:58', NULL),
(36, 'F9', 'uploadsF9.jpg', '2021-05-28', '2h 25min', ', , ', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 2, '2021-01-27 17:47:22', '2021-01-27 17:47:22'),
(37, 'The Boss Baby: Family Business', 'uploadsThe Little Things.jpg', '2021-09-17', '2h', '1,2,4', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 2, '2021-01-27 17:48:35', '2021-01-27 17:54:24');

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `note` text NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `showtime`
--

CREATE TABLE `showtime` (
  `id` int(11) NOT NULL,
  `time` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `showtime`
--

INSERT INTO `showtime` (`id`, `time`, `createdAt`, `updatedAt`) VALUES
(1, '09.00 am', '2021-01-26 16:20:30', NULL),
(2, '10.00 am', '2021-01-26 16:20:39', NULL),
(3, '11.30 pm', '2021-01-26 16:20:54', '2021-01-26 16:56:33'),
(4, '12.00 am', '2021-01-26 16:21:05', '2021-01-27 09:22:38'),
(5, '13.00 pm', '2021-01-26 16:21:13', '2021-01-26 16:39:21'),
(6, '14.30 pm', '2021-01-26 16:21:36', NULL),
(7, '15.30 pm', '2021-01-26 16:21:43', NULL),
(8, '17.00 pm', '2021-01-26 16:21:56', NULL),
(9, '19.00 pm', '2021-01-26 16:22:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `createdAt`, `updateAt`) VALUES
(1, 'tes', '1234', '2021-01-27 03:41:18', NULL),
(2, 'minion', '$2b$10$ZdLPtKR4u2U5JvviqJ.xr.VAUXiSMMMEowsy8XUPtHiC5gLYYliN2', '2021-01-27 04:34:23', NULL),
(3, 'undefined', '$2b$10$xiRm9lOpt6v1XYlvq2d43.PevmnBXfU1FH1hthm4yOQq2MJwo2W5K', '2021-01-28 01:13:48', NULL),
(4, 'doraemon', '$2b$10$l8ts3hEpxGIdEHcbATXM5e4NLw8hT0dcCraikv7BYujksQbIYCS6a', '2021-01-28 01:15:55', NULL),
(5, 'dora', '$2b$10$0M6RHtuUMhAaQivNClGsuufBMpPLqal9pUEZhLwxXTFV7XPKlAvXy', '2021-01-28 01:31:57', NULL),
(6, 'dora', '$2b$10$t0BnR/4pY/eodUYeVtigAO9/FN7iKBlIqHw4l1DxMQw9/IaoLGVdm', '2021-01-28 01:35:13', NULL),
(7, 'dorai', '$2b$10$ORRCAHTcTgeoTBEZQLXb3epuExMau.EedoFrSD9ydj4c1olgx/wJC', '2021-01-28 01:37:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cinemaschedule`
--
ALTER TABLE `cinemaschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCinemas` (`idCinemas`),
  ADD KEY `idShowTime` (`idShowTime`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movierelation`
--
ALTER TABLE `movierelation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMovie` (`idMovie`),
  ADD KEY `idGenre` (`idGenre`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `showtime`
--
ALTER TABLE `showtime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cinemaschedule`
--
ALTER TABLE `cinemaschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `movierelation`
--
ALTER TABLE `movierelation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `showtime`
--
ALTER TABLE `showtime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cinemaschedule`
--
ALTER TABLE `cinemaschedule`
  ADD CONSTRAINT `cinemaschedule_ibfk_1` FOREIGN KEY (`idCinemas`) REFERENCES `cinemas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cinemaschedule_ibfk_2` FOREIGN KEY (`idShowTime`) REFERENCES `showtime` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `movierelation`
--
ALTER TABLE `movierelation`
  ADD CONSTRAINT `movierelation_ibfk_1` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movierelation_ibfk_2` FOREIGN KEY (`idGenre`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
