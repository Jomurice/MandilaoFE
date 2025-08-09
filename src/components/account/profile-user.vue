<template>
    <div class="profile-bg">
        <img src="./img/Background1.jpg" alt="Hotpot background" class="bg-img" />
        <div class="profile-container">
            <h1 class="profile-title">Hồ sơ</h1>
            
            <div class="profile-content">
                <!-- Form thông tin người dùng -->
                <div class="profile-info">
                    <div class="info-row">
                        <span class="info-label">Username:</span>
                        <input class="info-value" v-model="form.name" />
                    </div>
                    <div class="info-row">
                        <span class="info-label">Password:</span>
                        <button class="btn-change-password" @click="showChangePassword = true">Đổi mật khẩu</button>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Số điện thoại:</span>
                        <input class="info-value" v-model="form.phone" />
                    </div>
                    <div class="info-row">
                        <span class="info-label">Sinh nhật:</span>
                        <input class="info-value" type="date" v-model="form.birthday" />
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <input class="info-value" v-model="form.email" />
                    </div>
                </div>

                <!-- Avatar người dùng -->
                <div class="profile-avatar">
                    <img :src="form.avatar" alt="Avatar" class="avatar-img" />
                </div>
            </div>

            <div class="profile-actions">
                <button type="button" @click="router.back()" class="btn-exit">Thoát</button>
                <button type="button" @click="updateProfile" class="btn-update">Cập nhật</button>
            </div>
        </div>

        <!-- Modal Change Password -->
        <div v-if="showChangePassword" class="modal-overlay">
            <div class="modal-container">
                <h2 class="modal-title">Change password</h2>
                <form @submit.prevent="submitChangePassword">
                    <div class="modal-row">
                        <label class="modal-label">Mật khẩu cũ:</label>
                        <input type="password" v-model="changePasswordForm.oldPassword" class="modal-input" required />
                    </div>
                    <div class="modal-row">
                        <label class="modal-label">Mật khẩu mới:</label>
                        <input type="password" v-model="changePasswordForm.newPassword" class="modal-input" required />
                    </div>
                    <div class="modal-row">
                        <label class="modal-label">Xác nhận mật khẩu:</label>
                        <input type="password" v-model="changePasswordForm.confirmPassword" class="modal-input" required />
                    </div>
                    <div class="modal-actions">
                        <button type="button" @click="showChangePassword = false" class="btn-exit">Thoát</button>
                        <button type="submit" class="btn-update">Cập nhật</button>
                    </div>
                    <div v-if="changePasswordError" class="modal-error">{{ changePasswordError }}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

const userStore = useUserStore()
const form = ref({
    name: '',
    password: '',
    phone: '',
    birthday: '',
    email: '',
    avatar: ''
})
const err = ref(null)
const router = useRouter()

// Modal state
const showChangePassword = ref(false)
const changePasswordForm = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})
const changePasswordError = ref('')

// Lấy thông tin user khi component mount
onMounted(()=>{
    console.log(userStore.token)
    console.log("user o header ne " + userStore.user)
    getProfile();
    userStore.loadFromStorage();
})
    async function getProfile(){
        try{
            const resp = await axios.get("http://localhost:8080/identity/users/my-info",{
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            })
            console.log(resp.data.result);
            // userStore.setUser(resp.data);
        }catch(e){
            err.value ="Lấy thông tin thất bại"
        }
    }

async function updateProfile() {
    try {
        await axios.put('/api/user/profile', {
            name: form.value.name,
            phone: form.value.phone,
            birthday: form.value.birthday,
            email: form.value.email,
            avatar: form.value.avatar
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        alert('Cập nhật thông tin thành công!')
    } catch (e) {
        err.value = 'Cập nhật thông tin thất bại.'
        console.log(e)
    }
}

function formatBirthday(date) {
    if (!date) return '??/??/????'
    const d = new Date(date)
    return d.toLocaleDateString('vi-VN')
}

async function submitChangePassword() {
    changePasswordError.value = ''
    if (changePasswordForm.value.newPassword !== changePasswordForm.value.confirmPassword) {
        changePasswordError.value = 'Mật khẩu xác nhận không khớp.'
        return
    }
    try {
        await axios.post('/api/user/change-password', {
            oldPassword: changePasswordForm.value.oldPassword,
            newPassword: changePasswordForm.value.newPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        alert('Đổi mật khẩu thành công!')
        showChangePassword.value = false
        changePasswordForm.value.oldPassword = ''
        changePasswordForm.value.newPassword = ''
        changePasswordForm.value.confirmPassword = ''
    } catch (e) {
        changePasswordError.value = e.response?.data?.message || 'Đổi mật khẩu thất bại.'
        console.log(e)
    }
}
</script>

<style scoped>
.profile-bg {
    background-image: url('/img/Background1.jpg');
    position: relative;
}
.bg-img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}
.profile-container {
    position: relative;
    background: rgba(255, 140, 0, 0.85);
    border-radius: 40px;
    padding: 40px;
    max-width: 800px;
    margin: 40px auto;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.profile-title {
    font-size: 3rem;
    color: #fff;
    margin-bottom: 2rem;
    text-align: center;
    width: 100%;
}
.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.profile-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
}

.profile-avatar {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.3rem;
}
.info-row input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    font-size: 1rem;
}
.info-label {
    color: #fff;
    font-weight: bold;
    min-width: 160px;
}
.info-value {
    color: #fff;
}
.btn-change-password {
    background: #fff;
    color: #ff8c00;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    font-weight: bold;
}
.profile-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1.5rem;
    width: 100%;
    margin-top: 2rem;
}
.btn-exit {
    background: #fff;
    color: #ff8c00;
    border: 1px solid #ff8c00;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.5rem 2rem;
}
.btn-update {
    background: #fff;
    color: #ff8c00;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.5rem 2rem;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: #ff8c00;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
}

.modal-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.modal-row {
  margin-bottom: 1rem;
}

.modal-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #fff;
}

.modal-input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-error {
  color: red;
  margin-top: 1rem;
  font-weight: bold;
}

</style>