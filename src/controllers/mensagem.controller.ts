import mensagemModel from "../models/mensagem.model";
import { Request, Response } from "express";

class MensagemController {
    public async enviar(req: Request, res: Response): Promise<Response> {
        const mensagem =  await mensagemModel.create(
            {
                texto: req.body.texto,
                remetente: '',
                destinario: req.params.id
            }
        );
        return res.json(mensagem);
    }


}

export default new MensagemController();