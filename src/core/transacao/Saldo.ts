import Transacao from "./Transacao";

export interface SaldoDTO {
  total: number;
  receitas: number;
  despesas: number;
}

export default class Saldo {
  constructor(private transacoes: Transacao[]) {}

  get dto() {
    return {
      total: this.total,
      receitas: this.receitas,
      despesas: this.despesas,
    };
  }

  get total() {
    return this.transacoes.reduce(this._totalizar, 0);
  }

  get receitas() {
    return this.transacoes
      .filter((t) => t.valor > 0)
      .reduce(this._totalizar, 0);
  }

  get despesas() {
    return Math.abs(
      this.transacoes.filter((t) => t.valor < 0).reduce(this._totalizar, 0)
    );
  }

  private _totalizar(total: number, transacao: Transacao) {
    return total + +transacao.valor;
  }
}
