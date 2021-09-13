// modulos
import express, { Application } from 'express';
import morgan from 'morgan';
const pkg = require('../package.json');
// db
import './database/database'
// rutas
import indexRoute from './routes/index.routes';
import patentRoutes from './routes/patent.routes'



//  Esta es la clase del servidor, la cual guarda las configuraciones y define las rutas del mismo

export class Server{

    private app: Application;

    // Aqui carga la información del proyecto de la ruta /api

    public static Pkg : typeof pkg;

    // Defino las rutas del servidor
    private ApiPaths = {
        home: '/api',
        patents: '/'
    }

    //   En el constructor cargo las configuraciones y genera la api
    
    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.routes();
    }

    //  function settings: Configuraciones de la api

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.set('pkg', pkg);
        this.middlewares();
    }

    // funciotn routes : Rutas del servidor
    routes(){
        this.app.use(indexRoute);
        this.app.use(patentRoutes);

        Server.Pkg = this.app.get('pkg');
    }

    // función listen : obtiene el puerto y corre la api
    async listen(){
        await this.app.listen( this.app.get('port'));
        console.log('server on port ' + this.port);
    }

    // Middlewares
    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }
    
}