CREATE DATABASE IF NOT EXISTS node_docker;  /**cria o banco de dados **/ 
USE node_docker;    /**usa o banco de dados **/


/**criação da tabela ***/
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);
