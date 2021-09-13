import { Router } from 'express';
import { getPatents, getPatent, postPatent } from '../business/patent';

const router = Router();

// Rutas de patentes

router.get('/patents', getPatents)  // Obtiene todas las patentes en la base de datos
.post('/patent', postPatent)        // Ingresa una nueva patente en la base de datos
.get('/patent/:id', getPatent);     // Obtiene la patente según su id

export default router;