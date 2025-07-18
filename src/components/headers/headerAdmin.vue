<template>
  <header class="admin-header">
    <div class="logo-section">
      <img src="" alt="Logo" class="logo" />
    </div>
    <h1 class="admin-title">Admintrator</h1>
    <div class="user-icon">
      <img src="" alt="User" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderAdmin'
};
</script>

<style scoped>
.admin-header {
  background-color: #FFA500;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  color: white;
}

.logo-section .logo {
  height: 40px;
}

.admin-title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.user-icon img {
  height: 30px;
  border-radius: 50%;
}
</style>
