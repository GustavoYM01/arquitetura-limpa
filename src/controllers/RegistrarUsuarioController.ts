import { Express } from "express";
import Registrar from "../core/usuario/RegistrarUsuario";
export default class RegistrarUsuarioController {
  constructor(private servidor: Express, private casoDeUso: Registrar) {
    servidor.post("/registrar", async (req, res) => {
      try {
        await casoDeUso.executar({
          nome: req.body?.nome,
          email: req.body?.email,
          senha: req.body?.senha,
        });
        res.status(201).send();
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    });
  }
}
