const { api } = require("../services/api");

module.exports = {
    async authenticate(request, response, next) {
        const authenticate = {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            code: process.env.CODE
        };

        const {data: { access_token }} = await api.post("/auth", authenticate);

        request.access_token = access_token;

        return next()
    }
}