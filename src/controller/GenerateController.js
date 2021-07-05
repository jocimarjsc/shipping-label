const {api} = require('../services/api');

module.exports = {
    async index(request, response) {
        const { pedido: id } = request.body
        const access_token = request.access_token;

        const {data: { Order }} = await api.get(`/orders/${id}/complete?access_token=${access_token}`);

        console.log(Order.Customer.CustomerAddresses[0].CustomerAddress.neighborhood);
        
        const data = {
            pedido: {
                enviado: Order.shipment,
                codigoPedido: Order.id
            },
            client: {
                id: Order.Customer.id,
                nome: Order.Customer.name,
                cpf: Order.Customer.cpf,
                email: Order.Customer.email,
                celular: Order.Customer.cellphone
            },
            entrega: {
                cep: Order.Customer.CustomerAddresses[0].CustomerAddress.zip_code,
                endereco: Order.Customer.CustomerAddresses[0].CustomerAddress.address,
                numero: Order.Customer.CustomerAddresses[0].CustomerAddress.number,
                bairro: Order.Customer.CustomerAddresses[0].CustomerAddress.neighborhood,
                cidade: Order.Customer.CustomerAddresses[0].CustomerAddress.city,
                estado: Order.Customer.CustomerAddresses[0].CustomerAddress.state,
                complemento: Order.Customer.CustomerAddresses[0].CustomerAddress.complement
            }
        };

        return response.status(200).json(data)      

    }
}