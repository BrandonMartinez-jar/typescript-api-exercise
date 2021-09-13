import dotenv from 'dotenv';
import { Server } from './server';

/* function main : crea un nuevo servidor ya sea en el puerto que se le indique como
en este caso el puerto 3000 o también con la variable de entorno definida por el servidor en el
que se despliegue esta api */

async function main() {
    dotenv.config();
    const server = new Server(3000);
    await server.listen();
}

main();