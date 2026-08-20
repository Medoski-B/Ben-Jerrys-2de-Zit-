import * as THREE from "three";

import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js";


import {
    setIceCreamModel,
    changeFlavor
} from "./configurator.js";


import {
    setToppingTarget,
    createTopping
} from "./toppings.js";


import {
    setSauceTarget,
    createSauce
} from "./sauce.js";


import {
    setFlavor,
    setTopping,
    setSauce,
    getPrice
} from "./price.js";


import {
    setOrderFlavor,
    setOrderTopping,
    setOrderSauce,
    setOrderPrice,
    sendOrder
} from "./order.js";


import "./style.css";



const flavorSelector =
    document.getElementById(
        "flavor"
    );


const toppingSelector =
    document.getElementById(
        "topping"
    );


const sauceSelector =
    document.getElementById(
        "sauce"
    );


const priceElement =
    document.getElementById(
        "price"
    );


const orderButton =
    document.getElementById(
        "orderButton"
    );


const message =
    document.getElementById(
        "message"
    );




function updatePrice() {


    const price =
        getPrice();



    if (priceElement) {

        priceElement.innerHTML =
            price;

    }


    setOrderPrice(
        price
    );

}




const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x707070
    );




const camera =
    new THREE.PerspectiveCamera(

        45,

        window.innerWidth /
        window.innerHeight,

        0.1,

        1000

    );




const renderer =
    new THREE.WebGLRenderer({

        antialias: true

    });



renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFShadowMap;


document.body.appendChild(
    renderer.domElement
);




const light =
    new THREE.DirectionalLight(
        0xffffff,
        4
    );


light.position.set(
    5,
    6,
    5
);


light.castShadow =
    true;


scene.add(
    light
);



const ambient =
    new THREE.AmbientLight(
        0xffffff,
        1.2
    );


scene.add(
    ambient
);




const floor =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            20,
            20
        ),

        new THREE.MeshStandardMaterial({

            color: 0x505050

        })

    );


floor.rotation.x =
    -Math.PI / 2;


floor.position.y =
    -1.5;


floor.receiveShadow =
    true;


scene.add(
    floor
);




const loader =
    new GLTFLoader();


let iceCreamModel = null;

let toppingGroup = null;

let sauceGroup = null;



loader.load(

    "/models/icecream.glb",


    (gltf) => {


        iceCreamModel =
            gltf.scene;



        iceCreamModel.scale.set(

            3,

            3,

            3

        );



        iceCreamModel.traverse(

            (child) => {


                if (child.isMesh) {

                    child.castShadow = true;

                    child.receiveShadow = true;

                }


            }

        );



        scene.add(
            iceCreamModel
        );



        setIceCreamModel(
            iceCreamModel
        );




        toppingGroup =
            new THREE.Group();


        toppingGroup.name =
            "Toppings";


        iceCreamModel.add(
            toppingGroup
        );


        setToppingTarget(

            iceCreamModel,

            toppingGroup

        );




        sauceGroup =
            new THREE.Group();


        sauceGroup.name =
            "Sauce";


        iceCreamModel.add(
            sauceGroup
        );


        setSauceTarget(

            iceCreamModel,

            sauceGroup

        );




        const box =
            new THREE.Box3()
                .setFromObject(
                    iceCreamModel
                );



        const center =
            box.getCenter(
                new THREE.Vector3()
            );



        const size =
            box.getSize(
                new THREE.Vector3()
            );



        const distance =
            Math.max(
                size.x,
                size.y,
                size.z
            )
            /
            Math.tan(
                THREE.MathUtils.degToRad(
                    camera.fov / 2
                )
            );



        camera.position.set(

            center.x + 2,

            center.y + 1,

            distance * 0.8

        );


        camera.lookAt(
            center
        );




        createTopping(
            toppingSelector.value
        );


        createSauce(
            sauceSelector.value
        );



        setFlavor(
            flavorSelector.value
        );


        setTopping(
            toppingSelector.value
        );


        setSauce(
            sauceSelector.value
        );



        setOrderFlavor(
            flavorSelector.value
        );


        setOrderTopping(
            toppingSelector.value
        );


        setOrderSauce(
            sauceSelector.value
        );



        updatePrice();


        console.log(
            "Configurator ready"
        );


    }

);





flavorSelector.addEventListener(

    "change",

    (event) => {


        const value =
            event.target.value;



        changeFlavor(
            value
        );


        setFlavor(
            value
        );


        setOrderFlavor(
            value
        );


        updatePrice();


    }

);



toppingSelector.addEventListener(

    "change",

    (event) => {


        const value =
            event.target.value;



        createTopping(
            value
        );


        setTopping(
            value
        );


        setOrderTopping(
            value
        );


        updatePrice();


    }

);



sauceSelector.addEventListener(

    "change",

    (event) => {


        const value =
            event.target.value;



        createSauce(
            value
        );


        setSauce(
            value
        );


        setOrderSauce(
            value
        );


        updatePrice();


    }

);




if (orderButton) {


    orderButton.addEventListener(

        "click",

        async () => {


            try {


                const response =
                    await sendOrder();



                if (message) {


                    message.innerHTML =

                        `

                    <h3>
                    Bedankt voor je bestelling! 🍦
                    </h3>


                    <p>
                    Je ijsje wordt klaargemaakt.
                    </p>


                    <p>

                    Ordernummer:

                    <br>


                   <strong>

                    ${
                    response.data?.orderId
                    ||
                    response.data?.order?._id
                    ||
                    "verwerkt"
                    }

                    </strong>


                    </p>


                    `;


                }



            }


            catch (error) {


                console.error(
                    error
                );


                if (message) {


                    message.innerHTML =

                        `
                    Er ging iets fout.
                    Probeer opnieuw.
                    `;


                }


            }



        }

    );


}



function animate() {


    requestAnimationFrame(
        animate
    );


    if (iceCreamModel) {


        iceCreamModel.rotation.y +=
            0.002;


    }



    renderer.render(
        scene,
        camera
    );

}



animate();




window.addEventListener(

    "resize",

    () => {


        camera.aspect =
            window.innerWidth /
            window.innerHeight;



        camera.updateProjectionMatrix();



        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );


    }

);
