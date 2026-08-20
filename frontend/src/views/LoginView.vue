<script setup>

import { ref } from "vue";

import { useRouter } from "vue-router";



const router =
    useRouter();



const username =
    ref("");

const password =
    ref("");

const error =
    ref("");





function login(){


    if(
        username.value === "admin"
        &&
        password.value === "admin123"
    ){


        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );


        router.push(
            "/admin/orders"
        );


    }

    else {


        error.value =
            "Ongeldige login";


    }


}


</script>



<template>


<div class="login-container">


    <div class="login-card">


        <h1>
            Ben & Jerry's
            <br>
            Admin
        </h1>



        <input

            v-model="username"

            placeholder="Gebruikersnaam"

        />



        <input

            v-model="password"

            type="password"

            placeholder="Wachtwoord"

        />



        <button
            @click="login"
        >

            Login

        </button>



        <p
            v-if="error"
            class="error"
        >

            {{ error }}

        </p>


    </div>


</div>


</template>



<style scoped>


.login-container{


    height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    background:#f4f4f4;


}



.login-card{


    width:320px;

    padding:30px;

    background:white;

    border-radius:15px;

    box-shadow:
    0 10px 30px rgba(0,0,0,0.15);


    display:flex;

    flex-direction:column;

    gap:15px;


}



h1{

    text-align:center;

}



input{


    padding:12px;

    border-radius:8px;

    border:1px solid #ccc;


}



button{


    padding:12px;

    border:none;

    border-radius:8px;

    background:#4caf50;

    color:white;

    cursor:pointer;


}



button:hover{


    opacity:0.85;


}



.error{


    color:red;

    text-align:center;


}


</style>
