const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {
    const producto = req.body;
    console.log(producto)
    console.log(producto.title)
    console.log(producto.unit_price)
    console.log(producto.quantity)
    console.log(producto.currency_id)
    try {
        const preference = {
            items: [
                {
                    title: producto.title,
                    unit_price: producto.unit_price,
                    currency_id: "CLP",
                    quantity: producto.quantity,
                },
            ],

            back_urls: {
                success: "https://cristian-aliaga.github.io/preproyecto5_v1/",
                failure: "https://cristian-aliaga.github.io/preproyecto5_v1/",
            },

            auto_return: "approved",
        };

        const respuesta = await mercadopago.preferences.create(preference);
        console.log(respuesta);
        res.status(200).json(respuesta.response.init_point);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

module.exports = Mercado_Pago;