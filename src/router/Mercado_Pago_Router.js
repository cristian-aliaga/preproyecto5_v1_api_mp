const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN || "",
});

// **** Este código es para realizar prubas con POST ****
//
// Mercado_Pago.post("/", async (req, res) => {
//     const ArrayProductos = Object.entries(req.body);
// console.log("ArrayProductos", ArrayProductos)
// console.log(typeof ArrayProductos)
// const NuevoArray = ArrayProductos.map((e) => {
// return {
//     title: "Auto",
//     unit_price: 12990,
//     currency_id: "USD",
//     quantity: 1
// };
// });
// console.log(NuevoArray)
// try {
//     const preference = {
//         items: NuevoArray, //Objeto de productos mercado pago.
//         back_urls: {
//             success: "http://localhost:5173/", //Si gundiono bien la transacción redirecciona a esta URL.
//             failure: "http://localhost:3000/fallo", // Propiedad en caso que salga mal la compra.
//         },

//         auto_return: "approved",
//     };

//     const respuesta = await mercadopago.preferences.create(preference);
//     console.log(respuesta);
//     res.status(200).json(respuesta.response.init_point);
// } catch (error) {
//     console.error(error.message);
//     res.status(500).json(error.message);
// }
// });
// module.exports = Mercado_Pago;


Mercado_Pago.post("/", async (req, res) => {
    const producto = req.body;
    console.log(producto)
    try {
        const preference = {
            items: [
                {
                    title: producto.nombre,
                    unit_price: producto.precio,
                    currency_id: "CLP",
                    quantity: producto.cantidad,
                },
            ],

            back_urls: {
                success: "http://localhost:5173/",
                failure: "http://localhost:3000/fallo",
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