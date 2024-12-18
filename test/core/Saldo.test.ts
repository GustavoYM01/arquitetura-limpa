import Saldo from "./../../src/core/transacao/Saldo";
import transacoes from "../data/transacoes";

const lista = [
  { ...transacoes.semId, valor: 5000 },
  { ...transacoes.semId, valor: -300 },
  { ...transacoes.semId, valor: -700 },
  { ...transacoes.semId, valor: -1500 },
];

test("Deve calcular o total das transações", () => {
  expect(new Saldo(lista).total).toBe(2500);
});

test("Deve calcular o total de receitas", () => {
  expect(new Saldo(lista).receitas).toBe(5000);
});

test("Deve calcular o total de desepesas", () => {
  expect(new Saldo(lista).despesas).toBe(2500);
});
