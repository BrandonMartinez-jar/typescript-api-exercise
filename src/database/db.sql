create database patents;

use patents;

create table patents(
    id int not null auto_increment primary key,
    domain VARCHAR(7) not null,
    name VARCHAR(100) not null,
    type VARCHAR(50) not null,
    description TEXT not null
);

-- Script SQL donde es generada la tabla que almacenará las patentes --