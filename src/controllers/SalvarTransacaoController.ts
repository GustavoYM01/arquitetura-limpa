import { Express, Request, Response } from "express";
import SalvarTransacao from "../core/transacao/SalvarTransacao";
export default class SalvarTransacaoController {
  constructor(
    private servidor: Express,
    private casoDeUso: SalvarTransacao,
    ...middleware: any[]
  ) {
    const fn = async (req: Request, res: Response) => {
      try {
        const transacao = {
          descricao: req.body.descricao,
          valor: +req.body.valor,
          vencimento: new Date(),
          idUsuario: req.body.idUsuario,
        };
        await casoDeUso.executar({
          transacao: transacao,
          id: req.params.id,
          usuario: (req as any).usuario,
        });
        res.status(200).send();
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    };
    servidor.post("/transacao", middleware, fn);
    servidor.post("/transacao/:id", middleware, fn);
  }
}
