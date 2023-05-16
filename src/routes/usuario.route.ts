import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const UsuarioRoute = Router();

UsuarioRoute.post('/cadastro', UsuarioController.cadastrar);
UsuarioRoute.post('/login', UsuarioController.autenticar);

export default UsuarioRoute;