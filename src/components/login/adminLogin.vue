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




const errors = {
  username: ref(""),
  password: ref(""),
};

function validation() {
  let isValid = true;

  errors.username.value = "";
  errors.password.value = "";

  if (!username.value.trim()) {
    errors.username.value = "Vui lòng nhập Username";
    isValid = false;
  }

  if (!password.value.trim() || password.value.length < 6) {
    errors.password.value = "Mật khẩu ít nhất 6 ký tự";
    isValid = false;
  }

  return isValid;
}

async function handleLogin(){

  if(!validation()) return;

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
    
  }catch(err){
if (err.response && err.response.status === 401) {
        const data = err.response.data;
        error.value = `${data.error}: ${data.message}`;
    } else {
        error.value = 'Đã xảy ra lỗi, vui lòng thử lại';
    }
  }
}

</script>

<template>
   <div class="container-fluid">
    <div class="login-form">
      <form @submit.prevent="handleLogin">
        <h1>Đăng nhập</h1>

        <label for="username" class="label-input">Username:</label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Username"
        />
        <p v-if="errors.username.value" class="error-message">
          {{ errors.username.value }}
        </p>

        <label for="pw" class="label-input">Password:</label>
        <input
          id="pw"
          type="password"
          v-model="password"
          placeholder="Password"
        />
        <p v-if="errors.password.value" class="error-message">
          {{ errors.password.value }}
        </p>

        <p v-if="error" class="error-message">{{ error }}</p>

        
        <button type="submit">Login</button>
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

.label-input {
  padding-bottom: 10px;
}

.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/img/Background1.jpg");
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
  max-width: 400px;
  color: white;
  position: relative;
}

.login-form h1 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid rgb(227, 227, 227);
  outline: none;
  font-size: 1rem;
}

.error-message {
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 10px;
  text-decoration: underline;
}

.login-form input:hover {
  border-color: rgb(188, 23, 100);
}

.login-form input:hover::placeholder {
  color: red;
}

.remember {
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.remember input {
  margin-right: 7px;
  cursor: pointer;
}

.reg {
  margin-bottom: 7px;
}

.reg > .fordwardRegister {
  color: #143d60;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.1s;
}

.reg > .fordwardRegister:hover {
  color: rgb(250, 244, 205);
  border-bottom: 2px solid;
}


.login-form button {
  width: 40%;
  margin: 10px auto; 
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  color: rgb(108, 108, 108);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  text-align: center;
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