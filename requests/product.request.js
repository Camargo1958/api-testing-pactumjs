const { faker } = require('@faker-js/faker')
const  { spec } = require('pactum')
const baseUrl = process.env.PACTUM_REQUEST_BASE_URL

function produtoRandom() {
    return {
        "nome": `${faker.commerce.product()}${faker.number.int()}`,
        "preco": faker.commerce.price(),
        "descricao": faker.lorem.words(16),
        "quantidade": faker.number.int()
    }    
}

async function cadastrarProduto(token, overrides, removes) {
    return await spec()
        .post(`${baseUrl}/produtos`)
        .withHeaders({'Content-Type':'application/json', 'Authorization': token })
        .withJson({
            '@DATA:TEMPLATE@': 'Produto',
            '@OVERRIDES@': overrides,
            '@REMOVES@': [removes]
        });
}
module.exports = { produtoRandom, cadastrarProduto }