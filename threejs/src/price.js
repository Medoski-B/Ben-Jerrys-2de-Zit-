const prices = {

    flavor: {

        Vanille: 3.50,

        Chocolate: 3.50,

        Pistache: 4.00

    },


    topping: {

        Oreo: 0.50,

        Sprinkles: 0.30,

        Uranium: 99.99

    },


    sauce: {

        Caramel: 0.40,

        Chocolate: 0.50,

        Barbeque: 0.60

    }

};



let currentFlavor = "Vanille";

let currentTopping = "Oreo";

let currentSauce = "Caramel";




export function setFlavor(
    flavor
) {

    currentFlavor =
        flavor;

}



export function setTopping(
    topping
) {

    currentTopping =
        topping;

}



export function setSauce(
    sauce
) {

    currentSauce =
        sauce;

}




export function getPrice() {

    return (

        prices.flavor[currentFlavor]

        +

        prices.topping[currentTopping]

        +

        prices.sauce[currentSauce]

    ).toFixed(2);

}
