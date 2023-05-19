import MensagemModel from "../models/mensagem.model";
import { Request, Response } from "express";


class MensagemController {
    public async enviar(req: Request, res: Response): Promise<Response> {
        
        const mensagem =  await MensagemModel.create(
            {
                texto: req.body.texto,
                remetente: req.usuario,
                destinatario: req.usuarioChat
            }
        );
        
        return res.json(mensagem);
    }

    public async listar(req:Request, res:Response): Promise<Response>{
        const idUsuarioLogado  = req.usuario._id;
        const idUsuarioChat = req.params.id;

        const query = MensagemModel.buscaChat(idUsuarioLogado, idUsuarioChat);
        const mensagens = await query.sort('createdAt').exec();
        const mensagensChat = mensagens.map(mensagem => {
            return {
                texto: mensagem.texto,
                createdAt: mensagem.createdAt,
                isRemetente: mensagem.remetente == String(idUsuarioLogado)
            }
        })
        return res.json(mensagensChat);
    }
}

export default new MensagemController();