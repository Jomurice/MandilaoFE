<template>
  <header class="header-container">
    <nav class="navbar">
      <ul class="nav-links">
        <li><router-link to="/" class="nav-item">Home</router-link></li>
        <li><router-link to="/mon-an" class="nav-item">Món ăn</router-link></li>
        <li><router-link to="/eventPage" class="nav-item">Sự kiện</router-link></li>
      </ul>

      <div class="logo-container">
        <router-link to="/">
          <img src="/src/assets/pic/logo quan.png" alt="Logo" class="logo">
        </router-link>
      </div>

      <ul class="nav-links right">
        <li><router-link to="/gioi-thieu" class="nav-item">Giới Thiệu</router-link></li>
        <li><router-link to="/register" class="nav-item">Đăng Ký</router-link></li>
        <li><router-link to="/login" class="nav-item">Đăng Nhập</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderUsers',
};
</script>

<style scoped>

.header-container {
  width: 100vw;
  background-color: #FFA500;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.navbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}


.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
}




.nav-links li {
  margin: 0 15px;
}

.nav-links li .nav-item:hover{
 
  color:rgb(122, 3, 33);
}

.nav-item {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #f0f0f0;
 
}

.logo-container {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px; /* Thêm khoảng cách hai bên logo */
}

.logo {
  height: 150px;
  object-fit: contain;
}

.nav-links.right {
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    margin-top: 10px;
  }

  .nav-links.right {
    margin-left: 0;
  }

  .nav-links li {
    margin: 0 10px;
  }

  .logo-container {
    order: -1; /* Đẩy logo lên đầu khi ở mobile để dễ nhìn hơn */
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>