import * as THREE from "three";


let sauceGroup = null;
let scoopMesh = null;




export function setSauceTarget(
    model,
    group
) {

    sauceGroup = group;


    model.traverse(
        (child) => {


            if (
                child.isMesh &&
                child.name.toLowerCase()
                === "icecream_1"
            ) {

                scoopMesh = child;

                console.log(
                    "Sauce target:",
                    child.name
                );

            }

        }
    );

}




function clearSauce() {


    while (
        sauceGroup.children.length
    ) {

        sauceGroup.remove(
            sauceGroup.children[0]
        );

    }

}




function createSauceOverlay(color) {


    const sauce =
        scoopMesh.clone();



    sauce.material =
        scoopMesh.material.clone();



    sauce.material.color.setHex(
        color
    );


    sauce.material.roughness =
        0.35;




    sauce.scale.set(

        1,

        1,

        1

    );




    sauce.position.y +=
        0.001;



    sauce.castShadow = true;



    return sauce;

}




function createCaramel() {

    return createSauceOverlay(
        0xc98232
    );

}


function createChocolate() {

    return createSauceOverlay(
        0x2b1208
    );

}


function createBarbeque() {

    return createSauceOverlay(
        0xb51f1f
    );

}




export function createSauce(type) {


    clearSauce();



    let sauce = null;



    if (type === "Caramel") {

        sauce =
            createCaramel();

    }


    if (type === "Chocolate") {

        sauce =
            createChocolate();

    }


    if (type === "Barbeque") {

        sauce =
            createBarbeque();

    }



    if (sauce) {

        sauceGroup.add(
            sauce
        );

    }



    console.log(
        "Sauce created:",
        type
    );

}
