import Transacao from "../../src/core/transacao/Transacao";

const transacaoRef = {
  descricao: "Conta de luz",
  valor: -100,
  vencimento: new Date("2024-04-23"),
  idUsuario: "bf75fe05-e178-495e-b08a-f57c0ec67d54",
} as Transacao;

export default {
  semId: transacaoRef,
  lista: [
    { ...transacaoRef, valor: 5000, descricao: "Salário" },
    { ...transacaoRef, valor: -450, descricao: "Conta de luz" },
    { ...transacaoRef, valor: -100, descricao: "Conta de água" },
    { ...transacaoRef, valor: -250, descricao: "Conta de telefone" },
  ],
};
