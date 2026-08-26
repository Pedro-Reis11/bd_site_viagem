import { Router } from "express";

import{
    listarClientes,
    buscarClientePorId,
    cadastrarCliente,
    atualizarCliente,
    removerCliente
} from '../controllers/clienteController.js';

const router = Router();

router.get('/', listarClientes);

router.get('/:id', buscarClientePorId);

router.post('/', cadastrarCliente);

router.put('/:id', atualizarCliente);

router.delete('/:id', removerCliente);

export default router;