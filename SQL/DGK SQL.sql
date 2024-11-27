CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  email VARCHAR(30) NOT NULL,
  senha VARCHAR(100) NOT NULL
);

INSERT INTO "usuario" ("nome", "cpf", "email", "senha") 
VALUES 
  ('Franciele Darós', '12345678901', 'francieledaros@gmail.com', 'admin');

CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  telefone VARCHAR(11) NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  email VARCHAR(30),
  nascimento DATE,
  endereco VARCHAR(100) NOT NULL
);

INSERT INTO cliente (nome, telefone, cpf, email, nascimento, endereco) VALUES
('Ana Silva', '11987654321', '12345678901', 'ana.silva@email.com', '1985-04-23', 'Rua A, 123, São Paulo'),
('Beatriz Souza', '11923456789', '23456789012', 'beatriz.souza@email.com', '1990-05-12', 'Avenida B, 456, São Paulo'),
('Carla Oliveira', '11876543210', '34567890123', 'carla.oliveira@email.com', '1988-08-30', 'Rua C, 789, São Paulo'),
('Daniela Pereira', '11934567890', '45678901234', 'daniela.pereira@email.com', '1975-01-22', 'Avenida D, 101, São Paulo'),
('Eduarda Lima', '11965432109', '56789012345', 'eduarda.lima@email.com', '1992-11-07', 'Rua E, 202, São Paulo'),
('Fernanda Santos', '11897654321', '67890123456', 'fernanda.santos@email.com', '1983-06-15', 'Avenida F, 303, São Paulo'),
('Gabriela Costa', '11987654322', '78901234567', 'gabriela.costa@email.com', '1995-02-19', 'Rua G, 404, São Paulo'),
('Helena Martins', '11876543211', '89012345680', 'helena.martins@email.com', '1989-03-14', 'Avenida H, 505, São Paulo'),
('Isabela Almeida', '11923456788', '90123456781', 'isabela.almeida@email.com', '1993-12-01', 'Rua I, 606, São Paulo'),
('Juliana Fernandes', '11987654323', '01234567894', 'juliana.fernandes@email.com', '1987-07-28', 'Avenida J, 707, São Paulo');

CREATE TABLE servico (
  id_servico SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  valor NUMERIC(5,2) NOT NULL,
  duracao TIME NOT NULL
);

INSERT INTO servico (nome, valor, duracao) VALUES
('Limpeza de Pele', 150.00, INTERVAL '00:45:00'),
('Extensão de Cílios', 200.00, INTERVAL '01:30:00'),
('Dermaplaning', 120.00, INTERVAL '00:50:00'),
('Lash Lifting', 180.00, INTERVAL '01:00:00');

CREATE TABLE agenda (
  id_agenda SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL,
  id_servico INTEGER NOT NULL,
  data_inicial TIMESTAMP NOT NULL,
  data_final TIMESTAMP NOT NULL,
  status INTEGER NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
  FOREIGN KEY (id_servico) REFERENCES servico (id_servico)
);

INSERT INTO agenda (id_cliente, id_servico, data_inicial, data_final, status) VALUES
(1, 1, '2024-09-27 11:00:00', '2024-09-27 11:45:00', 1),
(2, 2, '2024-09-28 14:00:00', '2024-09-28 15:30:00', 1),
(3, 3, '2024-09-29 09:00:00', '2024-09-29 09:50:00', 1),
(4, 1, '2024-09-30 10:00:00', '2024-09-30 10:30:00', 1),
(5, 2, '2024-10-01 13:00:00', '2024-10-01 13:45:00', 1),
(6, 3, '2024-10-02 09:00:00', '2024-10-02 09:50:00', 1),
(7, 1, '2024-10-03 10:00:00', '2024-10-03 10:30:00', 1),
(8, 2, '2024-10-04 15:00:00', '2024-10-04 15:45:00', 1),
(9, 3, '2024-10-05 11:00:00', '2024-10-05 11:50:00', 1);

CREATE TABLE financeiro (
  id_financeiro SERIAL PRIMARY KEY,
  id_agenda INTEGER NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,  -- Adicionando a coluna valor
  data_pagamento TIMESTAMP NOT NULL,  -- Adicionando a coluna data_pagamento
  forma_pagamento VARCHAR(30) NOT NULL,
  status VARCHAR(20) NOT NULL,  -- Adicionando a coluna status
  data DATE NOT NULL,
  FOREIGN KEY (id_agenda) REFERENCES agenda (id_agenda)
);

INSERT INTO financeiro (id_agenda, valor, data_pagamento, forma_pagamento, status, data) VALUES
(1, 100.00, '2024-09-27 11:45:00', 'Cartão', 'Pago', '2024-09-27'),
(2, 150.00, '2024-09-28 15:30:00', 'Dinheiro', 'Pago', '2024-09-28'),
(3, 120.00, '2024-09-29 09:50:00', 'Boleto', 'Pago', '2024-09-29'),
(4, 100.00, '2024-09-30 10:30:00', 'Cartão', 'Pago', '2024-09-30'),
(5, 150.00, '2024-10-01 13:45:00', 'Dinheiro', 'Pago', '2024-10-01'),
(6, 120.00, '2024-10-02 09:50:00', 'Boleto', 'Pago', '2024-10-02'),
(7, 100.00, '2024-10-03 10:30:00', 'Cartão', 'Pago', '2024-10-03'),
(8, 150.00, '2024-10-04 15:45:00', 'Dinheiro', 'Pago', '2024-10-04'),
(9, 120.00, '2024-10-05 11:50:00', 'Boleto', 'Pago', '2024-10-05');

