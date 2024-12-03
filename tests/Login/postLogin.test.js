require('dotenv').config()
const  { expect, stash, spec } = require('pactum')
const  { usuarioRandom, cadastrarUsuario, loginUsuario }  = require('../../requests/user.request')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

describe('Testes da API - POST/login - Realizar login', () => {
  let response

  beforeEach(() => {
    stash.addDataTemplate({'User': usuarioRandom()}) 
  });

  it('Validar login com sucesso', async  () => {
    await cadastrarUsuario()
    response = await loginUsuario()

    expect(response).to.have.status(200)
    expect(response).to.have.bodyContains('Login realizado com sucesso')
    expect(response).to.have.bodyContains('authorization')
  });

  it('Validar login com email inexistente', async  () => {
    await cadastrarUsuario()
    response = await loginUsuario({ "email": "fulano@qualquercoisa.com" })
  
    expect(response).to.have.status(401)
    expect(response).to.have.bodyContains('Email e/ou senha inválidos')
  });

  it('Validar login com senha invalido', async  () => {
    await cadastrarUsuario()
    response = await loginUsuario({ "password": "4785" })
    
    expect(response).to.have.status(401)
    expect(response).to.have.bodyContains('Email e/ou senha inválidos')
  });

  it('Validar metódo inexistente', async  () => {
    response = await spec()
    .put(`${baseUrl}/login`)
    .withHeaders('Content-Type', 'application/json', 'Accept', 'application/json')
    .withJson({ '@DATA:TEMPLATE@': 'User', '@REMOVES@':["administrador","nome"] })
   
    expect(response).to.have.status(405)
    expect(response).to.have.bodyContains('Não é possível realizar PUT em /login')
  });
  
  it('Validar o Content-Type inválido', async  () => {
    response = await spec()
    .post(`${baseUrl}/login`)
    .withHeaders('Content-Type', 'text/plain')
    .withJson({ '@DATA:TEMPLATE@': 'User', '@REMOVES@':["administrador","nome"], })

    expect(response).to.have.status(415)
  });
});
