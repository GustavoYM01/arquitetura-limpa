import { sign, verify } from "jsonwebtoken";
import ProvedorToken from "../../core/usuario/interfaces/ProvedorToken";

export default class JwtAdapter implements ProvedorToken {
  constructor(private segredo: string) {}

  gerar(payload: string | object): string {
    return sign(payload, this.segredo, { expiresIn: "1d" });
  }

  validar(token: string): string | object {
    return verify(token, this.segredo);
  }
}
