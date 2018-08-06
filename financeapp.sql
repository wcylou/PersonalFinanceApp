-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema personal_finance_app
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `personal_finance_app` ;

-- -----------------------------------------------------
-- Schema personal_finance_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `personal_finance_app` DEFAULT CHARACTER SET utf8 ;
USE `personal_finance_app` ;

-- -----------------------------------------------------
-- Table `personal_finance_app`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`user` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `role` VARCHAR(45) NOT NULL DEFAULT 'standard',
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`expense_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`expense_category` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`expense_category` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`budget`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`budget` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`budget` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_id` INT(11) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_budget_user_idx` (`user_id` ASC),
  INDEX `fk_expense_category_budget_idx` (`category_id` ASC),
  CONSTRAINT `fk_budget_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personal_finance_app`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expense_category_budget`
    FOREIGN KEY (`category_id`)
    REFERENCES `personal_finance_app`.`expense_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`expense`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`expense` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`expense` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_expense_user_idx` (`user_id` ASC),
  INDEX `fk_expense_category_expense_idx` (`category_id` ASC),
  CONSTRAINT `fk_expense_category_expense`
    FOREIGN KEY (`category_id`)
    REFERENCES `personal_finance_app`.`expense_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_expense_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personal_finance_app`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`future_expense`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`future_expense` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`future_expense` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `amount` VARCHAR(45) NOT NULL,
  `date_expected` DATE NOT NULL,
  `recurring` TINYINT(1) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `number_of_recurrences` INT(11) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_future_expense_user_idx` (`user_id` ASC),
  INDEX `fk_future_expense_expense_category_idx` (`category_id` ASC),
  CONSTRAINT `fk_future_expense_expense_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `personal_finance_app`.`expense_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_future_expense_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personal_finance_app`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`income_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`income_category` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`income_category` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`income`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`income` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`income` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `date_received` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_income_user_idx` (`user_id` ASC),
  INDEX `fk_income_categories_income_idx` (`category_id` ASC),
  CONSTRAINT `fk_income_categories_income`
    FOREIGN KEY (`category_id`)
    REFERENCES `personal_finance_app`.`income_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_income_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personal_finance_app`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `personal_finance_app`.`income_stream`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `personal_finance_app`.`income_stream` ;

CREATE TABLE IF NOT EXISTS `personal_finance_app`.`income_stream` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `category_id` INT(11) NOT NULL,
  `expected_amount` DECIMAL(10,2) NOT NULL,
  `start_date` DATE NOT NULL,
  `number_of_occurrences` INT(11) NULL,
  `recurring` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_income_stream_user_idx` (`user_id` ASC),
  INDEX `fk_income_stream_income_categories_idx` (`category_id` ASC),
  CONSTRAINT `fk_income_stream_income_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `personal_finance_app`.`income_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_income_stream_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `personal_finance_app`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO financeuser@localhost;
 DROP USER financeuser@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'financeuser'@'localhost' IDENTIFIED BY 'user';

GRANT SELECT ON TABLE `personal_finance_app`.* TO 'financeuser'@'localhost';
GRANT SELECT, INSERT, TRIGGER ON TABLE `personal_finance_app`.* TO 'financeuser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `personal_finance_app`.* TO 'financeuser'@'localhost';

-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`user` (`id`, `username`, `password`, `email`, `role`, `active`) VALUES (1, 'user', 'user', 'user@gmail.com', DEFAULT, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`expense_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (1, 'Groceries');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (2, 'Finances');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (3, 'Bills');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (4, 'Eating Out');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (5, 'Shopping');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (6, 'Transport');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (7, 'Entertainment');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (8, 'General');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (9, 'Holidays');
INSERT INTO `personal_finance_app`.`expense_category` (`id`, `name`) VALUES (0, 'Personal Care');

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`budget`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (1, 3, 200, 1, '2018-6-1', '2018-7-1', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (2, 2, 200, 1, '2018-6-1', '2018-7-1', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (3, 1, 500, 1, '2018-6-1', '2018-7-1', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (4, 5, 50, 1, '2018-6-1', '2018-7-1', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (5, 6, 200, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (6, 9, 400, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (7, 4, 250, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (8, 7, 400, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (9, 8, 800, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (10, 0, 50, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (11, 1, 360, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (12, 2, 200, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (13, 3, 105, 1, '2018-7-14', '2018-8-14', NULL);
INSERT INTO `personal_finance_app`.`budget` (`id`, `category_id`, `amount`, `user_id`, `start_date`, `end_date`, `description`) VALUES (14, 5, 200, 1, '2018-7-14', '2018-8-14', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (1, 11.52, 8, '2018-06-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (2, 15.22, 2, '2017-10-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (3, 24.74, 0, '2018-05-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (4, 21.88, 0, '2017-10-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (5, 2.75, 1, '2018-04-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (6, 16.63, 0, '2017-12-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (7, 17.04, 4, '2017-09-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (8, 19.54, 8, '2018-01-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (9, 22.51, 9, '2018-03-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (10, 21.01, 6, '2017-09-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (11, 4.03, 4, '2018-03-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (12, 9.69, 3, '2017-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (13, 5.21, 3, '2018-05-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (14, 17.98, 9, '2017-08-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (15, 120.12, 7, '2017-11-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (16, 4.32, 1, '2017-10-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (17, 16.44, 4, '2018-02-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (18, 7.05, 9, '2017-10-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (19, 1.2, 2, '2017-07-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (20, 5.91, 1, '2017-10-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (21, 110.05, 5, '2018-06-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (22, 12.32, 3, '2017-11-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (23, 6.96, 0, '2017-11-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (24, 2.01, 6, '2018-02-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (25, 13.04, 8, '2017-11-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (26, 16.41, 8, '2018-03-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (27, 14.77, 5, '2017-09-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (28, 17.38, 3, '2018-05-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (29, 21.48, 5, '2017-11-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (31, 19.44, 1, '2017-12-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (32, 22.05, 6, '2018-03-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (33, 8.91, 4, '2018-05-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (34, 9.95, 9, '2017-09-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (35, 15.13, 0, '2018-02-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (36, 4.98, 4, '2017-10-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (37, 14.97, 1, '2018-04-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (38, 21.6, 3, '2017-11-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (39, 4.08, 6, '2018-07-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (40, 19.34, 5, '2018-04-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (41, 20.59, 3, '2018-07-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (42, 94.99, 7, '2018-06-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (43, 7.56, 8, '2018-05-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (44, 13.44, 9, '2018-03-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (46, 99.99, 5, '2017-10-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (47, 6.35, 8, '2018-04-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (48, 11.29, 2, '2017-12-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (49, 24.84, 5, '2018-03-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (50, 17.37, 9, '2018-01-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (51, 17.17, 4, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (52, 20.48, 9, '2018-06-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (53, 4.61, 0, '2018-05-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (54, 12.84, 6, '2018-06-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (55, 5.97, 0, '2017-11-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (56, 13.38, 8, '2017-12-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (57, 2.06, 5, '2017-08-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (58, 18.04, 3, '2018-05-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (59, 11.02, 4, '2017-09-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (60, 23.96, 7, '2017-11-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (62, 12.25, 5, '2018-02-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (64, 23.18, 8, '2018-06-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (65, 8.8, 5, '2017-11-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (66, 20.38, 0, '2018-04-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (67, 15.2, 1, '2017-11-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (68, 45, 7, '2017-11-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (69, 9.61, 0, '2018-01-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (70, 4.26, 2, '2018-06-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (71, 14.64, 9, '2017-08-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (72, 19.51, 1, '2017-12-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (73, 19.34, 8, '2017-11-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (74, 2.51, 1, '2017-09-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (75, 49.99, 5, '2017-10-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (76, 19.99, 4, '2018-06-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (77, 24.62, 7, '2017-07-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (78, 18.07, 9, '2018-03-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (79, 2.47, 0, '2018-04-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (80, 18.36, 1, '2018-05-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (81, 1.83, 7, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (82, 21.19, 8, '2017-12-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (83, 4.09, 9, '2018-03-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (84, 18.03, 4, '2017-11-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (85, 11.17, 6, '2018-05-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (86, 14.81, 7, '2018-01-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (87, 16.18, 8, '2017-10-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (88, 2.97, 9, '2017-11-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (89, 24.55, 6, '2018-05-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (90, 5.74, 7, '2018-05-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (91, 11.32, 1, '2018-01-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (92, 18.28, 5, '2018-06-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (93, 6.47, 3, '2018-07-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (94, 5.15, 6, '2018-06-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (95, 3.32, 8, '2018-05-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (96, 5.66, 2, '2017-12-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (97, 16.03, 7, '2017-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (98, 21.04, 7, '2017-12-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (100, 7.79, 9, '2018-03-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (101, 17.5, 6, '2017-08-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (102, 15.77, 6, '2018-07-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (103, 19.7, 3, '2017-09-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (104, 18.82, 7, '2017-08-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (105, 3.5, 3, '2017-10-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (106, 17.83, 8, '2018-02-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (107, 1.94, 3, '2017-08-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (108, 21.71, 5, '2017-08-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (109, 23.94, 7, '2017-10-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (110, 3.12, 0, '2018-06-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (111, 20.92, 8, '2017-09-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (112, 3.03, 3, '2017-08-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (113, 21.4, 5, '2017-10-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (114, 23.9, 5, '2018-02-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (115, 1.35, 4, '2018-03-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (116, 14.76, 7, '2017-09-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (117, 11.9, 5, '2018-04-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (118, 2.82, 0, '2017-09-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (119, 13.25, 4, '2018-02-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (120, 19.61, 0, '2017-08-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (121, 2.41, 5, '2017-10-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (122, 12.9, 9, '2018-01-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (123, 14.95, 1, '2017-11-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (124, 7.39, 9, '2017-11-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (125, 1.74, 2, '2018-04-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (126, 20.86, 8, '2017-09-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (127, 16.5, 3, '2017-08-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (128, 17.35, 7, '2017-10-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (129, 2.62, 6, '2018-07-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (130, 4.05, 5, '2017-12-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (131, 12.56, 0, '2018-01-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (132, 20.02, 0, '2018-03-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (133, 2.71, 3, '2018-06-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (134, 11.85, 1, '2018-07-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (135, 13.38, 5, '2018-01-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (136, 3.56, 1, '2018-04-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (137, 8.09, 2, '2017-11-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (138, 15.11, 1, '2017-09-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (139, 2.34, 3, '2017-10-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (140, 10.65, 6, '2017-09-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (141, 7.1, 2, '2018-04-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (142, 6.2, 9, '2018-03-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (143, 17.13, 2, '2017-08-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (144, 16.92, 8, '2017-08-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (145, 21.54, 5, '2017-08-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (146, 13.58, 9, '2017-11-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (147, 3.89, 8, '2017-11-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (148, 3.98, 8, '2018-01-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (149, 9.71, 0, '2017-08-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (150, 16.34, 0, '2017-11-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (151, 15.84, 4, '2018-05-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (152, 14.77, 1, '2017-10-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (153, 17.05, 7, '2018-02-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (154, 17.68, 3, '2017-09-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (155, 2.08, 5, '2017-09-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (156, 23.13, 9, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (157, 19.9, 8, '2017-09-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (158, 21.56, 5, '2018-06-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (159, 24.64, 9, '2018-02-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (160, 19.03, 2, '2017-08-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (161, 24.93, 2, '2018-05-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (162, 7.49, 3, '2018-01-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (163, 23.9, 3, '2018-06-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (164, 9.49, 9, '2017-10-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (166, 19.58, 8, '2017-12-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (167, 3.99, 9, '2017-10-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (168, 11.17, 2, '2018-02-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (169, 15.56, 0, '2017-09-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (170, 24.11, 6, '2018-01-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (171, 10.21, 4, '2017-08-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (172, 11.57, 0, '2018-02-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (173, 1.35, 2, '2017-08-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (174, 7.05, 8, '2018-02-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (175, 2.83, 0, '2017-09-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (176, 3.45, 2, '2017-11-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (177, 14.96, 0, '2017-11-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (178, 7.25, 3, '2018-02-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (179, 9.9, 0, '2018-02-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (180, 10.62, 6, '2017-10-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (181, 24.76, 2, '2018-04-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (182, 4.04, 2, '2017-11-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (183, 4.66, 3, '2017-10-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (184, 20.31, 8, '2017-08-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (185, 20.96, 9, '2017-11-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (186, 12.46, 8, '2017-10-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (187, 21.88, 4, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (188, 2.98, 4, '2017-11-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (189, 17.74, 2, '2017-12-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (190, 19.27, 0, '2017-09-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (191, 1.02, 0, '2017-12-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (192, 19.4, 6, '2018-05-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (193, 2.08, 9, '2018-06-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (194, 7.53, 8, '2017-11-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (195, 5.94, 2, '2017-10-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (196, 3.68, 2, '2018-03-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (197, 23.73, 1, '2018-02-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (198, 10.47, 8, '2018-02-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (199, 11.62, 0, '2018-03-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (200, 1.02, 6, '2017-09-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (201, 1.68, 2, '2018-04-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (202, 20.66, 3, '2018-01-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (203, 11.62, 6, '2018-05-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (204, 19.4, 2, '2018-02-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (205, 1.54, 7, '2018-04-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (206, 22.22, 6, '2017-09-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (207, 9.74, 5, '2018-05-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (208, 14.99, 6, '2018-02-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (209, 19.6, 5, '2017-12-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (210, 15.89, 4, '2018-04-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (211, 11.25, 7, '2018-01-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (212, 13.84, 1, '2018-07-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (213, 14.83, 1, '2018-05-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (214, 24.64, 2, '2017-09-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (215, 14.18, 2, '2018-01-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (216, 18.6, 9, '2018-03-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (217, 10.95, 4, '2017-10-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (218, 23.0, 4, '2018-02-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (219, 18.3, 1, '2017-11-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (220, 21.81, 5, '2018-04-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (221, 23.86, 5, '2018-01-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (222, 24.3, 6, '2018-05-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (223, 8.58, 8, '2018-04-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (224, 6.98, 8, '2017-10-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (225, 21.64, 3, '2018-05-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (226, 16.79, 5, '2017-12-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (227, 10.84, 5, '2017-12-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (228, 4.12, 6, '2017-11-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (229, 16.47, 7, '2017-09-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (230, 11.13, 0, '2017-09-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (231, 5.2, 3, '2018-01-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (232, 1.47, 0, '2017-08-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (233, 9.05, 7, '2017-12-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (234, 10.39, 6, '2017-08-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (235, 11.46, 5, '2017-07-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (236, 9.39, 0, '2017-12-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (237, 22.52, 5, '2018-03-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (238, 14.04, 0, '2017-10-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (239, 18.79, 4, '2018-04-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (240, 5.41, 9, '2017-11-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (241, 12.8, 0, '2018-07-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (242, 24.34, 2, '2018-02-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (243, 22.69, 4, '2018-03-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (244, 19.31, 7, '2017-11-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (245, 12.76, 6, '2018-04-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (246, 6.75, 1, '2017-09-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (247, 2.92, 0, '2017-11-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (248, 1.61, 6, '2018-02-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (249, 9.01, 3, '2018-03-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (250, 2.06, 1, '2017-11-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (251, 21.64, 8, '2017-12-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (252, 17.38, 5, '2018-07-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (253, 12.0, 3, '2017-09-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (254, 17.84, 1, '2017-12-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (255, 13.69, 6, '2017-11-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (256, 6.71, 7, '2017-09-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (257, 22.0, 5, '2017-09-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (258, 7.35, 4, '2017-10-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (259, 19.84, 8, '2018-03-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (260, 20.43, 9, '2018-02-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (261, 4.89, 8, '2017-07-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (262, 15.43, 2, '2018-07-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (263, 20.49, 6, '2018-06-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (264, 9.12, 3, '2017-08-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (265, 18.39, 3, '2017-11-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (266, 20.99, 6, '2018-06-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (267, 11.72, 6, '2018-06-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (268, 15.87, 9, '2018-01-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (269, 4.66, 8, '2017-08-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (270, 23.11, 5, '2018-02-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (271, 18.08, 2, '2017-10-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (272, 19.57, 8, '2017-10-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (273, 15.07, 5, '2017-09-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (274, 9.97, 7, '2017-12-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (275, 3.88, 9, '2018-01-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (276, 17.26, 7, '2017-10-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (277, 13.02, 7, '2018-06-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (278, 5.17, 6, '2017-12-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (279, 10.86, 0, '2017-10-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (280, 8.09, 0, '2018-05-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (281, 10.93, 8, '2018-03-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (282, 22.96, 0, '2018-06-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (283, 3.35, 0, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (284, 5.1, 2, '2017-12-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (285, 1.86, 2, '2017-08-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (286, 9.06, 6, '2018-05-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (287, 21.82, 5, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (288, 16.4, 9, '2018-02-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (289, 18.34, 2, '2018-06-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (290, 9.14, 6, '2017-10-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (291, 17.44, 3, '2018-02-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (292, 5.78, 5, '2018-03-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (293, 1.8, 1, '2018-04-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (294, 16.06, 1, '2018-03-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (295, 16.98, 1, '2017-09-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (296, 14.05, 0, '2018-04-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (297, 14.67, 3, '2017-08-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (298, 7.27, 8, '2017-12-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (299, 9.34, 1, '2018-05-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (300, 11.32, 0, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (301, 23.59, 5, '2018-07-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (302, 22.79, 0, '2018-04-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (304, 18.16, 7, '2017-12-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (305, 17.05, 0, '2017-11-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (306, 7.6, 5, '2018-02-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (307, 1.96, 8, '2018-05-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (309, 23.28, 4, '2018-07-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (310, 5.38, 7, '2018-06-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (311, 3.29, 3, '2018-06-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (312, 2.76, 1, '2018-04-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (313, 23.52, 8, '2017-11-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (314, 11.66, 0, '2018-04-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (315, 4.72, 6, '2017-09-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (317, 23.25, 6, '2018-03-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (318, 4.12, 0, '2018-03-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (319, 9.94, 4, '2018-07-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (320, 19.94, 2, '2017-11-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (321, 9.08, 6, '2018-05-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (322, 4.51, 7, '2017-09-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (323, 16.38, 9, '2018-05-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (324, 22.27, 1, '2018-02-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (325, 15.8, 1, '2017-09-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (326, 15.38, 4, '2018-06-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (327, 2.91, 5, '2017-11-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (328, 2.27, 0, '2017-10-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (329, 11.43, 3, '2018-01-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (330, 12.13, 2, '2017-11-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (331, 15.11, 9, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (332, 5.61, 9, '2018-04-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (333, 10.7, 4, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (334, 9.26, 8, '2017-09-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (335, 6.3, 4, '2018-07-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (336, 18.17, 8, '2018-07-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (337, 21.36, 2, '2018-04-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (338, 21.71, 4, '2018-06-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (339, 9.4, 8, '2017-11-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (340, 15.62, 7, '2017-08-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (341, 24.52, 0, '2017-12-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (342, 12.75, 2, '2018-06-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (343, 18.54, 0, '2018-01-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (344, 17.39, 1, '2018-06-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (345, 5.92, 9, '2017-09-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (346, 3.21, 2, '2018-04-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (347, 22.22, 9, '2017-08-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (348, 6.29, 0, '2017-11-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (349, 6.08, 5, '2017-12-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (350, 1.81, 2, '2018-06-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (351, 1.02, 2, '2018-03-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (352, 1.08, 0, '2018-03-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (353, 21.26, 1, '2017-10-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (354, 2.17, 7, '2018-06-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (355, 3.18, 7, '2017-08-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (356, 22.14, 7, '2018-03-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (357, 19.86, 3, '2018-06-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (358, 22.97, 6, '2018-03-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (359, 8.11, 1, '2017-08-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (360, 2.98, 5, '2017-09-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (361, 19.29, 2, '2018-01-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (362, 11.48, 0, '2018-03-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (363, 11.67, 4, '2018-01-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (364, 15.67, 4, '2017-08-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (365, 5.03, 5, '2017-09-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (366, 21.42, 3, '2017-09-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (367, 5.91, 1, '2018-05-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (368, 12.93, 4, '2018-04-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (369, 24.59, 5, '2017-12-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (370, 12.15, 1, '2018-04-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (371, 20.8, 3, '2018-03-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (372, 12.43, 1, '2018-04-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (373, 7.37, 9, '2018-04-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (374, 8.88, 7, '2018-01-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (375, 24.92, 1, '2018-05-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (376, 5.44, 1, '2018-04-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (377, 4.22, 7, '2017-09-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (378, 18.2, 2, '2018-04-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (379, 22.5, 7, '2018-05-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (380, 10.48, 7, '2017-11-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (381, 24.51, 6, '2018-05-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (382, 22.37, 2, '2017-09-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (383, 13.02, 0, '2017-11-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (384, 24.58, 0, '2017-11-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (385, 3.25, 0, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (386, 24.33, 6, '2018-02-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (387, 8.77, 5, '2017-09-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (388, 4.42, 3, '2018-02-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (389, 17.47, 2, '2017-07-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (390, 4.93, 5, '2017-08-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (391, 21.32, 3, '2018-03-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (392, 4.37, 9, '2017-09-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (393, 2.6, 4, '2017-10-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (394, 23.4, 9, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (395, 8.99, 2, '2017-12-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (396, 10.99, 5, '2018-03-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (397, 23.57, 3, '2018-05-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (398, 7.65, 6, '2018-04-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (399, 11.66, 4, '2018-02-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (400, 55, 1, '2018-07-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (401, 27, 1, '2018-07-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (402, 27, 2, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (403, 27, 8, '2018-07-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (404, 29, 1, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (405, 49, 6, '2018-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (406, 2, 2, '2018-08-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (407, 26, 6, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (408, 2, 2, '2018-07-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (409, 28, 0, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (410, 37, 1, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (411, 2, 2, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (412, 19, 2, '2018-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (413, 26, 5, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (414, 19, 8, '2018-07-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (415, 8, 4, '2018-07-26', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (416, 2, 4, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (417, 31, 5, '2018-07-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (418, 13, 1, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (419, 45, 4, '2018-07-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (420, 60, 1, '2018-08-03', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (421, 25, 9, '2018-07-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (422, 6, 5, '2018-08-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (423, 7, 0, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (424, 4, 0, '2018-07-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (425, 2, 7, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (426, 21, 5, '2018-08-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (427, 18, 7, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (428, 3, 4, '2018-07-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (429, 20, 7, '2018-07-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (430, 8, 8, '2018-07-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (431, 2, 6, '2018-07-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (432, 48, 6, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (433, 12, 4, '2018-07-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (434, 44, 2, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (435, 50, 5, '2018-07-12', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (436, 2, 5, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (437, 2, 6, '2018-07-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (438, 12, 2, '2018-07-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (439, 49, 1, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (440, 47, 3, '2018-07-09', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (441, 40, 2, '2018-07-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (442, 44, 8, '2018-08-05', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (443, 24, 4, '2018-07-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (444, 11, 8, '2018-07-24', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (445, 6, 5, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (446, 22, 4, '2018-07-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (447, 4, 7, '2018-07-14', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (448, 4, 0, '2018-07-31', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (449, 4, 8, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (450, 32, 9, '2018-07-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (451, 2, 7, '2018-07-23', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (452, 50, 9, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (453, 25, 2, '2018-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (454, 6, 4, '2018-07-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (455, 5, 7, '2018-07-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (456, 19, 9, '2018-07-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (457, 23, 2, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (458, 2, 1, '2018-07-15', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (459, 14, 6, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (460, 50, 3, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (461, 2, 0, '2018-07-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (462, 2, 1, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (463, 3, 1, '2018-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (464, 21, 5, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (465, 4, 6, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (466, 8, 1, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (467, 47, 4, '2018-07-30', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (468, 2, 4, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (469, 49, 2, '2018-07-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (470, 2, 1, '2018-07-19', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (471, 29, 9, '2018-07-28', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (472, 26, 4, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (473, 48, 8, '2018-07-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (474, 9, 7, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (475, 44, 2, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (476, 31, 1, '2018-07-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (477, 2, 6, '2018-07-11', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (478, 9, 4, '2018-07-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (479, 26, 5, '2018-07-07', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (480, 11, 1, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (481, 10, 0, '2018-07-10', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (482, 29, 2, '2018-07-17', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (483, 10, 6, '2018-07-06', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (484, 29, 6, '2018-08-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (485, 2, 0, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (486, 9, 9, '2018-08-01', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (487, 27, 7, '2018-07-20', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (488, 6, 2, '2018-07-22', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (489, 2, 8, '2018-07-16', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (490, 44, 6, '2018-07-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (491, 14, 1, '2018-08-02', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (492, 2, 2, '2018-07-21', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (493, 1, 7, '2018-07-29', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (494, 20, 9, '2018-07-25', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (495, 39, 6, '2018-08-04', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (496, 4, 7, '2018-07-13', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (497, 37, 1, '2018-07-27', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (498, 36, 8, '2018-07-18', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (499, 3, 5, '2018-07-08', '', 1);
INSERT INTO `personal_finance_app`.`expense` (`id`, `amount`, `category_id`, `date`, `description`, `user_id`) VALUES (500, 25, 4, '2018-07-26', '', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`future_expense`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`future_expense` (`id`, `user_id`, `category_id`, `amount`, `date_expected`, `recurring`, `description`, `number_of_recurrences`) VALUES (1, 1, 3, '24.99', '2018-02-09', 0, NULL, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`income_category`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (1, 'Salary');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (2, 'Secondary Salary');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (3, 'Rental Income');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (4, 'Dividends');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (5, 'Interest');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (6, 'Capital Gains');
INSERT INTO `personal_finance_app`.`income_category` (`id`, `name`) VALUES (7, 'Royalties');

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`income`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (1, 1, 1, 2000, '2017-07-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (2, 1, 1, 2000, '2017-08-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (3, 1, 1, 2000, '2017-09-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (4, 1, 1, 2000, '2017-10-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (5, 1, 1, 2000, '2017-11-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (6, 1, 1, 2000, '2017-12-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (7, 1, 1, 2000, '2018-01-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (8, 1, 1, 2000, '2018-02-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (9, 1, 1, 2000, '2018-03-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (10, 1, 1, 2000, '2018-04-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (11, 1, 1, 2000, '2018-05-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (12, 1, 1, 2000, '2018-06-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (13, 1, 1, 2000, '2018-07-25');
INSERT INTO `personal_finance_app`.`income` (`id`, `user_id`, `category_id`, `amount`, `date_received`) VALUES (14, 1, 3, 500, '2018-05-01');

COMMIT;


-- -----------------------------------------------------
-- Data for table `personal_finance_app`.`income_stream`
-- -----------------------------------------------------
START TRANSACTION;
USE `personal_finance_app`;
INSERT INTO `personal_finance_app`.`income_stream` (`id`, `user_id`, `category_id`, `expected_amount`, `start_date`, `number_of_occurrences`, `recurring`) VALUES (1, 1, 3, 100, '2018-10-10', 0, 0);

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
