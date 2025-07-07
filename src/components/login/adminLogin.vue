<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { userStorage } from '../store/user'


const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const isLoading = ref(false);

const userStore = userStorage();

async function handleLogin(){
  if(isLoading.value) return;
  error.value = '';
  try{
    const resp = await axios.post(
      "/api/auth/login",
      {
        username: username.value,
        password: password.value
      },
      {
        headers: {
           'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    userStore.setUser(resp.data)
    router.push("/register")

  }catch(err){
if (err.response && err.response.status === 401) {
        const data = err.response.data;
        error.value = `${data.error}: ${data.message}`;
    } else {
        error.value = 'Đã xảy ra lỗi, vui lòng thử lại';
    }
  }
  finally {
        isLoading.value = false;
    }
}

</script>

<template>
  <div class="container">

    <div class="login-form">
    <form @submit.prevent="handleLogin()">
      <h1>Login</h1>
      <label for="username" class="label-input">Username: </label>
      <input type="text" placeholder="Username"  id="username" v-model="username" />
      <label for="pw" class="label-input">Password: </label>
      <input type="password" placeholder="Password" id="pw"  v-model="password"/>
      
    
      <button type="submit">Login</button>
      
      <div id="login-error">{{ error ? 'Login failed' : '' }}</div>
    </form>
    
  </div>
  </div>
    
  

</template>

<style scoped>
 * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
      
    }

    .label-input{
      padding-bottom: 10px;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh; 
        background-image: url('/img/Background1.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    .login-form {
      background: rgba(232, 123, 6, 0.8);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 450px;
      color: white;
      
    }

    .login-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .login-form input[type="text"],
    .login-form input[type="password"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 10px;
      border: 1px solid rgb(227, 227, 227);
      outline: none;
      font-size: 1rem;
    }

    .login-form input:hover {
      border-color: rgb(15, 96, 96);
    }

    .login-form button {
      display: block;
      margin: 20px auto 0; 
      width: 50%;
      margin-top: 15px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      background-color: rgb(255, 255, 255);
      color: rgb(108, 108, 108);
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-form button:hover {
      background-color: rgb(225, 140, 3);
      color: #fff;
    }

    @media (max-width: 500px) {
      .login-form {
        padding: 1rem;
      }
    }
    </style>