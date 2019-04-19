-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  jeu. 18 avr. 2019 à 09:22
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `content-stream`;
USE `content-stream`;

--
-- Base de données :  `content-stream`
--

-- --------------------------------------------------------

--
-- Structure de la table `spyinglists`
--

CREATE TABLE `spyinglists` (
  `idOwner` text NOT NULL,
  `name` text NOT NULL,
  `id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hashrss` text NOT NULL,
  `id_fetchrss` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `spyinglists`
--

INSERT INTO `spyinglists` (`idOwner`, `name`, `id`, `createdAt`, `updatedAt`, `hashrss`, `id_fetchrss`) VALUES
('null', 'design__addict', 41, '2019-02-27 15:34:27', '2019-02-27 15:34:27', 'http://fetchrss.com/rss/5c5d73498a93f8847e8b45675c76ab5b8a93f85c608b4567.xml', '5c76ab5b8a93f85c608b4567'),
('17841407080160735', 'design__addict', 42, '2019-02-27 15:35:04', '2019-02-27 15:35:04', 'http://fetchrss.com/rss/5c5d73498a93f8847e8b45675c76ab5b8a93f85c608b4567.xml', '5c76ab5b8a93f85c608b4567');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `spyinglists`
--
ALTER TABLE `spyinglists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `spyinglists`
--
ALTER TABLE `spyinglists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;