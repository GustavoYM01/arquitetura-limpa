import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario";
import UsuarioEmMemoria from "../../test/fake/UsuarioEmMemoria";
import InverterSenha from "../../src/adapters/auth/InverterSenha";
import SenhaComEspaco from "../../src/adapters/auth/SenhaComEspaco";
import BcryptAdapter from "../../src/adapters/auth/BcryptAdapter";
import ColecaoUsuarioDB from "../../src/adapters/db/ColecaoUsuarioDB";
import usuarios from "../data/usuarios";

test("Deve registrar um usuário", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);
  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });
  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João");
  expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário invertendo a senha", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new InverterSenha();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);
  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });
  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João");
  expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuário com senha com espaços", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new SenhaComEspaco();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);
  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });
  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve registrar um usuário com senha criptografada", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);
  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João");
  expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy();
});

test.skip("Deve registrar um usuário no banco real", async () => {
  const colecao = new ColecaoUsuarioDB();
  const provedorCripto = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);
  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("João");
  expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy();
});

test("Deve lançar erro ao cadastrar usuário já cadastrado", async () => {
  const colecao = new ColecaoUsuarioDB();
  const provedorCripto = new BcryptAdapter();
  const casoDeUso = new RegistrarUsuario(colecao, provedorCripto);

  const nome = usuarios.completo.nome;
  const email = usuarios.completo.email;
  const senha = usuarios.completo.senha!;

  await casoDeUso.executar({ nome, email, senha });
  const exec = async () => await casoDeUso.executar({ nome, email, senha });

  await expect(exec).rejects.toThrow("Usuário já existe.");
});
