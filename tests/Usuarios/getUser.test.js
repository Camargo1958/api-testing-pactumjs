require('dotenv').config()
const  { stash, spec } = require('pactum')
const  { usuarioRandom, cadastrarUsuario }  = require('../../requests/user.request')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

describe('Testes da API - GET /Usuários/{id} - Listar usuário cadastrados', () => {
    let response
    stash.addDataTemplate({'User': usuarioRandom()})
    
    it('Validar a consulta de usuário existente', async () => {
        response = await cadastrarUsuario()

        await spec()
        .get(`${baseUrl}/usuarios/${response.body._id}`)
        .expectStatus(200)
        .expectBodyContains('nome')
        .expectBodyContains('email')
        .expectBodyContains('password')
        .expectBodyContains('administrador')
        .expectBodyContains('_id')
    });
    
    it('Validar a consulta de id inexistente', async () => {
        await spec()
        .get(`${baseUrl}/usuarios?_id=fwegz4aSGnxpz`)
        .expectStatus(200)
        .expectJsonLike({'quantidade': 0})
        .expectJsonLike({'usuarios': []})
    });

    it('Validar o metódo inexistente na API', async () => {
        await spec()
        .patch(`${baseUrl}/usuarios?_id=${response.body._id}`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({ '@DATA:TEMPLATE@': 'User' })
        .expectStatus(405)
    });
});