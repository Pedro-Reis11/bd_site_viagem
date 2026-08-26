import bd from '../bd.js';

export const listarDestinosTuristicos = (req,res)=>{
    bd.query('SELECT * FROM destino_turistico',(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        res.json(resultado);
    });
};

export const listarDestinosTuristicosPorId = (req,res)=>{
    const {id}=req.params;

    const query = `
    SELECT cidade,pais,descricao
    FROM destino_turistico
    WHERE id = ?
    `;

    bd.query(query,[id],(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        if(resultado.length === 0){
            return res.status(404).json({
                msg_erro: `Nenhum destino encontrado com ID ${id}`
            });
        }

        res.json(resultado[0]);
    });
};

export const cadastrarDestinoTuristico = (req,res)=>{
    const {
        cidade,
        pais,
        descricao
    } = req.body;

    if(!cidade||!pais||!descricao){
        return res.status(400).json({
            msg_erro: 'Todos os dados são obrigatórios'
        });
    }

    const query = `
    INSERT INTO destino_turistico
    (cidade,pais,descricao)
    VALUES(?,?,?)
    `;

    bd.query(query,[cidade,pais,descricao],(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        res.status(201).json({
            id: resultado.insertId,
            cidade,
            pais,
            descricao
        });
    });
};

export const atualizarDestinoTuristico = (req,res)=>{
    const {id}=req.params;

    const{
        cidade,
        pais,
        descricao
    } = req.body;

    if(!cidade || !pais || !descricao){
        return res.status(400).json({
            msg_erro: 'Todos os dados são obrigatórios'
        });
    }

    const query = `
    UPDATE destino_turistico
    SET cidade = ?,
        pais = ?,
        descricao = ?
    WHERE id = ?
    `;

    bd.query(query,[cidade,pais,descricao,id],(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        if (resultado.affectedRows === 0){
        return res.status(404).json({
            msg_erro: `Ǹenhum destino encontrado com ID ${id}`
        });
    }

    res.json({
        mensagem: 'Destino removido com sucesso'
    }); 
    });
};

export const removerDestinoTuristico = (req,res)=>{
    const {id} = req.params;
    
    const query = 'DELETE FROM destino_turistico WHERE id = ?';

    bd.query(query,[id],(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        if (resultado.affectedRows === 0){
        return res.status(404).json({
            msg_erro: `Ǹenhum destino encontrado com ID ${id}`
        });
    }

    res.json({
        mensagem: 'Destino atualizado com sucesso'
    }); 
    });
};
