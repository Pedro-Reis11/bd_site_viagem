import bd from '../bd.js';

export const listarPacotes = (req,res)=>{
    const query = `
    SELECT
        p.id,
        p.nome,
        p.preco,
        p.data_inicio,
        p.data_fim,
        d.cidade,
        d.pais
    FROM pacote_viagem p
    INNER JOIN destino_turistico d
    ON p.id_destino = d.id;
    `;

    bd.query(query,(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        res.json(resultado);
    });
};

export const buscarPacotePorId = (req,res)=>{
    const {id} = req.params;

    const query = `
    SELECT
        p.id,
        p.nome,
        p.preco,
        p.data_inicio,
        p.data_fim,
        d.cidade,
        d.pais
    FROM pacote_viagem p
    JOIN destino_turistico d
    ON p.id_destino = d.id
    WHERE p.id = ?;
    `;

    bd.query(query,[id],(erro,resultado)=>{
       if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }
        
        if(resultado.length === 0){
            return res.status(404).json({
                msg_erro: `Nenhum pacote encontrado com ID ${id}`
            });
        }

        res.json(resultado[0]);
    });
};

export const cadastrarPacote = (req,res)=>{
    const{
        nome,
        preco,
        data_inicio,
        data_fim,
        id_destino
    } = req.body;

    if(!nome||!preco||!data_inicio||!data_fim||!id_destino){
        return res.status(404).json({
            msg_erro: 'Todos os campos são obrigatórios'
        });
    }

    const query = `
    INSERT INTO pacote_viagem
    (nome,preco,data_inicio,data_fim,id_destino)
    VALUES(?,?,?,?,?)
    `;

    bd.query(query,[nome,preco,data_inicio,data_fim,id_destino],(erro,resultado)=>{
        if (erro) {
        return res.status(500).json({
          msg_erro: erro.message
        });
        }

        res.status(201).json({
            id: resultado.insertId,
            nome,
            preco,
            data_inicio,
            data_fim,
            id_destino
        });
    });
};

export const atualizarPacote = (req,res)=>{
    const {id} = req.params;

    const{
        nome,
        preco,
        data_inicio,
        data_fim,
        id_destino
    } = req.body;

    const query = `
    UPDATE pacote_viagem
    SET nome = ?, 
        preco = ?,
        data_inicio = ?,
        data_fim = ?,
        id_destino = ?
    WHERE id = ?
    `;

    bd.query(query,[nome,preco,data_inicio,data_fim,id_destino,id],(erro,resultado)=>{
        if (erro) {
        return res.status(500).json({
          msg_erro: erro.message
        });
        }

        if(resultado.affectedRows === 0){
            return res.status(404).json({
                msg_erro: `Nenhum pacote encontrado com ID ${id}`
            });
        };

        res.json({
            mensagem: 'Pacote atualizado com sucesso'
        });
    });
};

export const removerPacote = (req,res)=>{
    const {id} = req.params;

    const query = 'DELETE FROM pacote_viagem WHERE id = ?';

    bd.query(query,[id],(erro,resultado)=>{
      if (erro) {
      return res.status(500).json({
        msg_erro: erro.message
      });
    }

    if (resultado.affectedRows === 0){
        return res.status(404).json({
            msg_erro: `Ǹenhum pacote encontrado com ID ${id}`
        });
    }

    res.json({
        mensagem: 'Pacote removido com sucesso'
    });     
    });
};