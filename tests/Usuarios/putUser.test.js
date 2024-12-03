require('dotenv').config()
const  { expect, stash, spec } = require('pactum')
const  { usuarioRandom, cadastrarUsuario, alterarUsuario }  = require('../../requests/user.request')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

describe('Testes da API - PUT/Usuarios - Alterar cadastro de usuário', () => {
  let response

  before(async() => {
    stash.addDataTemplate({'User': usuarioRandom()})
    response = await cadastrarUsuario()
  })    

  it('Validar a alteração de registro do usuário com sucesso', async  () => {
    response = await alterarUsuario(response.body._id)

    expect(response).to.have.status(200)
    expect(response).to.have.jsonLike({message: 'Registro alterado com sucesso'})
  });

  it('Validar o cadastro campo nome vazio', async () => {
    response = await alterarUsuario(response.body._id,{ "nome": ""})

    expect(response).to.have.status(400)
    expect(response).to.have.bodyContains('nome')
    expect(response).to.have.bodyContains('nome não pode ficar em branco')
});

it('Validar a tipagem do campo nome', async () => {
  response = await alterarUsuario(response.body._id,{ "nome": true})

  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('nome')
  expect(response).to.have.bodyContains('nome deve ser uma string')
});

it('Validar a obrigatóriedade do campo nome', async () => {
  response = await alterarUsuario(response.body._id,{ "email": "qa@qa.com"}, "nome")

  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('nome')
  expect(response).to.have.bodyContains('nome é obrigatório')
});

it('Validar o cadastro campo email vazio', async () => {
  response = await alterarUsuario(response.body._id,{ "email": ""})

  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('email')
  expect(response).to.have.bodyContains('email não pode ficar em branco')
});

it('Validar a tipagem do campo email', async () => {
  response = await alterarUsuario(response.body._id, {"email": true})
             
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('email')
  expect(response).to.have.bodyContains('email deve ser uma string')
});

it('Validar a obrigatóriedade do campo email', async () => {
  response = await alterarUsuario(response.body._id,{ "email": "qa@qa.com"}, "email")
  
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('email')
  expect(response).to.have.bodyContains('email é obrigatório')
});

it('Validar o cadastro campo password vazio', async () => {
  response = await alterarUsuario(response.body._id,{ "password": ""})
              
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('password')
  expect(response).to.have.bodyContains('password não pode ficar em branco')
});
    
it('Validar a tipagem do campo password', async () => {
  response = await alterarUsuario(response.body._id,{ "password": true})
           
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('password')
  expect(response).to.have.bodyContains('password deve ser uma string')
});
    
it('Validar a obrigatóriedade do campo password', async () => {
  response = await alterarUsuario(response.body._id,{ "email": "qa@qa.com"}, "password")

  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('password')
  expect(response).to.have.bodyContains('password é obrigatório')
});

it('Validar o cadastro campo administrador vazio', async () => {
  response = await alterarUsuario(response.body._id,{ "administrador": ""})
         
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('administrador')
  expect(response).to.have.bodyContains("administrador deve ser 'true' ou 'false'")
});

it('Validar a tipagem do campo administrador', async () => {
  response = await alterarUsuario(response.body._id,{ "administrador": 5})
  
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('administrador')
  expect(response).to.have.bodyContains("administrador deve ser 'true' ou 'false'")
});

it('Validar a obrigatóriedade do campo administrador', async () => {
  response = await alterarUsuario(response.body._id,{ "email": "qa@qa.com"}, "administrador")
        
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('administrador')
  expect(response).to.have.bodyContains('administrador é obrigatório')
});

it('Validar o método inexistente', async () => {
    response = await spec()
    .patch(`${baseUrl}/usuarios/` + response.body._id)
    .withHeaders('Content-Type', 'application/json')
    .withJson({ '@DATA:TEMPLATE@': 'User' })
        
    expect(response).to.have.status(405)
    expect(response).to.have.bodyContains('message')
    expect(response).to.have.bodyContains('Não é possível realizar PATCH')
});

it('Validar o Content-Type inválido', async () => {
    response = await spec()
  .put(`${baseUrl}/usuarios/` + response.body._id)
    .withHeaders('Content-Type', 'text/plain')
    .withJson({ '@DATA:TEMPLATE@': 'User'})
        
    expect(response).to.have.status(415)
});

it('Validar a alteração do e-mail', async () => {
  response = await alterarUsuario(response.body._id,{ "email": "beltrano@qa.com.br"})
        
  expect(response).to.have.status(400)
  expect(response).to.have.bodyContains('message')
  expect(response).to.have.bodyContains('Este email já está sendo usado')        
});
});
