CREATE TABLE role (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE race (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE health (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  sterilisation BOOL NOT NULL, 
  vaccination BOOL NOT NULL, 
  identification BOOL NOT NULL,
  decontamination BOOL NOT NULL,
  background TEXT,
  observations TEXT
);

CREATE TABLE cohabitation (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  human VARCHAR(255) NOT NULL, 
  cat VARCHAR(255) NOT NULL, 
  dog VARCHAR(255) NOT NULL
);

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL, 
  address VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  city VARCHAR(255) NOT NULL, 
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE animal (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  age INT,
  gender CHAR(1),
  story TEXT, 
  coming_date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  personality VARCHAR(255) NOT NULL,
  adoption_date DATE,
  race_id INT UNSIGNED NOT NULL,  
  health_id INT UNSIGNED, 
  cohabitation_id INT UNSIGNED, 
  user_id INT UNSIGNED,
  FOREIGN KEY (race_id) REFERENCES race(id) ON DELETE CASCADE,
  FOREIGN KEY (health_id) REFERENCES health(id) ON DELETE CASCADE,
  FOREIGN KEY (cohabitation_id) REFERENCES cohabitation(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

INSERT INTO role (name) VALUES
('Admin'),
('Utilisateur');

INSERT INTO race (name) VALUES
('Hollandais'),
('Géant des Flandres'),
('Nain bélier');

INSERT INTO health (sterilisation, vaccination, identification, decontamination, background, observations) VALUES
(1, 1, 1, 1, 'Aucun problème de santé connu', 'En pleine forme et actif'),
(1, 1, 1, 1, 'Allergique à certaines plantes', 'Nécessite des visites régulières chez le vétérinaire');

INSERT INTO cohabitation (human, cat, dog) VALUES
('+ (en cours)', '-', '-'),
('+++', 'ok', 'ok');

INSERT INTO user (firstname, lastname, email, hashed_password, telephone, address, zip_code, city, role_id) VALUES
('Fanny', 'Admin', 'admin@example.com', '$argon2id$v=19$m=19456,t=2,p=1$YuTUonvj6kDs1gtygYcjpg$fDUntM/0R/oJyXsNf0z0r+jepTG58vMfGkf7Bsjwqig', '123-456-7890', '123 Rue Principale', '12345', 'Ville A', 1),
('Marie', 'Martin', 'marie@example.com', '$argon2id$v=19$m=19456,t=2,p=1$YuTUonvj6kDs1gtygYcjpg$fDUntM/0R/oJyXsNf0z0r+jepTG58vMfGkf7Bsjwqig', '987-654-3210', '456 Rue Elm', '54321', 'Ville B', 2);

INSERT INTO animal (name, image, age, gender, story, coming_date, status, personality, adoption_date, race_id, health_id, cohabitation_id, user_id) VALUES
('Panpan', 'https://botanic-botanic-storage.omn.proximis.com/Imagestorage/images/2560/1600/6540c9bfad436_lapin_dresse_sur_ses_pattes_oreilles.jpg', 3, 'M', 'Trouvé abandonné', '2023-01-15', 'Disponible', 'Amical et joueur', NULL, 1, 1, 1, 1),
('Fleur', 'https://media.4-paws.org/e/8/2/7/e827506a0aaf548b6d7bede74f5e9bc4997d981a/Kaninchen%20im%20Freigehege%20%282%29-4440x3072.jpg', 2, 'F', 'Récupéré d''un refuge', '2023-02-20', 'Adopté', 'Affectueux et énergique', '2023-03-01', 2, 2, 2, 2);




