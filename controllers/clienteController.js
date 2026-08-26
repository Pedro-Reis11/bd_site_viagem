import bd from '../bd.js';

export const listarClientes = (req,res)=>{
    bd.query('SELECT * FROM cliente',(erro,resultado)=>{
        if(erro){
            return res.status(500).json({
                msg_erro:erro.message
            });
        }

        res.json(resultado);
    });
};

export const buscarClientePorId = (req,res)=>{
    const {id} = req.params;

    const query = `
    SELECT id,nome,email,telefone,cpf
    FROM cliente
    WHERE id = ?
    `;

    bd.query(query,[id],(erro,resultado)=>{
       if(erro) {
            return res.status(500).json({
                msg_erro: erro.message
            });
        }

        if(resultado.length === 0){
            return res.status(404).json({
                msg_erro: `Ǹenhum cliente encontrado com id ${id}`
            });
        }

        res.json(resultado[0]); 
    });
};

export const cadastrarCliente = (req,res)=>{
    const {
        nome,
        email,
        telefone,
        cpf
    } = req.body;

    if(!nome||!email||!telefone||!cpf){
       return res.status(400).json({
            msg_erro: 'Todos os campos são obrigatórios!'
        }); 
    }

    const query = `
    INSERT INTO cliente
    (nome,email,telefone,cpf)
    VALUES(?,?,?,?)
    `;

    bd.query(query,[nome,email,telefone,cpf],(erro,resultado)=>{
        if (erro) {
        return res.status(500).json({
          msg_erro: erro.message
        });
    }

    res.status(201).json({
        id: resultado.insertId,
        nome,
        email,
        telefone,
        cpf
    });
    });
};

export const atualizarCliente = (req,res)=>{
    const {id} = req.params;

    const {
        nome,
        email,
        telefone,
        cpf
    } = req.body;

    if(!nome || !email || !telefone || !cpf){
        return res.status(400).json({
            msg_erro: 'Todos os campos são obrigatórios!'
        });
    }

    const query = `
    UPDATE cliente
    SET nome = ?,
        email = ?,
        telefone = ?,
        cpf = ?
    WHERE id = ?
    `;

    bd.query(query,[nome,email,telefone,cpf,id],(erro,resultado)=>{
       if (erro) {
        return res.status(500).json({
          msg_erro: erro.message
        });
    }

    if (resultado.affectedRows === 0){
        return res.status(404).json({
            msg_erro: `Ǹenhum cliente encontrado com ID ${id}`
        });
    }

    res.json({
        mensagem: 'Cliente atualizado com sucesso'
    }); 
    });
};

export const removerCliente = (req,res)=>{
    const {id} = req.params;

    const query = 'DELETE FROM cliente WHERE id = ?';

    bd.query(query,[id],(erro,resultado)=>{
      if (erro) {
      return res.status(500).json({
        msg_erro: erro.message
      });
    }

    if (resultado.affectedRows === 0){
        return res.status(404).json({
            msg_erro: `Ǹenhum cliente encontrado com ID ${id}`
        });
    }

    res.json({
        mensagem: 'Cliente removido com sucesso'
    });     
    });
};
