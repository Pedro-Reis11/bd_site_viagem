-- 1. Mostrar todos os clientes
SELECT *
FROM cliente;


-- 2. Mostrar nome e e-mail dos clientes
SELECT nome, email
FROM cliente;


-- 3. Mostrar todos os destinos turísticos
SELECT *
FROM destino_turistico;


-- 4. Mostrar todos os destinos do Brasil
SELECT *
FROM destino_turistico
WHERE pais = 'Brasil';


-- 5. Mostrar todos os pacotes
SELECT *
FROM pacote_viagem;


-- 6. Mostrar pacotes com preço maior que R$ 5.000
SELECT *
FROM pacote_viagem
WHERE preco > 5000;


-- 7. Mostrar pacotes do mais barato para o mais caro
SELECT *
FROM pacote_viagem
ORDER BY preco ASC;


-- 8. Mostrar pacotes do mais caro para o mais barato
SELECT *
FROM pacote_viagem
ORDER BY preco DESC;


-- 9. Mostrar os 3 pacotes mais caros
SELECT *
FROM pacote_viagem
ORDER BY preco DESC
LIMIT 3;


-- 10. Buscar clientes cujo nome começa com "P"
SELECT *
FROM cliente
WHERE nome LIKE 'P%';


-- 11. Mostrar pacote e seu destino
SELECT
    p.nome AS pacote,
    d.cidade AS destino,
    d.pais
FROM pacote_viagem p
INNER JOIN destino_turistico d
    ON p.id_destino = d.id_destino;


-- 12. Mostrar pacote, destino, preço e datas
SELECT
    p.nome AS pacote,
    d.cidade AS destino,
    d.pais,
    p.preco,
    p.data_inicio,
    p.data_fim
FROM pacote_viagem p
INNER JOIN destino_turistico d
    ON p.id_destino = d.id_destino;


-- 13. Mostrar apenas pacotes para destinos do Brasil
SELECT
    p.nome AS pacote,
    d.cidade AS destino,
    p.preco
FROM pacote_viagem p
INNER JOIN destino_turistico d
    ON p.id_destino = d.id_destino
WHERE d.pais = 'Brasil';


-- 14. Mostrar os pacotes e ordenar pelo maior preço
SELECT
    p.nome AS pacote,
    d.cidade AS destino,
    p.preco
FROM pacote_viagem p
INNER JOIN destino_turistico d
    ON p.id_destino = d.id_destino
ORDER BY p.preco DESC;


-- 15. Calcular o preço médio dos pacotes
SELECT AVG(preco) AS preco_medio
FROM pacote_viagem;


-- 16. Encontrar o maior preço
SELECT MAX(preco) AS maior_preco
FROM pacote_viagem;


-- 17. Encontrar o menor preço
SELECT MIN(preco) AS menor_preco
FROM pacote_viagem;


-- 18. Calcular o valor total dos pacotes
SELECT SUM(preco) AS valor_total
FROM pacote_viagem;


-- 19. Contar quantos clientes existem
SELECT COUNT(*) AS quantidade_clientes
FROM cliente;


-- 20. Contar quantos pacotes existem
SELECT COUNT(*) AS quantidade_pacotes
FROM pacote_viagem;


-- 21. Contar quantos pacotes existem em cada destino
SELECT
    d.cidade AS destino,
    COUNT(p.id_pacote) AS quantidade_pacotes
FROM destino_turistico d
INNER JOIN pacote_viagem p
    ON d.id_destino = p.id_destino
GROUP BY d.id_destino, d.cidade;


-- 22. Calcular o preço médio dos pacotes por destino
SELECT
    d.cidade AS destino,
    AVG(p.preco) AS preco_medio
FROM destino_turistico d
INNER JOIN pacote_viagem p
    ON d.id_destino = p.id_destino
GROUP BY d.id_destino, d.cidade;


-- 23. Mostrar destinos que possuem mais de um pacote
SELECT
    d.cidade AS destino,
    COUNT(p.id_pacote) AS quantidade_pacotes
FROM destino_turistico d
INNER JOIN pacote_viagem p
    ON d.id_destino = p.id_destino
GROUP BY d.id_destino, d.cidade
HAVING COUNT(p.id_pacote) > 1;


-- 24. Mostrar o pacote mais caro e seu destino
SELECT
    p.nome AS pacote,
    d.cidade AS destino,
    d.pais,
    p.preco
FROM pacote_viagem p
INNER JOIN destino_turistico d
    ON p.id_destino = d.id_destino
WHERE p.preco = (
    SELECT MAX(preco)
    FROM pacote_viagem
);


-- 25. Mostrar pacotes acima do preço médio
SELECT
    p.nome AS pacote,
    p.preco
FROM pacote_viagem p
WHERE p.preco > (
    SELECT AVG(preco)
    FROM pacote_viagem
)
ORDER BY p.preco DESC;