require('dotenv').config();
const generatePdf = require('../utils/generatePdf');

const api = require('../services/api');

module.exports = {
    async index(request, response) {
        const { pedido } = request.body

        const order = await api.get(`/orders/${pedido}`);

        const client = order.data.order.tipo_cadastro === 'b2c' 
            ? await api.get(`/clients/${order.data.order.id_cliente}`)
            : await api.get(`/companies/${order.data.order.id_cliente}`)

        const data = {
            pedido: {
                enviado: order.data.order.envio,
                codigoPedido: order.data.order.codigo
            },
            client: client.data.client ? {
                id: client.data.client.id,
                tipo_cadastro: order.data.order.tipo_cadastro === 'b2c' ? 'fisica' : null,
                nome: client.data.client.nome,
                cpf: client.data.client.cpf,
                email: client.data.client.email,
                celular: client.data.client.celular
            } : {
                    id: client.data.company.id,
                    tipo_cadastro: order.data.order.tipo_cadastro,
                    razao: client.data.company.razaosocial,
                    fantasia: client.data.company.nomefantasia,
                    responsavel: client.data.company.nome_responsavel,
                    cnpj: client.data.company.cnpj,
                    email: client.data.company.email,
                    telefone: client.data.company.telefone,
                    celular: client.data.company.celular
                },
            entrega: client.data.client ? {
                cep: client.data.client.cep,
                endereco: client.data.client.endereco,
                numero: client.data.client.numero,
                bairro: client.data.client.bairro,
                cidade: client.data.client.cidade,
                estado: client.data.client.estado,
                complemento: client.data.client.complemento
            } : {
                cep: client.data.company.cep,
                endereco: client.data.company.endereco,
                numero: client.data.company.numero,
                bairro: client.data.company.bairro,
                cidade: client.data.company.cidade,
                estado: client.data.company.estado,
                complemento: client.data.company.complemento
            }
        };

        return response.status(200).json(data)      

    }
}