import dotenv from "dotenv";

dotenv.config();
import express from "express";
import ColecaoUsuarioDB from "./adapters/db/ColecaoUsuarioDB";
import BcryptAdapter from "./adapters/auth/BcryptAdapter";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import Registrar from "./core/usuario/RegistrarUsuario";
import LoginUsuario from "./core/usuario/LoginUsuario";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import JwtAdapter from "./adapters/auth/JwtAdapter";
import SalvarTransacao from "./core/transacao/SalvarTransacao";
import SalvarTransacaoController from "./controllers/SalvarTransacaoController";
import UsuarioMiddleware from "./controllers/UsuarioMiddleware";
import ColecaoTransacaoDB from "./adapters/db/ColecaoTransacaoDB";
import ExtratoMensal from "./core/transacao/ExtratoMensal";
import ExtratoMensalController from "./controllers/ExtratoMensalController";

const porta = process.env.PORTA ?? 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, () => {
  console.log(`🚀 Servidor rodando na porta ${porta}`);
});

// ------------------------------------------- Rotas abertas
const colecaoUsuario = new ColecaoUsuarioDB();
const provedorCripto = new BcryptAdapter();
const provedorToken = new JwtAdapter(process.env.JWT_SECRET!);

const registrarUsuario = new Registrar(colecaoUsuario, provedorCripto);
const loginUsuario = new LoginUsuario(
  colecaoUsuario,
  provedorCripto,
  provedorToken
);

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);

// ------------------------------------------- Rotas autenticadas
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken);

const colecaoTransacao = new ColecaoTransacaoDB();
const salvarTransacao = new SalvarTransacao(colecaoTransacao);
const extratoMensal = new ExtratoMensal(colecaoTransacao);

new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware);
new ExtratoMensalController(app, extratoMensal, usuarioMiddleware);
