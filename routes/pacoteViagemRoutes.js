import { Router } from "express";

import{
    listarPacotes,
    buscarPacotePorId,
    cadastrarPacote,
    atualizarPacote,
    removerPacote
} from '../controllers/pacoteViagemController.js';

const router = Router();

router.get('/', listarPacotes);

router.get('/:id', buscarPacotePorId);

router.post('/', cadastrarPacote);

router.put('/:id', atualizarPacote);

router.delete('/:id', removerPacote);

export default router;