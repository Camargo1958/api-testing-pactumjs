require('dotenv').config()
const  { stash, spec, expect } = require('pactum')
const  { listarUsuarioPorId, listarUsuarios, listarTodosUsuarios }  = require('../../requests/user.request')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL
const { obtemDadosUsuario } = require('../../helpers/usuario.helper')
var assert = require('assert')

describe('Testes da API - Listar usuário cadastrados', () => {
    
    it('Validar a consulta de todos os usuário existentes #1', async () => {
        let response = await spec()
        .get(`${baseUrl}/usuarios`)
        .expectStatus(200)
        .expectBodyContains('nome')
        .expectBodyContains('email')
        .expectBodyContains('password')
        .expectBodyContains('_id')

        //console.log(response)
    });

    it('Validar a consulta de todos os usuário existentes #2', async () => {
        let response = await listarTodosUsuarios()

        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains('nome')
        expect(response).to.have.bodyContains('email')
        expect(response).to.have.bodyContains('password')
        expect(response).to.have.bodyContains('_id')
    });

    it('Validar a consulta de usuário existente #1', async () => {
        //let response = await listarUsuarioPorId(20)

        await spec()
        .get(`${baseUrl}/usuarios/3FL07BBLVyAZQJ54`)
        .expectStatus(200)
        .expectBodyContains('nome')
        .expectBodyContains('email')
        .expectBodyContains('password')
        .expectBodyContains('_id')
    });

    it('Validar a consulta de usuário existente #2', async () => {
        let response = await listarUsuarioPorId('3FL07BBLVyAZQJ54')

        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains('nome')
        expect(response).to.have.bodyContains('email')
        expect(response).to.have.bodyContains('password')
        expect(response).to.have.bodyContains('_id')
    });

    it('Validar a consulta de usuário existente #3', async () => {
        let usuario = await obtemDadosUsuario('api')
        let response = await listarUsuarioPorId('04hLOnBABEbj9Qik')

        expect(response).to.have.status(200)

        //console.log(response.body)
        //console.log(response.body._id)
        //console.log(usuario._id)

        assert.equal(response.body.nome, usuario.nome)
        assert.equal(response.body.email, usuario.email)
        assert.equal(response.body.password, usuario.password)
        assert.equal(response.body._id, usuario._id)
    });
})