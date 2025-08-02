<template>
     <div id="app" class="forgot-password-container">
    <div class="form-box">
      <h1>Quên mật khẩu</h1>

      <!-- Email input -->
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" placeholder="Nhập email" required>
      </div>

      <!-- OTP input -->
      <div v-if="showOtpBox">
        <label for="otp">Mã OTP:</label>
        <input v-model="otp" type="text" placeholder="Nhập mã OTP">
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <!-- <button class="btn exit" @click="exit">Exit</button> -->

        <template v-if="showOtpBox">
          <button class="btn resend" @click="resendOtp">Gửi lại OTP</button>
          <button class="btn confirm" @click="verifyOtp">Xác nhận OTP</button>
        </template>

        <button v-else class="btn confirm" @click="submit">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

    const email = ref('');
    const otp = ref('');
    const showOtpBox = ref(false);
    const router = useRouter();

    async function submit() {
        if(!email.value.trim()){
            alert('Vui lòng nhập email hợp lệ.');
            return;
        }

        try{
        await axios.post('http://localhost:8080/identity/auth/forgot-password', { email: email.value });
        showOtpBox.value = true;
        alert(`Đã gửi OTP đến ${email.value}`)
        return;
        }catch(err){
            alert('Lỗi gửi OTP !')
        }
        
    }

    async function resendOtp() {
        try {
             const resp = await axios.post('http://localhost:8080/identity/auth/forgot-password', { email: email.value });
            alert(`Đã gửi lại OTP đến ${email.value}`)
        } catch (error) {
            alert('Lỗi gửi OTP !')
        } 
    }

    async function verifyOtp(){
        if(!otp.value.trim()){
            alert('Vui lòng nhập mã OTP !')
            return;
        }

        try {
            const resp = await axios.post('http://localhost:8080/identity/auth/verify-otp', {otp: otp.value })
            router.push('/changePass')
        } catch (error) {
            alert('Mã OTP không đúng hoặc đã hết hạn !')
        }
    }

    function exit(){
        email.value = '';
        otp.value = '';
        showOtpBox.value = false;
    }
  </script>

  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .forgot-password-container {
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

    .form-box {
      background: rgba(232, 123, 6, 0.8);
      padding: 10px 40px;
      border-radius: 15px;
      width: 500px;
      color: white;
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