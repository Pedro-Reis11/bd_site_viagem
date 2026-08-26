import { Router } from "express";

import{
    listarDestinosTuristicos,
    listarDestinosTuristicosPorId,
    cadastrarDestinoTuristico,
    atualizarDestinoTuristico,
    removerDestinoTuristico
} from '../controllers/destinoTuristicoController.js';

const router = Router();

router.get('/', listarDestinosTuristicos);

router.get('/:id', listarDestinosTuristicosPorId);

router.post('/', cadastrarDestinoTuristico);

router.put('/:id', atualizarDestinoTuristico);

router.delete('/:id', removerDestinoTuristico);

export default router;