import axios from "axios";
import Usuario from "../../src/core/usuario/interfaces/Usuario";

const baseUrl = process.env.API_URL;

const usuario: Partial<Usuario> = {
  nome: "Maria da Silva",
  email: "mmaria@zmail.com",
  senha: "123456",
};

test.skip("Deve registrar um novo usuário se não existir", async () => {
  try {
    const resp = await axios.post(`${baseUrl}/registrar`, usuario);
    expect(resp.status).toBe(201);
  } catch (e: any) {
    expect(e.response.status).toBe(400);
    expect(e.response.data).toBe("Usuário já existe.");
  }
});

test.skip("Deve fazer o login com email e senha corretos", async () => {
  const resp = await axios.post(`${baseUrl}/login`, {
    email: usuario.email,
    senha: usuario.senha,
  });
  expect(resp.status).toBe(200);
  expect(resp.data.usuario.nome).toBe("Maria da Silva");
  expect(resp.data.usuario.email).toBe(usuario.email);
  console.log(resp.data.token);
  expect(resp.data).toHaveProperty("token");
});
