require('dotenv').config()
const  { expect, stash } = require('pactum')
const  { usuarioRandom, cadastrarUsuario, excluirUsuario, loginUsuario }  = require('../../requests/user.request')
const  { cadastrarProduto }  = require('../../requests/product.request')

describe('Testes da API - DELETE/Usuarios - Excluir cadastro de usuário', () => {
    let response

    before(async() => {
        stash.addDataTemplate({'User': usuarioRandom()})
        response = await cadastrarUsuario()
    })    

    it('Validar a exclusão de cadastro com sucesso', async () => {
        response = await excluirUsuario(response.body._id)

        expect(response).to.have.status(200)
        expect(response).to.have.bodyContains("Registro excluído com sucesso")

    });

    it('Validar a exclusão de cadastro inexistente', async () => {
        response = await excluirUsuario(1234654)

       expect(response).to.have.status(200)
       expect(response).to.have.bodyContains("Nenhum registro excluído")

    });

    it('Validar a exclusão de cadastro com carrinho cadastrado', async () => {
        await cadastrarUsuario()
        responselogin = await loginUsuario()
        token = responselogin.json.authorization

        responseProduto = await cadastrarProduto(token)
        response = await excluirUsuario(response.body._id)

       expect(response).to.have.status(400)
       expect(response).to.have.bodyContains("Não é permitido excluir usuário com carrinho cadastrado")
    });
});
