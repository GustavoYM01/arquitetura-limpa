import { compareSync, genSaltSync, hashSync } from "bcrypt";
import ProvedorCriptografia from "../../core/usuario/interfaces/ProvedorCriptografia";

export default class BcryptAdapter implements ProvedorCriptografia {
  criptografar(senha: string): string {
    return hashSync(senha, genSaltSync(10));
  }
  comparar(senha: string, senhaCriptografada: string): boolean {
    return compareSync(senha, senhaCriptografada);
  }
}
