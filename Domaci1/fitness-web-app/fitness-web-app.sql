-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2025 at 11:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitness-web-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `reps_or_time` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `workout_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `description`, `reps_or_time`, `created_at`, `updated_at`, `type`, `workout_id`) VALUES
(1, 'laborum', 'Sequi et repudiandae perferendis aut necessitatibus quae.', 44, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 21),
(2, 'sint', 'Nobis nemo laudantium cupiditate quasi.', 56, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 22),
(3, 'beatae', 'Incidunt aut eveniet sint quisquam et.', 55, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 23),
(4, 'eaque', 'Quidem accusantium hic beatae consectetur aperiam sunt nihil.', 52, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 24),
(5, 'veniam', 'Est enim est eos aut.', 30, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 25),
(6, 'accusamus', 'Quisquam nam pariatur fuga atque.', 33, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 26),
(7, 'magnam', 'Saepe fugiat non ut quibusdam ullam.', 38, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 27),
(8, 'incidunt', 'Qui sunt voluptas modi quasi nihil.', 5, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 28),
(9, 'veniam', 'Dolorem reiciendis cum incidunt sunt et impedit.', 35, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 29),
(10, 'fuga', 'Rerum voluptates eum delectus vel debitis.', 12, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 30),
(11, 'expedita', 'Qui voluptates quos earum aut iure voluptate consectetur.', 33, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 31),
(12, 'provident', 'Quo velit nostrum debitis veniam rem.', 54, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 32),
(13, 'nostrum', 'Consequatur possimus ea eligendi laborum unde dolores.', 32, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 33),
(14, 'animi', 'Nihil consequatur consequatur voluptatibus non modi veniam porro consequatur.', 22, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 34),
(15, 'quam', 'Ipsa ad est repellat ex in vel impedit.', 22, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 35),
(16, 'natus', 'Non ea iusto temporibus dolor.', 43, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 36),
(17, 'commodi', 'Quisquam eaque atque quasi id.', 14, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 37),
(18, 'vel', 'Minima qui voluptatem repudiandae laudantium consequatur exercitationem.', 15, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 38),
(19, 'eos', 'Blanditiis dolores quibusdam provident qui.', 36, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 39),
(20, 'consequatur', 'Dolor et ipsam ea et suscipit.', 47, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 40),
(21, 'temporibus', 'Voluptas et nisi non enim.', 56, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 41),
(22, 'quibusdam', 'Labore ab vel quae ipsum ut earum architecto.', 58, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 42),
(23, 'corporis', 'Vero eos qui dignissimos corrupti.', 37, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 43),
(24, 'consequuntur', 'Velit occaecati ea et quisquam sint saepe.', 53, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 44),
(25, 'ex', 'Doloribus quia eum sit aut non dolorum.', 45, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 45),
(26, 'nihil', 'Ut sit aut qui nihil et ut.', 8, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 46),
(27, 'veniam', 'Sunt voluptas cupiditate harum est et.', 20, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'strength', 47),
(28, 'non', 'Quia veritatis quaerat facere repellat aspernatur velit.', 41, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 48),
(29, 'hic', 'Est est qui ducimus quia vitae reprehenderit qui.', 60, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'flexibility', 49),
(30, 'sit', 'Nostrum omnis mollitia eveniet harum nam nemo.', 31, '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'cardio', 50);

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `target_date` date DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `goals`
--

INSERT INTO `goals` (`id`, `title`, `description`, `user_id`, `target_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Ut sunt quibusdam facere blanditiis distinctio.', 'Pariatur quas eius fugiat aut sunt nisi reiciendis et. Odit reprehenderit necessitatibus voluptatem unde dolor qui molestiae. Earum ipsam dolor ullam nam vitae aliquid quas facilis.', 11, '2026-05-18', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(2, 'Tempore eaque debitis cum.', 'Sed porro corporis tempore perferendis ullam. Occaecati eum impedit expedita voluptas incidunt consequatur vero. Facere et sed aut commodi qui dolorum. Quod quibusdam ad praesentium.', 12, '2025-09-03', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(3, 'Recusandae nemo eaque voluptates error qui itaque id.', 'Accusamus perspiciatis nesciunt unde quia quibusdam optio. Dignissimos quia aut autem adipisci. Corrupti et quae labore.', 13, '2026-05-28', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(4, 'Expedita incidunt voluptatum voluptas veritatis iusto atque aliquam.', 'Et odit voluptatem sed qui consequuntur qui cumque. Minus corporis possimus error. Asperiores cupiditate ea delectus autem et quia. Rem ea alias assumenda at. Dolore sed maxime voluptate est voluptas et.', 14, '2025-12-21', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(5, 'Harum debitis asperiores necessitatibus a earum dolorem.', 'Non amet molestias labore minus delectus eius. Et quia blanditiis quis fugiat quam sapiente culpa. Molestiae consequatur placeat et quis excepturi fugit magnam.', 15, '2025-10-01', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(6, 'Doloribus quia fugiat odio libero distinctio.', 'Id deleniti quibusdam atque quam. Et sit ducimus nemo tenetur. Delectus sed sequi dolores et eos. Amet quisquam praesentium delectus.', 16, '2026-06-06', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(7, 'Eum sequi quas voluptatem sit amet atque veritatis.', 'Magnam veritatis est perferendis aliquid. Dolore voluptatem consectetur enim voluptas numquam. Officia hic error impedit et illum voluptatibus voluptatibus. Quas omnis enim quo veniam reiciendis illum quaerat.', 17, '2026-04-26', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(8, 'Eos sunt omnis rerum iure quia nemo qui aperiam.', 'Cupiditate corporis natus vero laboriosam fuga nulla velit. Quis id excepturi quo iste magni in. Amet temporibus sequi beatae ad corrupti asperiores rerum quisquam.', 18, '2026-02-10', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(9, 'Quia nulla qui qui tempora similique autem.', 'Et sint qui sapiente et repudiandae soluta error. Quasi vero pariatur in et. Laboriosam voluptates quia provident voluptatem dolor rerum. Debitis eum voluptatem rerum suscipit nesciunt dolor praesentium et.', 19, '2025-10-30', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(10, 'Dolorem perferendis et iure id placeat incidunt aut.', 'Quaerat est voluptate explicabo pariatur in eaque dolores nam. Illo porro voluptate eaque dolor. Ad tempora dolores qui tempore. Amet suscipit et impedit.', 20, '2026-04-13', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(11, 'Id ex odio quod dolorem perferendis.', 'Dolorem sit repellendus cum id id. Excepturi nemo ut quia repellat. Perspiciatis qui at hic sequi veniam ut. Fugiat quisquam est laudantium est. Autem nisi qui repellendus ut et.', 21, '2025-07-25', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(12, 'Delectus a necessitatibus et aut repudiandae sed.', 'Optio aliquid sit neque harum. Sunt labore non sed molestiae et quia corrupti. Sed dolor ab aliquid et. Rem sed nihil nostrum earum. Qui reiciendis molestiae ut ducimus dolor enim consequatur ratione.', 22, '2025-12-04', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(13, 'Totam et officiis distinctio assumenda sed dolor suscipit.', 'Quisquam nostrum ut voluptatem quaerat iste vel molestiae reprehenderit. Ratione in quibusdam quas eos et nemo asperiores mollitia. At possimus nulla ea iusto eum dolorem.', 23, '2025-10-21', 'pending', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(14, 'Quidem sunt consequatur et.', 'Magnam sed quis accusamus quas quod asperiores ut molestias. Ratione dolores voluptates ex quo. Nesciunt sint aut suscipit et.', 24, '2025-08-02', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(15, 'Aliquid voluptas et aut non dolorem ratione.', 'Dolores laborum officiis autem quas consequatur. Aut ut doloribus non et. Consectetur ea ullam aliquam corrupti rem. Repellat ut adipisci quos velit.', 25, '2025-06-30', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(16, 'Eaque quis ea optio quo nemo quo.', 'Autem sunt illo eos laborum necessitatibus dignissimos reiciendis. Praesentium illum aut ipsa deserunt iusto dignissimos.', 26, '2026-05-17', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(17, 'Omnis rem reprehenderit non aut.', 'Corrupti placeat quae voluptas libero recusandae eligendi. A perspiciatis est ea omnis ut vel illo. Voluptatibus deserunt libero velit ut quis autem.', 27, '2026-01-14', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(18, 'Et excepturi nulla neque eaque fugit quasi voluptatum.', 'Consequatur saepe et cumque. Impedit corporis quis sapiente ullam voluptatem quia. Sed est non rerum numquam et.', 28, '2025-08-10', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(19, 'Accusantium repellat repudiandae molestiae qui quidem consectetur nemo.', 'Rerum hic deserunt qui aut. Qui sed perferendis sunt qui impedit. Cumque molestias eveniet dicta ea cum nihil soluta dolorum. Accusantium eveniet aut facere id consectetur quo accusantium dolor.', 29, '2026-02-04', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20'),
(20, 'Soluta ab et ut et.', 'Et maxime a maiores consequatur voluptatem eos. In placeat aut eum laboriosam. Est id tempora aut reprehenderit delectus architecto eligendi consectetur. Distinctio repellendus error est sit.', 30, '2026-05-20', 'completed', '2025-06-25 19:53:20', '2025-06-25 19:53:20');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_12_07_154351_create_users_table', 1),
(2, '2024_12_07_154539_create_workouts_table', 1),
(3, '2024_12_14_155607_create_goals_table', 1),
(4, '2024_12_14_155928_add_profile_picture_to_users_table', 1),
(5, '2024_12_14_160009_modify_name_column_in_users_table', 1),
(6, '2024_12_14_161450_add_user_id_to_workouts_table', 1),
(7, '2024_12_27_165158_modify_users_table', 1),
(8, '2025_01_15_144032_add_status_to_workouts_table', 1),
(9, '2025_01_15_145750_modify_description_nullable_in_workouts_table', 1),
(10, '2025_01_15_174850_create_exercises_table', 1),
(11, '2025_01_15_174957_add_type_to_exercises_table', 1),
(12, '2025_01_15_180746_add_workout_id_to_exercises_table', 1),
(13, '2025_01_23_150333_modify_exercises_table', 1),
(14, '2025_02_04_141430_add_role_to_users_table', 1),
(15, '2025_02_11_153035_create_personal_access_tokens_table', 1),
(16, '2025_02_11_153631_create_cache_table', 1),
(17, '2025_02_11_153713_create_sessions_table', 1),
(18, '2025_02_11_155608_add_email_verified_at_to_users_table', 1),
(19, '2025_02_11_160048_add_remember_token_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'member',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `role`, `email_verified_at`, `remember_token`) VALUES
(1, 'Mr. Filiberto Lind', 'kenyatta.boyer@example.org', '$2y$12$IlW3SejzJngGypNqG0LRluUNr3VhcKGv/HQX.HrqffcJ8CiVg5iR6', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:10', 'IgBRPFzxnb'),
(2, 'Dr. Noemi Kreiger Sr.', 'rosenbaum.emelie@example.net', '$2y$12$3iQaRLPPVt92sYQ6oi1pbueNgIilEva7Pl3OFM.Gvr5JI8hDrlLdC', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:10', 'kgwI3rjnDT'),
(3, 'Joanne Blick', 'melvina.stiedemann@example.org', '$2y$12$LSZSFi8HVZhxaJKYboWyTOLffCK1zojcAar4SRLRgzfCTXbgC6V.S', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:10', 'pyDXYJatVi'),
(4, 'Elise Kub', 'mozell.lehner@example.com', '$2y$12$9zQj9Qm7LfNerPH0hPPaAerdAsvurEAjKHjbclarkk4ScJFJMzkPm', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:11', 'vzuR5FvVEI'),
(5, 'Lon Pfeffer', 'haley.davon@example.com', '$2y$12$Ooz7uj/u3r7v6ARsLJB8l.Ov5T/57qaK/PecgIuqR/v2Z0oVbz9aG', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:11', 's9JaXCn3wo'),
(6, 'Miss Abigail Sanford', 'rose90@example.net', '$2y$12$lOxaFvTC/e2y5CgPtjsos.lpHkXQbsX3vZIrDpx1CACTla9zwllqy', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:11', 'GftYCi7Lxd'),
(7, 'Dr. Darrell Shanahan', 'meaghan.vandervort@example.com', '$2y$12$caQCHqJKfEovJYGvFReFg.CVUPG/ldEwwtEkdH3365tM2q5EmMX..', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:12', 'IOhphrdQLb'),
(8, 'Dr. Rhett Konopelski', 'hermina.roberts@example.net', '$2y$12$VwivLtUf1SYIjwts.DwqW.02FhMm/vD.cN4emgwuc71l7EVVlGLUi', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:12', '5j2znYJ9Bq'),
(9, 'Elisha Swift', 'keven78@example.org', '$2y$12$05SlFlw5l17OYsVjsY3yQ.Y1U/cUIkGVv2o0ZmWto/s72cyAtKiyy', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:12', 'fsSodX7y3k'),
(10, 'Orion Deckow MD', 'aileen25@example.com', '$2y$12$IQMlE1WAbsCqZMGvndnu0.dtUqb82yneBZCFfL0qBH05v1ELNFmKy', '2025-06-25 19:53:13', '2025-06-25 19:53:13', 'member', '2025-06-25 19:53:13', '1CvgtMhXaO'),
(11, 'Dustin Schimmel', 'annabell65@example.net', '$2y$12$cZrPVIJf4b519ER09hv8aueYAUdzVDn/fNqtz5E0rfbBsVuUbsqQO', '2025-06-25 19:53:14', '2025-06-25 19:53:14', 'member', '2025-06-25 19:53:13', 'Hz76KpMfap'),
(12, 'Presley Berge IV', 'macie.fadel@example.org', '$2y$12$t63E0p9kZiDlr7x1mvyzj.DRnTBzNrnZQsqC6qVLgRIIonwPvIlpu', '2025-06-25 19:53:14', '2025-06-25 19:53:14', 'member', '2025-06-25 19:53:14', 'eV7JMBBz0E'),
(13, 'Yesenia Parker', 'eliane.mills@example.net', '$2y$12$cOhqndiiqTON8nZCChdCxeUpkax1ZMCKu3pi3r9.7LBzd8xycYsVW', '2025-06-25 19:53:14', '2025-06-25 19:53:14', 'member', '2025-06-25 19:53:14', 'qXU8EGKk6p'),
(14, 'Amos Larson', 'destiney02@example.net', '$2y$12$hJjUeHNkYjSohnhoPE.dve1qDjLPClGyy1SCTYh2Tjib1haf673AG', '2025-06-25 19:53:15', '2025-06-25 19:53:15', 'member', '2025-06-25 19:53:14', 'Kyw7HybuY6'),
(15, 'Myriam Kling', 'barton.mathew@example.org', '$2y$12$8lN39wUSuoqp2gCSYx7eDu2ANlqxGbwdKgepBEGUga5BS5f3Rqo0C', '2025-06-25 19:53:15', '2025-06-25 19:53:15', 'member', '2025-06-25 19:53:15', 'LlNxqNrX2y'),
(16, 'Seamus Stracke', 'lindgren.davonte@example.com', '$2y$12$pyjCCawnhZBVP.PN/vomvu2XY29LHFKVEjXFNWEq5BTjFgoTtPsd2', '2025-06-25 19:53:15', '2025-06-25 19:53:15', 'member', '2025-06-25 19:53:15', '9vHHjehPtF'),
(17, 'Ms. Gerda Ullrich', 'ymaggio@example.com', '$2y$12$qPZA0.toGhLi/TJYpl0AIe.P6/m0saTfnNALsakIFtVn4AYMoDrKe', '2025-06-25 19:53:16', '2025-06-25 19:53:16', 'member', '2025-06-25 19:53:15', 'Lp2r7yuh6k'),
(18, 'Elisabeth Waelchi III', 'nicholaus22@example.org', '$2y$12$MozHwK0W0KiOZcTS5/5iHeAhKE3YcMN1hKifWCB5y6r5QWbfMdbfS', '2025-06-25 19:53:16', '2025-06-25 19:53:16', 'member', '2025-06-25 19:53:16', 'buD1XzIY4x'),
(19, 'Brycen Osinski', 'gibson.vito@example.org', '$2y$12$kY8Fe4depyM/xvfLyPOvQOtxXdZuoEhLmrmk2n6tCcijq7EX1UvlG', '2025-06-25 19:53:16', '2025-06-25 19:53:16', 'member', '2025-06-25 19:53:16', 'B0U2KAhCjY'),
(20, 'Prof. Bertha Mante V', 'hudson.keira@example.com', '$2y$12$kGsDyKG3Cw0dd8jUkD5Sw.bXBH353qWx.hUyvhH48TtQzQmMXHBYG', '2025-06-25 19:53:17', '2025-06-25 19:53:17', 'member', '2025-06-25 19:53:16', 'DrYVjYGkhJ'),
(21, 'Olen Schaefer', 'bkassulke@example.com', '$2y$12$cg0ZcZ..hdog9HQDUzxUz.XFCo44jvpYWfpa106LOMxV/rnyTk6Ju', '2025-06-25 19:53:17', '2025-06-25 19:53:17', 'member', '2025-06-25 19:53:17', 'XoFtQOUNq9'),
(22, 'Modesto Balistreri', 'june.treutel@example.net', '$2y$12$rqJVSvHjYEA5dxEN0y7kguXRsclBBt/MCB9M2zo0v1iKwIkt7FwZG', '2025-06-25 19:53:18', '2025-06-25 19:53:18', 'member', '2025-06-25 19:53:17', 'fwFROZxmsb'),
(23, 'Albertha Breitenberg', 'jimmie.runolfsdottir@example.com', '$2y$12$Q.VXAmNIKAiR.LICxBK/VeC2JK150ll7LmJK5NWaSHuc6EtRcx4K6', '2025-06-25 19:53:18', '2025-06-25 19:53:18', 'member', '2025-06-25 19:53:18', 'kIpm8mWoX6'),
(24, 'Norene Borer', 'gibson.maximillian@example.net', '$2y$12$vXisxaCQyODrd0y/QPbPVe6/ZB2M9rSSeNytjKwn/IQrShJ.XntNe', '2025-06-25 19:53:18', '2025-06-25 19:53:18', 'member', '2025-06-25 19:53:18', 'VZwFoePrxj'),
(25, 'Ari Fay III', 'rondricka@example.org', '$2y$12$kK4y3cO7bIAl5L3agjyBw.91PDo2WNZUhOLzySIMt1WCxPEoGrVCq', '2025-06-25 19:53:19', '2025-06-25 19:53:19', 'member', '2025-06-25 19:53:18', 'FYT9kij0e6'),
(26, 'Prof. Kallie Gibson PhD', 'oreilly.lera@example.com', '$2y$12$zOxi3DNsfYkB4o4mFD.umuci8MyGQ6nggEgpIeSxUTV2V.kWMPx6S', '2025-06-25 19:53:19', '2025-06-25 19:53:19', 'member', '2025-06-25 19:53:19', '5FBE1hcAlX'),
(27, 'Domenica McKenzie', 'cormier.dale@example.net', '$2y$12$E9KqCPCIy6qiyeE6tfpwfO8iJ69mj/Z83uUkTpFjwYQEMDyuROaDm', '2025-06-25 19:53:19', '2025-06-25 19:53:19', 'member', '2025-06-25 19:53:19', 'FqeMHEd0ee'),
(28, 'Katelin Kemmer', 'lesly.raynor@example.org', '$2y$12$j4PI58KCF.s2kKZ.i05/cOqzD0g0Akdt7NwaAf/9eDfu4nfnGXSJq', '2025-06-25 19:53:19', '2025-06-25 19:53:19', 'member', '2025-06-25 19:53:19', 'YlOpIbBhgu'),
(29, 'Beverly Schmidt', 'marco00@example.org', '$2y$12$ooWwg1dzXXoJJCeHJkxeHegsJ5wEXIYlyHj0RsyBHdIogk2bsZ1PK', '2025-06-25 19:53:20', '2025-06-25 19:53:20', 'member', '2025-06-25 19:53:19', 'EWyJVYkIVt'),
(30, 'Prof. Fae Goodwin Jr.', 'qkris@example.net', '$2y$12$oIURh21N7UDJc9hVvfscget6MboAVgVznX9zwzkdgUcgQWIXnFlH2', '2025-06-25 19:53:20', '2025-06-25 19:53:20', 'member', '2025-06-25 19:53:20', 'rZCN9dDqkl'),
(31, 'Milan Martic', 'miki@gmail.com', '$2y$12$kSRg1i1DozOlmoxrFpxw9urDFleyCL0H055KIn22/t80uhYdEFVqi', '2025-06-25 19:54:50', '2025-06-25 19:54:50', 'member', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `calories_burned` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `user_id`, `name`, `description`, `duration`, `calories_burned`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'dolorem', 'Voluptate est adipisci harum quidem.', 89, 497, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(2, 1, 'id', 'Ea distinctio a sit molestiae distinctio.', 48, 95, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(3, 1, 'deleniti', 'Iusto explicabo voluptatem aliquid et quas voluptas voluptatem.', 38, 261, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(4, 1, 'architecto', 'Amet et nihil odit qui possimus.', 11, 220, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(5, 1, 'et', 'Aliquid necessitatibus quia est sit quidem laboriosam.', 106, 300, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(6, 1, 'et', 'Fugit error ratione excepturi ut eum enim accusamus quia.', 47, 376, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(7, 1, 'eaque', 'Ex eum unde nulla sapiente reiciendis debitis.', 48, 415, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(8, 1, 'inventore', 'Doloribus sit atque aut unde cumque.', 92, 352, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(9, 1, 'enim', 'Est dolorem magni sequi dolorem in qui.', 51, 334, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(10, 1, 'molestias', 'Consequatur assumenda voluptatem autem saepe.', 29, 56, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(11, 1, 'architecto', 'Earum sit aperiam et tempore qui ipsam.', 107, 189, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(12, 1, 'magni', 'Saepe dolorem ratione quidem est quisquam minus.', 105, 116, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(13, 1, 'quas', 'Sit qui ad quia corrupti corrupti omnis.', 10, 380, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(14, 1, 'harum', 'Tempore ipsa iste magnam voluptatem.', 18, 477, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(15, 1, 'qui', 'Quia aut aliquam est.', 120, 425, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(16, 1, 'rerum', 'Nulla nulla sunt illum et qui incidunt ea.', 104, 428, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(17, 1, 'soluta', 'Et sit est dolor esse quas dolorum.', 38, 251, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(18, 1, 'modi', 'Eveniet fuga quam eaque natus placeat aut.', 102, 318, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(19, 1, 'perspiciatis', 'Mollitia doloribus dolore beatae ratione officia eveniet recusandae.', 11, 449, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(20, 1, 'distinctio', 'Fugit quidem ducimus dolorem quidem et doloribus sapiente.', 101, 406, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(21, 1, 'ipsum', 'Unde corrupti sequi suscipit iure necessitatibus.', 82, 396, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(22, 1, 'fugiat', 'Atque accusantium magni est aut voluptatibus eveniet et.', 17, 218, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(23, 1, 'soluta', 'Voluptatem dignissimos facilis magnam delectus blanditiis.', 31, 480, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(24, 1, 'ab', 'Qui dolore quos fuga odio aut.', 48, 476, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(25, 1, 'voluptatem', 'Earum iusto est eos alias et laborum possimus.', 77, 157, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(26, 1, 'delectus', 'Magni sed sed rerum necessitatibus ut dicta.', 116, 153, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(27, 1, 'est', 'Cum in quod facere ut ut.', 11, 296, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(28, 1, 'rem', 'Ex non ratione illo sed.', 86, 247, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(29, 1, 'ut', 'Expedita natus quis culpa distinctio quod.', 23, 280, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(30, 1, 'officia', 'Quibusdam qui voluptatibus voluptas architecto sint consectetur aut.', 74, 360, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(31, 1, 'et', 'Ex corrupti quo et est ex fugiat dolor.', 42, 401, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(32, 1, 'qui', 'Libero neque non vel quasi.', 37, 429, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(33, 1, 'nihil', 'Asperiores et facilis porro iure quos ut.', 55, 348, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(34, 1, 'est', 'Voluptate fugiat quibusdam similique illo et dignissimos.', 72, 467, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(35, 1, 'esse', 'Nihil quo non et.', 89, 121, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(36, 1, 'saepe', 'Ea sint alias nihil asperiores.', 61, 82, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(37, 1, 'suscipit', 'Eius eos voluptatem itaque.', 102, 157, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(38, 1, 'eum', 'Velit autem perferendis perspiciatis recusandae illum.', 102, 154, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(39, 1, 'quaerat', 'Qui rerum distinctio fugiat et laboriosam vitae.', 57, 389, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(40, 1, 'quas', 'Commodi autem nostrum fugit totam.', 47, 107, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(41, 1, 'et', 'Ut voluptate nisi et praesentium.', 48, 423, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(42, 1, 'in', 'Ut officiis cumque vel qui et quo.', 24, 161, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(43, 1, 'quod', 'Dolor ipsa et ullam.', 75, 353, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(44, 1, 'eligendi', 'Nam aliquam quibusdam exercitationem ea nostrum ipsam rerum.', 71, 414, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(45, 1, 'eos', 'Rerum a sunt quia.', 34, 449, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(46, 1, 'ut', 'Corrupti aut dolores minima consequatur est tenetur et.', 40, 355, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(47, 1, 'sed', 'Corporis ipsum reiciendis natus quia aliquam aspernatur vel voluptatem.', 86, 394, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(48, 1, 'totam', 'Tempore et dolorem error eum perspiciatis at dolorem.', 100, 158, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(49, 1, 'sit', 'Eos similique quasi quibusdam impedit dolores iste.', 31, 270, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13'),
(50, 1, 'non', 'Velit enim consequuntur totam ut reiciendis.', 11, 453, 'pending', '2025-06-25 19:53:13', '2025-06-25 19:53:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercises_workout_id_foreign` (`workout_id`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `goals_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workouts_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_workout_id_foreign` FOREIGN KEY (`workout_id`) REFERENCES `workouts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `workouts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
