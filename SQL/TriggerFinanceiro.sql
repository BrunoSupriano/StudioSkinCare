CREATE OR REPLACE FUNCTION gerar_financeiro_apos_agenda()
RETURNS TRIGGER AS $$
DECLARE 
    v_valor DECIMAL(10,2);
    v_data_pagamento TIMESTAMP;
BEGIN
    -- Buscar o valor do serviço correspondente
    SELECT valor INTO v_valor 
    FROM servico s
    JOIN agenda a ON a.id_servico = s.id_servico
    WHERE a.id_agenda = NEW.id_agenda;

    -- Definir a data de pagamento como o final do serviço
    v_data_pagamento := NEW.data_final;

    -- Inserir automaticamente na tabela financeiro
    INSERT INTO financeiro (
        id_agenda, 
        valor, 
        data_pagamento, 
        forma_pagamento, 
        status, 
        data
    ) VALUES (
        NEW.id_agenda,
        v_valor,
        v_data_pagamento,
        'Não definido', -- Valor padrão que pode ser atualizado depois
        'Pendente',     -- Status inicial 
        NEW.data_inicial::DATE
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar o trigger
CREATE TRIGGER trigger_gerar_financeiro
AFTER INSERT ON agenda
FOR EACH ROW
EXECUTE FUNCTION gerar_financeiro_apos_agenda();