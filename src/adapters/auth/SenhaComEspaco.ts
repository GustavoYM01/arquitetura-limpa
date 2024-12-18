import ProvedorCriptografia from "../../core/usuario/interfaces/ProvedorCriptografia";

export default class SenhaComEspaco implements ProvedorCriptografia {
  criptografar(senha: string): string {
    return senha.split("").join(" ");
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    return this.criptografar(senha) === senhaCriptografada;
  }
}
