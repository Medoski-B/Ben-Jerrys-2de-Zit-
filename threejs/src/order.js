let orderData = {

    flavor: "Vanille",

    topping: "Oreo",

    sauce: "Caramel",

    price: "0.00"

};




export function setOrderFlavor(flavor) {

    orderData.flavor =
        flavor;

}



export function setOrderTopping(topping) {

    orderData.topping =
        topping;

}



export function setOrderSauce(sauce) {

    orderData.sauce =
        sauce;

}



export function setOrderPrice(price) {

    orderData.price =
        price;

}




export function getOrder() {

    return orderData;

}




export async function sendOrder() {


    const response =
        await fetch(

            "https://benjerrys-backend.onrender.com/api/v1/orders",

            {

                method: "POST",


                headers: {

                    "Content-Type":
                        "application/json"

                },


                body:
                    JSON.stringify({

                        customer: {

                            name:
                                "3D Configurator",

                            address:
                                "Online",

                            email:
                                "customer@test.be"

                        },


                        iceCream: {

                            flavour:
                                orderData.flavor,


                            topping:
                                orderData.topping,


                            sauce:
                                orderData.sauce

                        },


                        price:
                            Number(orderData.price)


                    })

            }

        );



    if (!response.ok) {

        throw new Error(
            "Order versturen mislukt"
        );

    }



    const data =
        await response.json();



    console.log(
        "Order succesvol:",
        data
    );



    return data;


}
