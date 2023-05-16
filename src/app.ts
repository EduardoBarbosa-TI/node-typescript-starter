import express from 'express';
import cors  from 'cors';
import mongoose from 'mongoose';

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
        mongoose.connect('mongodb+srv://eduardobb:d8**t%40pJWXj3E-e@edudb.uqsau8h.mongodb.net/?retryWrites=true&w=majority');
    }
}