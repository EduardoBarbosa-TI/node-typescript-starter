import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";
import mensagemController from "./mensagem.controller";
import mensagemModel from "../models/mensagem.model";

class UsuarioController {
    public async cadastrar(req: Request,res: Response): Promise<Response>{
        const usuario = await usuarioModel.create(req.body);
        const resposta = {
            message: 'Usuário cadastrado com sucesso!',
            _id: usuario._id,
            nome: usuario.nome
        }
        return res.json(resposta);
    }

    public async autenticar(req: Request, res: Response): Promise<Response> {
        const { nome, senha} = req.body;
        
        const usuario = await usuarioModel.findOne({ nome });
        if(!usuario) {
            return res.status(400).send({ message: 'Usuário não encontrado!' });
        }

        const senhaValida = await usuario.compararSenhas(senha);
        if(!senhaValida) {
            return res.status(400).send({ message: 'Senha incorreta !' });
        }

        return res.json({
            usuario: usuario,
            token: usuario.gerarToken()
        });
    }

    public getById(req: Request, res: Response): Response {
        
        return res.json(req.usuarioChat);
    }

    public async listar(req: Request, res:Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;
        
        const usuarios = await usuarioModel.find({ _id: { $ne:idUsuarioLogado }});

        const usuariosMensagens = await Promise.all(
            usuarios.map( usuario =>{
             return mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
                .sort('-createdAt')
                .limit(1)
                .then(mensagens => {
                    return {
                      _id: usuario._id,
                      nome: usuario.nome,
                      avatar: usuario.avatar,
                      ultimaMensagem: mensagens[0] ? mensagens[0].texto : null,
                      dataUltimaMensagem: mensagens[0] ? mensagens[0].createdAt : null
                }
            });
        }));
        
        const mensagensOrdenadas = usuariosMensagens.sort((a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1) 
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem)
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem);
        });

        return res.json(usuariosMensagens);
    }

    

}

export default new UsuarioController();