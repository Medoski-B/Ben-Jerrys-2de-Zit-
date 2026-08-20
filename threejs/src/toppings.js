import * as THREE from "three";


let toppingGroup = null;
let scoopMesh = null;




export function setToppingTarget(
    model,
    group
) {

    toppingGroup = group;


    model.traverse(
        (child) => {


            if (
                child.isMesh &&
                child.name.toLowerCase()
                === "icecream_1"
            ) {

                scoopMesh = child;


                console.log(
                    "Scoop gevonden:",
                    child.name
                );

            }


        }
    );

}




function clearToppings() {


    if (!toppingGroup) {

        return;

    }



    while (
        toppingGroup.children.length > 0
    ) {


        toppingGroup.remove(
            toppingGroup.children[0]
        );


    }

}




function getScoopTopLocalPosition() {


    const box =
        new THREE.Box3()
            .setFromObject(
                scoopMesh
            );



    const worldTop =
        new THREE.Vector3();



    box.getCenter(
        worldTop
    );


    worldTop.y =
        box.max.y;



    const localPosition =
        toppingGroup.worldToLocal(
            worldTop
        );



    return localPosition;

}




function createOreo() {


    const group =
        new THREE.Group();



    const top =
        getScoopTopLocalPosition();



    const positions = [

        [-0.05, -0.03],
        [-0.02, 0.03],
        [0.03, -0.02],
        [0.05, 0.03],
        [0, 0.06]

    ];



    positions.forEach(
        (pos) => {


            const cookie =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.018,

                        0.018,

                        0.030,

                        24

                    ),


                    new THREE.MeshStandardMaterial({

                        color: 0x2b1b12,

                        roughness: 0.9

                    })

                );



            cookie.rotation.x =
                Math.PI / 4;



            cookie.rotation.z =
                Math.random()
                *
                Math.PI;



            cookie.position.set(

                top.x + pos[0],

                top.y - 0.015,

                top.z + pos[1]

            );



            cookie.castShadow = true;



            group.add(
                cookie
            );


        }

    );



    return group;

}




function createSprinkles() {


    const group =
        new THREE.Group();



    const top =
        getScoopTopLocalPosition();



    const colors = [

        0xff3b30,

        0xffcc00,

        0x34c759,

        0x007aff,

        0xaf52de,

        0xff2d55

    ];



    for (
        let i = 0;
        i < 30;
        i++
    ) {


        const sprinkle =
            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.005,

                    0.035,

                    0.007

                ),


                new THREE.MeshStandardMaterial({

                    color:
                        colors[
                        i % colors.length
                        ],

                    roughness: 0.6

                })

            );



        sprinkle.position.set(

            top.x +
            (Math.random() - 0.5)
            * 0.14,


            top.y - 0.025,


            top.z +
            (Math.random() - 0.5)
            * 0.14

        );



        sprinkle.rotation.set(

            Math.random()
            *
            Math.PI,


            Math.random()
            *
            Math.PI,


            Math.random()
            *
            Math.PI

        );



        sprinkle.castShadow = true;



        group.add(
            sprinkle
        );


    }



    return group;

}




function createUranium() {


    const group =
        new THREE.Group();



    const top =
        getScoopTopLocalPosition();



    const uranium =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.035,

                32,

                32

            ),


            new THREE.MeshStandardMaterial({

                color: 0x39ff14,

                emissive: 0x39ff14,

                emissiveIntensity: 5,

                roughness: 0.3

            })

        );



    uranium.position.set(

        top.x,

        top.y - 0.01,

        top.z

    );



    uranium.castShadow = true;



    group.add(
        uranium
    );



    return group;

}




export function createTopping(
    type
) {


    clearToppings();



    let topping = null;



    if (type === "Oreo") {


        topping =
            createOreo();


    }



    if (type === "Sprinkles") {


        topping =
            createSprinkles();


    }



    if (type === "Uranium") {


        topping =
            createUranium();


    }



    if (topping) {


        toppingGroup.add(
            topping
        );


    }



    console.log(
        "Topping created:",
        type
    );


}
