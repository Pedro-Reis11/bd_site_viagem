DROP DATABASE IF EXISTS travel_db;
CREATE DATABASE travel_db;
USE travel_db;

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE destino_turistico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cidade VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE pacote_viagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    id_destino INT NOT NULL,
    FOREIGN KEY (id_destino) REFERENCES destino_turistico(id) 
);

-- CLIENTES
INSERT INTO cliente (nome, email, telefone, cpf) VALUES
('Pedro Reis', 'pedro@gmail.com', '(31) 99999-1111', '123.456.789-01'),
('Cauã Debattisti', 'cdb@gmail.com', '(31) 98888-2222', '234.567.890-02'),
('Ryan Lage', 'ryan@gmail.com', '(11) 97777-3333', '345.678.901-03'),
('Samuel Ferraz', 'samuca@gmail.com', '(21) 96666-4444', '456.789.012-04'),
('Davi Fernandes', 'davi@gmail.com', '(41) 95555-5555', '567.890.123-05');


-- DESTINOS TURÍSTICOS
INSERT INTO destino_turistico (cidade, pais, descricao) VALUES
('Paris', 'França', 'Conhecida pela Torre Eiffel, gastronomia e cultura.'),
('Rio de Janeiro','Brasil', 'Destino famoso pelas praias, Cristo Redentor e Pão de Açúcar.'),
('Orlando', 'Estados Unidos', 'Destino conhecido pelos parques temáticos e atrações familiares.'),
('Buenos Aires', 'Argentina','Cidade conhecida pela gastronomia, cultura e arquitetura.'),
('Lisboa', 'Portugal', 'Destino histórico com gastronomia, cultura e belas paisagens.');


-- PACOTES DE VIAGEM
INSERT INTO pacote_viagem
(nome, preco, data_inicio, data_fim, id_destino) VALUES
('Paris Romântica', 8500.00, '2026-10-10', '2026-10-17', 1),
('Paris Cultural', 7200.00, '2026-11-05', '2026-11-12', 1),
('Rio de Janeiro Verão', 2500.00, '2026-12-10', '2026-12-15', 2),
('Orlando Mágica', 9800.00, '2027-01-15', '2027-01-25', 3),
('Buenos Aires Gourmet', 4200.00, '2026-09-20', '2026-09-25', 4),
('Lisboa Histórica', 6800.00, '2026-10-20', '2026-10-27', 5);