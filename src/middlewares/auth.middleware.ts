import { NextFunction,Request, Response } from "express";
import jwt from 'jsonwebtoken';
import usuarioModel from "../models/usuario.model";
import { UsuarioInterface } from "../interfaces/usuario.interface";


class AuthMiddleware {
    public async autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const token = req.query.token || req.headers['x-access-token'];
        
        if(!token) {
            return res.status(401).send({ message: 'Acesso Restrito!' });
        }
        try{
            const usuarioToken = jwt.verify(token as string , 'SECRET') as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);

            if (!usuario){
                return res.status(400).send({ message : 'Usuário inexistente!'});
            }

            req.usuario = usuario;
            
            return next(); 
        } catch (error) {
                return res.status(401).send({ message: 'Token Inválido' });
        }
    }

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const {id} = req.params
        try{
           
            const usuario = await usuarioModel.findById(id);
            
            if (!usuario){

                return res.status(400).send({ message : 'Usuário inexistente!'});
            }

            req.usuario = usuario;

            // return res.status(200).send({ message: "Mensagem enviada com sucesso !" }); 
            return next();

        } catch (error) {
                return res.status(401).send({ message: 'Usuário Inválido' });
        }
    }
    
}

export default new AuthMiddleware();