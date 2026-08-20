<script setup>

import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";


const route =
    useRoute();



const order =
    ref(null);



const loading =
    ref(true);




async function fetchOrder(){


    const response =
        await fetch(

            `https://benjerrys-backend.onrender.com/api/v1/orders/${route.params.id}`

        );


    const data =
        await response.json();



    order.value =
        data.data.order;



    loading.value =
        false;

}



onMounted(
    fetchOrder
);


</script>



<template>


<div class="page">


<h1>
Bestelling details 🍦
</h1>



<p v-if="loading">

Bestelling laden...

</p>



<div
v-if="order"
class="card"
>


<h2>
Klant
</h2>


<p>

<strong>
Naam:
</strong>

{{ order.customer.name }}

</p>



<p>

<strong>
Adres:
</strong>

{{ order.customer.address }}

</p>



<p>

<strong>
Email:
</strong>

{{ order.customer.email }}

</p>



<hr>



<h2>
IJsje
</h2>



<p>

<strong>
Smaak:
</strong>

{{ order.iceCream.flavour }}

</p>



<p>

<strong>
Topping:
</strong>

{{ order.iceCream.topping }}

</p>



<p>

<strong>
Saus:
</strong>

{{ order.iceCream.sauce }}

</p>



<hr>



<h2>
Totaalprijs
</h2>



<p class="price">

€

{{ order.price }}

</p>



<hr>



<h2>
Status
</h2>


<p>

{{ order.status }}

</p>



</div>


</div>


</template>



<style scoped>


.page{

padding:40px;

}



.card{

background:white;

max-width:500px;

padding:30px;

border-radius:15px;

box-shadow:
0 5px 20px rgba(0,0,0,0.15);

}



h1{

margin-bottom:30px;

}



h2{

margin-top:20px;

}



.price{

font-size:24px;

font-weight:bold;

}



hr{

margin:25px 0;

}


</style>
