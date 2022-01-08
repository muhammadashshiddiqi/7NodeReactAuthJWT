/*
 Navicat Premium Data Transfer

 Source Server         : LOCAL_MYSQL
 Source Server Type    : MySQL
 Source Server Version : 100421
 Source Host           : 127.0.0.1:3306
 Source Schema         : mern_db

 Target Server Type    : MySQL
 Target Server Version : 100421
 File Encoding         : 65001

 Date: 08/01/2022 22:36:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` double(10, 2) NULL DEFAULT NULL,
  `createdAt` date NULL DEFAULT NULL,
  `updatedAt` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (4, 'Bismillah Samira Ilmi', 9090.00, '2021-12-26', '2021-12-26');
INSERT INTO `products` VALUES (5, 'Alhamdulillah Berhasil Yee', 90909021.00, '2021-12-26', '2021-12-26');
INSERT INTO `products` VALUES (6, 'Hahahah', 90000.00, '2021-12-26', '2021-12-26');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `refresh_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Muhammad Ashshiddiqi', 'admin@gmail.com', '$2b$10$34PUpUHEYppto8NvI6zMWemq7WQnzxQQ4nTDsZ0vmPST0dlK1bXcm', NULL, '2021-12-26 23:06:52', '2021-12-27 14:48:28');
INSERT INTO `users` VALUES (2, 'Shidiq', 'sidiq@gmail.com', '$2b$10$DHjI5CVgrTSctqhK2SXjIulZISaTAjgxzC3gGFZvF5Xd.B2bU/yXW', NULL, '2021-12-27 13:35:08', '2021-12-27 13:35:08');
INSERT INTO `users` VALUES (3, 'admin', 'sidiq@admin.com', '$2b$10$1I1YMpYENe.Uxnd1OXkbcOXcJFxk3kFA9uYzEGLOJe45IwsHrsGIG', NULL, '2021-12-27 13:35:38', '2021-12-27 13:35:38');
INSERT INTO `users` VALUES (4, 'Siska', 'siska@siska.com', '$2b$10$Iy6Bm3ART/vfvb4mjXgTUujGMkdQG0oMQy8pw2bc1weaWnUOCA9gq', NULL, '2022-01-08 08:11:04', '2022-01-08 15:09:39');

SET FOREIGN_KEY_CHECKS = 1;
