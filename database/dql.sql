-- 1. Relação de adoções de cães e gatos por mês

SELECT
    TO_CHAR(a.data_adocao, 'YYYY-MM') AS mes,
    an.especie,
    COUNT(*) AS total_adocoes
FROM adocoes a
         INNER JOIN animais an ON an.id = a.animal_id
WHERE a.status = 'Aprovada'
GROUP BY mes, an.especie
ORDER BY mes, an.especie;


-- 2. Demanda de castração de gatos e cães

SELECT
    TO_CHAR(c.data_solicitacao, 'YYYY-MM') AS mes,
    c.especie,
    COUNT(*) AS total_solicitacoes,
    COUNT(*) FILTER (WHERE c.status = 'Solicitada') AS solicitadas,
    COUNT(*) FILTER (WHERE c.status = 'Agendada') AS agendadas,
    COUNT(*) FILTER (WHERE c.status = 'Realizada') AS realizadas,
    COUNT(*) FILTER (WHERE c.status = 'Cancelada') AS canceladas
FROM castracoes c
GROUP BY mes, c.especie
ORDER BY mes, c.especie;


-- 3. Média mensal de adoções

WITH adocoes_por_mes AS (
    SELECT
        TO_CHAR(data_adocao, 'YYYY-MM') AS mes,
        COUNT(*) AS total_adocoes
    FROM adocoes
    WHERE status = 'Aprovada'
    GROUP BY mes
)
SELECT
    ROUND(AVG(total_adocoes), 2) AS media_mensal_adocoes
FROM adocoes_por_mes;


-- Consulta extra: resumo geral do sistema

SELECT
    (SELECT COUNT(*) FROM tutores) AS total_tutores,
    (SELECT COUNT(*) FROM animais) AS total_animais,
    (SELECT COUNT(*) FROM adocoes) AS total_adocoes,
    (SELECT COUNT(*) FROM castracoes) AS total_castracoes,
    (SELECT COUNT(*) FROM denuncias) AS total_denuncias,
    (SELECT COUNT(*) FROM resgates) AS total_resgates;