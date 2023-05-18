import { UsuarioInterface } from "./interface/usuario.interface";

declare global {
    namespace Express {
        interface Request {
            usuario: UsuarioInterface;
            usuarioChat: UsuarioInterface;
        }
    }
}