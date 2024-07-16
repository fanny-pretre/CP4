create table role (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL
);

create table race (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(255) NOT NULL
);

create table health (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  sterilisation BOOL NOT NULL, 
  vaccination BOOL NOT NULL, 
  identification BOOL NOT NULL,
  decontamination BOOL NOT NULL,
  background TEXT,
  observations TEXT
);

create table cohabitation (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  human VARCHAR(255) NOT NULL, 
  cat VARCHAR(255) NOT NULL, 
  dog VARCHAR(255) NOT NULL
  );

create table user (
  id INT unsigned PRIMARY KEY auto_increment NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL unique,
  password VARCHAR(255) NOT NULL,
  telephone  VARCHAR(20) NOT NULL, 
  address VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  city VARCHAR(255) NOT NULL, 
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE CASCADE
);


CREATE TABLE animal (
  id INT unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INT,
  gender CHAR(1),
  story TEXT, 
  coming_date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  personality VARCHAR(255) NOT NULL,
  adoption_date DATE,
  race_id INT UNSIGNED NOT NULL,  
  health_id INT UNSIGNED NOT NULL, 
  cohabitation_id INT UNSIGNED NOT NULL, 
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(race_id) REFERENCES race(id) ON DELETE CASCADE,
  FOREIGN KEY(health_id) REFERENCES health(id) ON DELETE CASCADE,
  FOREIGN KEY(cohabitation_id) REFERENCES cohabitation(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
);



