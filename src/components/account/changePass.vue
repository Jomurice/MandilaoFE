<template>
    <div class="container-fluid">
    <div class="form-box">
      <h1>Đổi mật khẩu mới</h1>
      <div>
        <label for="password">New Password:</label>
        <div>
          <input v-model="newPass" type="password" placeholder="Nhập new password  ">
          <p v-if="passerror" style="color:white">{{ passerror }}</p>
        </div>

        <label for="otp">Comfirm Password:</label>
        <input v-model="confirmPass" type="password" placeholder="Nhập Comfirm Password ">
        <p v-if="passerror2" style="color:white">{{ passerror2 }}</p>
      </div>

      <div class="button-group">
        <button class="btn confirm" @click="submit">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

  const newPass = ref("");
  const confirmPass = ref("");
  const router = useRouter();
  const passerror = ref("");
  const passerror2 = ref("");
  const email = ref("");


    async function submit() {

        if(!newPass.value.trim()){
            passerror.value = "Mật khẩu không được để trống !"
            return;
         }

        if(newPass.value.length < 6){
            passerror.value = "Mật khẩu không được ít hơn 6 ký tự !"
            return;
         }

        if(confirmPass.value != newPass.value){
            passerror2.value = "Mật khẩu comfirm phải giống mật khẩu mới !"
            return;
         }
        
         email.value = localStorage.getItem("email");
        try{
        await axios.post('http://localhost:8080/identity/auth/change-Pass-new', 
        { newPass: newPass.value,confirmPass:confirmPass.value, email: email.value });
        router.push('/login')
        }catch(err){
            console.log(err)
            alert('Lỗi đổi mật khẩu !')
        }   
    }

  </script>

  <style scoped>
  
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .container-fluid {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 91  vh;
      padding: 1rem;
      background-image: url("/img/Background1.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

      .form-box {
        background: rgba(232, 123, 6, 0.8);
        padding: 10px 40px;
        border-radius: 15px;
        width: 500px;
        color: white;
        display: flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        
      }

    h1 {
      text-align: center;
      margin-top: 4px;
      margin-bottom: 30px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 20px;
      border-radius: 20px;
      border: none;
      font-size: 16px;
      outline: none;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      border: none;
    }

    .exit {
      background-color: white;
      color: orange;
    }

    .confirm {
      background-color: white;
      color: green;
    }

    .resend {
      background-color: white;
      color: blue;
    }
  </style>