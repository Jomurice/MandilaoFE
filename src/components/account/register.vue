<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const username = ref("");
const password = ref("");
const fullname = ref("");
const phone = ref("");
const dob = ref("");
const email = ref("");


const errors = reactive({
  username: "",
  password: "",
  fullname: "",
  phone: "",
  dob: "",
  email: "",
});
const router = useRouter();


const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/;
const regexCheckerSpace = " ";

function convertPhone(phoneInput) {
  const trimmed = phoneInput.trim();
  return trimmed.startsWith("0") ? "+84" + trimmed.slice(1) : trimmed;
}


function validation() {
  let isValid = true;

  
  errors.fullname = "";
  errors.email = "";
  errors.username = "";
  errors.phone = "";
  errors.password = "";
  errors.dob = "";



  if (!fullname.value.trim()) {
    errors.fullname = "Vui lòng nhập họ tên";
    isValid = false;
  }

  if (!email.value.trim() || !regexEmail.test(email.value.trim())) {
    errors.email = "Vui lòng nhập Email hợp lệ";
    isValid = false;
  }

  if (!username.value.trim() || username.value.match(regexCheckerSpace)) {

    errors.username = "Username không dược có khoảng cách";
    // errors.username = "Vui lòng nhập Username hợp lệ";
    isValid = false;
  }


  if (!phone.value.trim() || !regexPhone.test(phone.value.trim())) {
    errors.phone = "Số điện thoại không hợp lệ";
    isValid = false;
  }

  if (!password.value.trim() || password.value.length < 4 || password.value.match(regexCheckerSpace)) {
    errors.password = "Mật khẩu ít nhất 4 ký tự";
    isValid = false;
  }

  if (!dob.value) {
    errors.dob = "Vui lòng chọn ngày sinh";
    isValid = false;
  }

  return isValid;
}


async function handleRegister() {
  if (!validation()) return;

  const convertPhoneData = convertPhone(phone.value);

  try {
    const resp = await axios.post(
      "http://localhost:8080/identity/users",
      {
        username: username.value,
        fullName: fullname.value,
        phone: convertPhoneData,
        dob: dob.value,
        email: email.value,
        password: password.value
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    router.push("/login");
    console.log("Đăng ký thành công:", resp.data);
  } catch (e) {
    console.log("Lỗi đăng ký:", e);
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="register-form">
      <form @submit.prevent="handleRegister()">
        <h2>Đăng ký</h2>

        <div class="input-group">
          <label>Họ tên:</label>
          <input v-model="fullname" type="text" placeholder="Fullname" />
          <span v-if="errors.fullname" class="error-message">{{ errors.fullname }}</span>
        </div>

        <div class="input-group">
          <label>Username:</label>
          <input v-model="username" type="text" placeholder="Username" />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>

        <div class="input-group">
          <label>Email:</label>
          <input v-model="email" type="text" placeholder="Email" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="input-group">
          <label>Mật khẩu:</label>
          <input v-model="password" type="password" placeholder="Password" />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="input-group">
          <label>SĐT:</label>
          <input v-model="phone" type="text" placeholder="SĐT" />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>

        <div class="input-group">
          <label>Ngày sinh:</label>
          <input v-model="dob" type="date" />
          <span v-if="errors.dob" class="error-message">{{ errors.dob }}</span>
        </div>

        <button type="submit">Đăng ký</button>
      </form>
    </div>  
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: Arial, Helvetica, sans-serif;
}

.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background-image: url("/img/Background1.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: auto;

}

.register-form {
  background: rgba(232, 123, 6, 0.85);
  padding: 2rem;

  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 380px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
margin-left: 1rem;
margin-right: 1rem;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position:relative;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border-radius: 10px;
 
  border: 1px solid gray;
  outline: none;
  font-size: 1rem;

  width: 100%;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid gray;
  outline: none;
  font-size: 1rem;
}

.input-group .error-message {
  font-size: 0.85rem;
  margin-bottom:5px ;
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
}

.register-form button {
  width: 100%;
  padding: 10px;
  margin-top: 7px ;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.register-form button:hover {
  background-color: rgb(225, 140, 3);
  color: #fff;
}


@media (max-width: 480px) {
  .register-form {
    padding: 1rem;
    max-width: 100%;
    font-size: 0.95rem;
  }

  .input-group input {
    font-size: 0.9rem;
  }

  .register-form button {
    font-size: 0.95rem;
    padding: 0.75rem;
  }
}
</style>

