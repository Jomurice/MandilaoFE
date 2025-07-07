<script setup>
 import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    const username = ref('')
    const password = ref('')
    const fullname = ref('')
    const email = ref('')
    const err = ref(null)
    const router = useRouter();

    async function handleRegister(){
        try{
            const resp = await axios.post("/api/auth/register",
                {
                    username: username.value,
                    fullName: fullname.value,
                    email : email.value,
                    password : password.value
                },
                {
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    withCredentials: true
                }
            );
            router.push("/login")
            console.log("Dữ liệu đăng ký " + resp.data);
            
        }catch(e){  
            console.log("Lỗi ở phần đăng ký tài khoản" + e);
        }
    }

</script>
<template>
    <div class="container">
  <div class="register-form">
    <form @submit.prevent="handleRegister()">
      <h1>Đăng ký</h1>
      <label for="">Username: </label>
      <input type="text" placeholder="Username"  v-model="username"/>
      <label for="">Email: </label>
      <input type="text" placeholder="Email"  v-model="email"/>
      <label for="">Password: </label>
      <input type="text" placeholder="Password" v-model="password"/>
      <label for="">SDT:</label>
      <input type="text" placeholder="SDT" />
      <label for="">Ngày sinh: </label>
      <input type="date" placeholder="DATE" id="date-input">
      <button type="submit">Đăng ký</button>
    </form>
  </div>
</div>
</template>

<style>

  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html {
      font-family: Arial, Helvetica, sans-serif;
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

    .register-form {
     background: rgba(232, 123, 6, 0.8);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 400px;
      color: white;
    }

    .register-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .register-form input[type="text"],
    .register-form input[type="password"]{
      width: 100%;
      padding: 10px;
      margin-bottom: 18px;
      border-radius: 10px;
      border: 1px solid gray;
      outline: none;
      font-size: 1rem;
    }
    #date-input{
      margin-bottom: 20px;
      width: 100%;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 1rem;
      background-color: #fdfdfd;
      color: #333;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      appearance: none; 
      position: relative;
      
    }

    .register-form input:hover {
      border-color: rgb(15, 96, 96);
    }

   

    .register-form button {
        display: block;
      margin: 20px auto 0; 
       width: 40%;
      
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

    .register-form button:hover {
       background-color: rgb(225, 140, 3);
        color: #fff;
    }

    @media (max-width: 500px) {
      .login-form {
        padding: 1rem;
      }
    }
</style>