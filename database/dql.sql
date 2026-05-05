SELECT
    EXTRACT(YEAR FROM adocoes.data_adocao) AS ano,
    EXTRACT(MONTH FROM adocoes.data_adocao) AS mes,
    animais.especie,
    COUNT(adocoes.id) AS total_adocoes
FROM adocoes
         INNER JOIN animais ON animais.id = adocoes.animal_id
WHERE adocoes.status = 'Aprovada'
GROUP BY
    EXTRACT(YEAR FROM adocoes.data_adocao),
    EXTRACT(MONTH FROM adocoes.data_adocao),
    animais.especie
ORDER BY
    ano,
    mes,
    animais.especie;


SELECT
    EXTRACT(YEAR FROM castracoes.data_solicitacao) AS ano,
    EXTRACT(MONTH FROM castracoes.data_solicitacao) AS mes,
    castracoes.especie,
    COUNT(castracoes.id) AS total_solicitacoes
FROM castracoes
GROUP BY
    EXTRACT(YEAR FROM castracoes.data_solicitacao),
    EXTRACT(MONTH FROM castracoes.data_solicitacao),
    castracoes.especie
ORDER BY
    ano,
    mes,
    castracoes.especie;


SELECT
    AVG(tabela_mensal.total_adocoes) AS media_mensal_adocoes
FROM (
         SELECT
             EXTRACT(YEAR FROM data_adocao) AS ano,
             EXTRACT(MONTH FROM data_adocao) AS mes,
             COUNT(id) AS total_adocoes
         FROM adocoes
         WHERE status = 'Aprovada'
         GROUP BY
             EXTRACT(YEAR FROM data_adocao),
             EXTRACT(MONTH FROM data_adocao)
     ) AS tabela_mensal;