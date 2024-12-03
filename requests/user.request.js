const { faker } = require('@faker-js/faker')
const  { spec } = require('pactum')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

function usuarioRandom() {
    return {
        "nome": `${faker.internet.userName()}${faker.number.int()}`,
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "administrador": "true"
    }    
}

async function cadastrarUsuario(overrides, removes) {
    return await spec()
        .post(`${baseUrl}/usuarios`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
            '@DATA:TEMPLATE@': 'User',
            '@OVERRIDES@': overrides,
            '@REMOVES@': [removes]
        });
}

async function alterarUsuario(id, overrides, removes) {
    return await spec()
        .put(`${baseUrl}/usuarios/${id}`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
            '@DATA:TEMPLATE@': 'User',
            '@OVERRIDES@': overrides,
            '@REMOVES@': [removes]
        });
}

async function excluirUsuario(id) {
    return await spec()
        .delete(`${baseUrl}/usuarios/${id}`)
        .withHeaders('Content-Type', 'application/json')
}

async function loginUsuario(overrides, removes) {
    return await spec()
        .post(`${baseUrl}/login`)
        .withHeaders('Content-Type', 'application/json')
        .withJson({
            '@DATA:TEMPLATE@': 'User',
            '@OVERRIDES@': overrides,
            '@REMOVES@': ["nome","administrador", removes]
        });
}

module.exports = { usuarioRandom, cadastrarUsuario, alterarUsuario, excluirUsuario, loginUsuario }