-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 01/08/2023 às 16:55
-- Versão do servidor: 10.6.12-MariaDB-cll-lve
-- Versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u772892483_reembolso`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `removed` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`, `active`, `removed`, `created_at`, `updated_at`) VALUES
(1, 'Alimentação', 1, 0, '2023-07-28 18:16:24', '2023-08-01 13:26:11'),
(2, 'Transporte', 1, 0, '2023-07-28 18:27:25', '2023-07-28 18:55:56'),
(3, 'Outro', 1, 0, '2023-07-28 18:56:52', '2023-07-28 18:56:52');

-- --------------------------------------------------------

--
-- Estrutura para tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2023_07_27_205448_create_users_table', 1),
(3, '2023_07_28_170750_create_categories_table', 1),
(4, '2023_07_28_171030_create_solicitations_table', 1),
(5, '2023_07_28_210747_create_solicitations_table', 2),
(6, '2023_07_28_210958_create_solicitations_details_table', 2),
(7, '2023_07_28_211314_create_solicitations_details_table', 3),
(8, '2023_07_29_040232_add_column_to_solicitations', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `personal_access_tokens`
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

--
-- Despejando dados para a tabela `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(27, 'App\\Models\\User', 1, 'login_token', '80d4084588b0ce4c41eeee41f0df4631c2fac4c0a0da0fff43d756f207508c31', '[\"*\"]', NULL, NULL, '2023-08-01 13:44:21', '2023-08-01 13:44:21');

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitations`
--

CREATE TABLE `solicitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `value` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `solicitations`
--

INSERT INTO `solicitations` (`id`, `user_id`, `value`, `created_at`, `updated_at`, `status`) VALUES
(8, 1, 175.00, '2023-07-29 19:22:28', '2023-08-01 13:42:38', 1),
(9, 2, 425.00, '2023-07-29 19:22:58', '2023-07-31 14:34:01', 3),
(10, 3, 500.00, '2023-07-29 19:23:17', '2023-07-31 14:31:46', 3),
(11, 3, 775.50, '2023-07-29 19:58:52', '2023-07-29 19:58:52', 1),
(12, 3, 800.00, '2023-07-30 15:38:35', '2023-07-31 14:33:44', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitations_details`
--

CREATE TABLE `solicitations_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `solicitation_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `value` double(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `solicitations_details`
--

INSERT INTO `solicitations_details` (`id`, `solicitation_id`, `category_id`, `value`) VALUES
(7, 8, 1, 150.00),
(8, 8, 3, 25.00),
(10, 9, 3, 100.00),
(11, 9, 1, 325.00),
(12, 10, 2, 500.00),
(13, 11, 1, 350.00),
(14, 11, 2, 400.00),
(15, 11, 3, 25.50),
(16, 12, 2, 800.00),
(17, 8, 1, 150.00),
(18, 8, 3, 25.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `category` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `birthDate`, `category`, `created_at`, `updated_at`) VALUES
(1, 'Diego', 'dwerlich21@gmail.com', '$argon2i$v=19$m=65536,t=4,p=1$MENxZS9kcTZTUHE1Wm9OZA$9e0N18M2et9zL2DfJDIACoaSu/Zf2lzC+rAffitP3B8', '1990-05-21', 1, NULL, '2023-08-01 13:24:02'),
(2, 'Julia', 'julia@gmail.com', '$argon2i$v=19$m=65536,t=4,p=1$R0xQMWQxOHQyTk5acU9nTQ$EykzsyiArCnNaN7TNAFiux+2NrNl/QXzutL2etDJ5Uo', '1997-08-22', 1, '2023-07-28 18:04:31', '2023-08-01 13:25:51'),
(3, 'Sophia', 'soso@gmail.com', '$argon2i$v=19$m=65536,t=4,p=1$UHpocUVZc0NXUFFUYmw0Zw$onfUD+wPjamVNqwnnFpZAbKOs4xxq7NRBUPG1ZnV+yI', '2018-12-31', 2, '2023-07-28 18:04:54', '2023-07-28 21:02:01');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices de tabela `solicitations`
--
ALTER TABLE `solicitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitations_user_id_foreign` (`user_id`);

--
-- Índices de tabela `solicitations_details`
--
ALTER TABLE `solicitations_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitations_details_solicitation_id_foreign` (`solicitation_id`),
  ADD KEY `solicitations_details_category_id_foreign` (`category_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `solicitations`
--
ALTER TABLE `solicitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `solicitations_details`
--
ALTER TABLE `solicitations_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `solicitations`
--
ALTER TABLE `solicitations`
  ADD CONSTRAINT `solicitations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `solicitations_details`
--
ALTER TABLE `solicitations_details`
  ADD CONSTRAINT `solicitations_details_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `solicitations_details_solicitation_id_foreign` FOREIGN KEY (`solicitation_id`) REFERENCES `solicitations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
