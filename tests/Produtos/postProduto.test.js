require('dotenv').config()
const  { expect, stash, spec } = require('pactum')
const  { produtoRandom, cadastrarProduto }  = require('../../requests/product.request')
const  { usuarioRandom, cadastrarUsuario, loginUsuario } = require('../../requests/user.request');
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

describe('Testes da API - POST/Produtos - Cadastrar produto', () => {
  let response, token

  beforeEach(() => {
    stash.addDataTemplate({'User': usuarioRandom()})
    stash.addDataTemplate({'Produto': produtoRandom()})    
  });

  it('Validar o cadastro de produto com sucesso', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token)

    expect(response).to.have.status(201)
    expect(response).to.have.bodyContains('Cadastro realizado com sucesso')
    expect(response).to.have.bodyContains('_id')
  });
  
  it('Validar o cadastro de produto com o campo nome vazio', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'nome': ''})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('nome não pode ficar em branco')
  });

  it('Validar a tipagem do campo nome ', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'nome': true})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('nome deve ser uma string')
  });

  it('Validar a obrigatoriedade do campo nome ', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'descricao': "Computador"}, 'nome')

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('nome é obrigatório')
  });

  it('Validar o cadastro de produto com o campo preço vazio', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'preço': ""})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('preço não é permitido')
  });

  it('Validar a tipagem do campo preço', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'preco': 7.50})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('preco deve ser um inteiro')
  });
  
  it('Validar a obrigatoriedade do campo preço ', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'descricao': "Computador"}, 'preco')

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('preco é obrigatório')
  });

  it('Validar o cadastro de produto com o campo descrição vazio', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'descricao': ""})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('descricao não pode ficar em branco')
  });

  it('Validar a tipagem do campo descrição', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'descricao': 7.50})
    
    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('descricao deve ser uma string')
  });
  
  it('Validar a obrigatoriedade do campo descrição', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'preco': 7.50}, 'descricao')

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('descricao é obrigatório')
  });

  it('Validar o cadastro de produto com o campo quantidade vazio', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'quantidade': ""})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('quantidade deve ser um número')
  });

  it('Validar a tipagem do campo quantidade', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'quantidade': '7.50'})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('quantidade deve ser um inteiro')
  });
  
  it('Validar a obrigatoriedade do campo quantidade', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, {'preco': 7.50}, 'quantidade')

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('quantidade é obrigatório')
  });

  it('Validar o de cadastro de produto já cadastrado', async  () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization

    response = await cadastrarProduto(token, { 'nome': 'computador'})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('Já existe produto com esse nome')
  });

  it('Validar o cadastro de produto com token inválido', async  () => {
    response = await cadastrarProduto(1236447)

    expect(response).to.have.status(401)
    expect(response).to.have.bodyContains('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
  });

  it('Validar o cadastro de produto com token vazio', async  () => {
    response = await cadastrarProduto(" ")

    expect(response).to.have.status(401)
    expect(response).to.have.bodyContains('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
  });

  it('Validar o cadastro de produto com token expirado', async  () => {
    response = await cadastrarProduto("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkZlbGljaXRhLlJvYmVsMzdAeWFob28uY29tIiwicGFzc3dvcmQiOiJrSXh0UXdORGJNaTkweU4iLCJpYXQiOjE3MTkxNDk0MjIsImV4cCI6MTcxOTE1MDAyMn0.EC3QUedUg2T2ktv0YLjMsJOzuHu1pGg6oZDjhZLYwdU")

    expect(response).to.have.status(401)
    expect(response).to.have.bodyContains('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
  });

  it('Validar a permissão acesso para de cadastro de produto', async  () => {
    await cadastrarUsuario({'administrador': "false"})

    responselogin = await loginUsuario()
    token = responselogin.json.authorization
    
    response = await cadastrarProduto(token)

    expect(response).to.have.status(403)
    expect(response).to.have.bodyContains('Rota exclusiva para administradores')
  });
  
  it('Validar o Content-Type inválido', async () => {
    await cadastrarUsuario()
    responselogin = await loginUsuario()
    token = responselogin.json.authorization
    
    response = await spec()
      .post(`${baseUrl}/produtos`)
      .withHeaders({'Content-Type':'text/plain', 'Authorization': token })
      .withJson({'@DATA:TEMPLATE@': 'Produto'})
        
    expect(response).to.have.status(415)
  })
});
