const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');

module.exports = {
    async generate(dados, orderId, response) {
        await renderPdf.generateSinglePdf('./src/template/fisica.ejs', path.resolve(__dirname, '..', '..', `public/${orderId}.pdf`));
        await ejs.renderFile(dados.client.tipo_cadastro === 'fisica' ? './src/template/fisica.ejs' : './src/template/juridica.ejs', dados, (err, res) => {
            if (err) {
                console.log(err);
                return response.status(400).json({ error: 'Erro ao rederizar html!' })
            } else {
                pdf.create(res).toFile(path.resolve(__dirname, '..', '..', `public/${orderId}.pdf`), (e, r) => {
                    if (e) {
                        console.log(e);
                        return response.status(400).json({ error: 'Erro ao gerar PDF!' })
                    } else {
                        return response.status(201).json(dados);
                    }
                })
            }
        })
    }
}