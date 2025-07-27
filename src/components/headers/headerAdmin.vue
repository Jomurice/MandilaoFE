<template>
  <header class="admin-header">
    <div class="logo-section">
      <img src="/src/assets/pic/logo quan.png" alt="Logo" class="logo" />
    </div>
    <h1 class="admin-title">Administrator</h1>
    <div class="user-icon">
      <img src="/src/assets/pic/user.png" alt="User" />
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderAdmin",
};
</script>

<style scoped>
.admin-header {
  background-color: #ffa500;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-section .logo {
   height: 80px;
    width: auto;
    object-fit: contain; 
}

.admin-title {
  font-size: 26px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  flex: 1;
}

.user-icon {
  display: flex;
  align-items: center;
}

.user-icon img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
}
</style>
