let iceCreamModel = null;
let scoopMesh = null;
let coneMesh = null;



const flavorColors = {
    Vanille: 0xffe0a8,
    Chocolate: 0x5a2d0c,
    Pistache: 0x82c45a
};



function cloneMaterial(mesh) {

    if (Array.isArray(mesh.material)) {

        mesh.material = mesh.material.map(
            (material) => material.clone()
        );

        return;
    }

    mesh.material = mesh.material.clone();
}



function setMeshColor(mesh, color) {

    const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];


    materials.forEach(
        (material) => {

            if (material.color) {

                material.color.setHex(color);
            }

            if (material.emissive) {

                material.emissive.setHex(0x000000);
            }

            material.needsUpdate = true;
        }
    );
}



export function setIceCreamModel(model) {

    iceCreamModel = model;

    scoopMesh = null;
    coneMesh = null;


    iceCreamModel.traverse(
        (child) => {

            if (!child.isMesh) {
                return;
            }

            cloneMaterial(child);

            const normalizedName =
                child.name.toLowerCase();


            console.log(
                "MODEL PART:",
                child.name
            );


            if (normalizedName === "icecream_1") {

                scoopMesh = child;
            }

            if (normalizedName === "icecream_1_1") {

                coneMesh = child;
            }
        }
    );


    if (!scoopMesh) {

        console.warn(
            "De ijsbol werd niet gevonden."
        );
    }

    if (!coneMesh) {

        console.warn(
            "Het hoorntje werd niet gevonden."
        );
    }
}



export function changeFlavor(flavor) {

    if (!iceCreamModel || !scoopMesh) {

        console.warn(
            "De ijsbol is nog niet beschikbaar."
        );

        return;
    }


    const color =
        flavorColors[flavor];


    if (color === undefined) {

        console.warn(
            "Onbekende smaak:",
            flavor
        );

        return;
    }


    setMeshColor(
        scoopMesh,
        color
    );


    console.log(
        "Flavor changed:",
        flavor
    );
}
