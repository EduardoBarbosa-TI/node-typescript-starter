
import express from 'express';
import cors  from 'cors';
import mongoose from 'mongoose';


export class App {
    private express: express.Application;
    private porta = 8000;

    constructor() {
        this.express = express();
        this.listen();
        this.middlewares();
        this.database();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen(): void {
        this.express.listen(this.porta, () => {
            console.log('Servidor iniciado na porta ' + this.porta);
        })
    }

    private async database(): Promise<void> {
        const username = 'edugh';
        const password = '06e08G12';
        
        try {
            const connectionString = `mongodb+srv://${username}:${password}@edudb.uqsau8h.mongodb.net/?retryWrites=true&w=majority`;
          await mongoose.connect(connectionString);
          console.log('Conexão com o banco de dados estabelecida com sucesso.');
        } catch (error) {
          console.error('Erro ao conectar-se ao banco de dados:', error);
        }
      }
    
}