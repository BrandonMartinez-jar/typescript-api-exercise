import { Router } from 'express';
import { Request, Response } from 'express';
import { Server } from '../server';

const router = Router();

// Ruta index donde carga la información del proyecto desde el Package.json

router.get(('/api'), (req: Request, res:Response) => {
    res.json({
      name: Server.Pkg.name,
      author: Server.Pkg.author,
      description: Server.Pkg.description,
      version: Server.Pkg.version 
    });
});

export default router;