import ProvedorCriptografia from "../../core/usuario/interfaces/ProvedorCriptografia";

export default class InverterSenha implements ProvedorCriptografia {
  criptografar(senha: string) {
    return senha.split("").reverse().join("");
  }
  comparar(senha: string, senhaCriptografada: string): boolean {
    return this.criptografar(senha) === senhaCriptografada;
  }
}
