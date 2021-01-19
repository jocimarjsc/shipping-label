const api = require('../services/api');

module.exports = {
  async index(request, response) {
    const {id} = request.query
    const client = await api.get(`/clients/${id}`)
    if(client) {
      return response.status(200).json(client.data)
    }else {
      return response.status(404).json({error: 'Not found!'})
    }
  }
} 