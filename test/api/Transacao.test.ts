import axios from "axios";
import { getAuthorizationHeader } from "../util/auth";
import transacoes from "../data/transacoes";

const baseUrl = process.env.API_URL;

test("Deve registrar um novo usuário se não existir", async () => {
  try {
    const headers = await getAuthorizationHeader();
    const resp = await axios.post(
      `${baseUrl}/transacao`,
      transacoes.semId,
      headers
    );
    expect(resp.status).toBe(200);
  } catch (err: any) {
    console.log(err.response.data);
    expect(err.response.status).toBe(400);
  }
});

test("Deve alterar uma transação por id", async () => {
  try {
    const headers = await getAuthorizationHeader();
    const resp = await axios.post(
      `${baseUrl}/transacao/610cace0-102f-4f3c-a8ba-6c8add3201c6`,
      { ...transacoes.semId, valor: -173.58 },
      headers
    );
    expect(resp.status).toBe(200);
  } catch (err: any) {
    console.log(err.response.data);
    expect(err.response.status).toBe(400);
  }
});

test("Deve popular com uma lista de transações", async () => {
  try {
    const headers = await getAuthorizationHeader();
    const respostas = transacoes.lista.map(async (transacao) => {
      const resp = await axios.post(`${baseUrl}/transacao`, transacao, headers);
      return resp.status;
    });

    const listaDeStatus = await Promise.all(respostas);
    expect(listaDeStatus.every((s) => s === 200)).toBe(true);
  } catch (err: any) {
    console.log(err.response.data);
    expect(err.response.status).toBe(400);
  }
});

test("Deve retornar o extrato mensal + saldo consolidado", async () => {
  try {
    const headers = await getAuthorizationHeader();
    const resp = await axios.get(`${baseUrl}/extrato/2024/4`, headers);
    console.log(resp.data);
    expect(resp.status).toBe(200);
    expect(resp.data).toHaveProperty("transacoes");
    expect(resp.data).toHaveProperty("saldo");
  } catch (err: any) {
    console.log(err.response.data);
    expect(err.response.status).toBe(400);
  }
});
