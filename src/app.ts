import express from 'express';
import cors  from 'cors';
import mongoose , { ConnectOptions }from 'mongoose';

export class App {
    private express: express.Application;
    private porta = 8000;

    constructor() {
        this.express = express();
        this.listen();
        this.database();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log('Servidor iniciado na porta ' + this.porta);
        })
    }

    private database(): void {
        const mongooseConfig: ConnectOptions = {
    
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };

        mongoose.connect('mongodb+srv://eduardobb:d8**t%40pJWXj3E@edudb.uqsau8h.mongodb.net/', mongooseConfig)
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
        })
        .catch((error) => {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        });
        
    }
    
}