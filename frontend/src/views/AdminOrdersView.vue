<script setup>

import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";



const router =
    useRouter();



const orders =
    ref([]);



const loading =
    ref(true);




async function fetchOrders(){


    const response =
        await fetch(
            "https://benjerrys-backend.onrender.com/api/v1/orders"
        );


    const data =
        await response.json();



    orders.value =
        data.data.orders;



    loading.value =
        false;


}




async function updateStatus(
    order
){


    await fetch(

        `https://benjerrys-backend.onrender.com/api/v1/orders/${order._id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":
                "application/json"

            },


            body:
            JSON.stringify({

                status:
                order.status

            })

        }

    );


}




async function deleteOrder(
    id
){


    await fetch(

        `https://benjerrys-backend.onrender.com/api/v1/orders/${id}`,

        {

            method:"DELETE"

        }

    );



    fetchOrders();


}




function openDetail(
    id
){

    router.push(
        `/admin/orders/${id}`
    );

}



onMounted(
    fetchOrders
);


</script>



<template>


<div class="container">


<h1>
Admin - Bestellingen
</h1>



<p v-if="loading">
Bestellingen laden...
</p>



<table v-else>


<thead>

<tr>

<th>
Klant
</th>


<th>
Prijs
</th>


<th>
Status
</th>


<th>
Acties
</th>

</tr>

</thead>



<tbody>


<tr
v-for="order in orders"
:key="order._id"
>



<td
@click="openDetail(order._id)"
class="clickable"
>

{{ 
order.customer.name 
}}

</td>



<td>

€

{{ 
order.price 
}}

</td>



<td>


<select
v-model="order.status"
@change="updateStatus(order)"
>


<option>
te verwerken
</option>


<option>
verzonden
</option>


<option>
geannuleerd
</option>


</select>


</td>



<td>


<button
@click="deleteOrder(order._id)"
>

Verwijderen

</button>


</td>



</tr>



</tbody>



</table>



</div>


</template>



<style scoped>


.container{

padding:40px;

}



table{

width:100%;

border-collapse:collapse;

}



th,
td{

padding:15px;

border-bottom:
1px solid #ddd;

text-align:left;

}



.clickable{

cursor:pointer;

color:#2e7d32;

}



button{

background:#d32f2f;

color:white;

border:none;

padding:8px 12px;

cursor:pointer;

}



select{

padding:5px;

}


</style>
