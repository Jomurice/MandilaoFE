<template>
  <header class="header-container">
    <nav class="navbar">

      <div class="mobile-menu-icon" @click="toggleMobileMenu">
        ☰
      </div>


      <ul class="nav-links left" :class="{ show: mobileMenuOpen }">
        <li><router-link to="/" class="nav-item">Home</router-link></li>
        <li><router-link to="/mon-an" class="nav-item">Món ăn</router-link></li>
        <li><router-link to="/eventPage" class="nav-item">Sự kiện</router-link></li>
        <li><router-link to="/menu" class="nav-item">Menu</router-link></li>
      </ul>


      <div class="logo-container">
        <router-link to="/">
          <img src="/src/assets/pic/logo quan.png" alt="Logo" class="logo">

        </router-link>
      </div>





      <div class="search-cart-login">
        <div class="search-icon" @click="toggleSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <div class="cart">
          <router-link to="/cart"><i class="fa-solid fa-bag-shopping"></i></router-link>
        </div>

        <ul class="nav-links right">
          <div class="" v-if="userStore?.isLoggedIn">
            <li class="nav-item dropdown">
              <button class="btn btn-dark dropdown-toggle avatar" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person"></i> {{ fullName }}
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li>
                  <RouterLink to="/my-info" class="dropdown-item" href="#">Trang cá nhân</RouterLink>
                </li>
                <li><button @click="logout" class="dropdown-item" href="#">Đăng xuất</button></li>
              </ul>
            </li>
          </div>
          <div class="login-register" v-else>
            <li><router-link to="/login" class="nav-item">Đăng Nhập</router-link></li> |
            <li><router-link to="/register" class="nav-item">Đăng Ký</router-link></li>
          </div>
        </ul>

      </div>
    </nav>




    <div v-if="showSearch" class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Tìm kiếm..." class="search-input"
        @keyup.enter="submitSearch" />
      <button class="search-button" @click="submitSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'

export default {
  name: 'HeaderUsers',
  setup() {
    const showSearch = ref(false)
    const searchQuery = ref('')
    const mobileMenuOpen = ref(false)
    const router = useRouter()

    const userStore = useUserStore()

    const logout = () => {
      userStore.clearUser()
    }

    const fullName = computed(() => userStore.fullName)

    const toggleSearch = () => {
      showSearch.value = !showSearch.value
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const submitSearch = () => {
      console.log('Search:', searchQuery.value)
      if (searchQuery.value.trim()) {
        router.push({ name: 'product-search', query: { q: searchQuery.value } })
        showSearch.value = false
        searchQuery.value = ''
      }
    }

    return {
      showSearch,
      searchQuery,
      mobileMenuOpen,
      toggleSearch,
      toggleMobileMenu,
      submitSearch,
      logout,
      fullName,
      userStore,
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  background-color: #ffa500;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

/* MOBILE ICON */
.mobile-menu-icon {
  display: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

/* MENU CHUNG */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.nav-links.left{
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links.left li {
  cursor: pointer;
}

.nav-item {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color:#000000;
}

.logo-container {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 100px;
  object-fit: contain;
}

.search-cart-login{
  display: flex;
  gap: 50px;
  align-items: center;
}

.cart {
  width: 3%;
}

.cart a i {
  color: white;
  font-size: 20px;
}

.cart a i:hover{
  color: #000000;
}

.login-register{
  display: flex;
  gap: 5px;
}

.search-icon {
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #333;
}

.search-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

.search-input {
  width: 400px;
  /* max-width: 100%; */
  max-height: 45px;
  padding: 10px 14px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  outline: none;
}

.search-button {
  background-color: #fff;
  border: none;
  max-height: 45px;
  padding: 10px 14px;
  margin-left: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  font-size: 16px;
  color: #ffa500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
  background-color: #ffa500;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


/* RESPONSIVE CHO MOBILE */
@media (max-width: 768px) {
  .mobile-menu-icon {
    display: block;
  }

  .nav-links.left {
    display: none;
    position: absolute;
    top: 60px;
    left: 10px;
    flex-direction: column;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  .nav-links.left.show {
    display: flex;
  }


  .nav-links.left li .nav-item {
    color: #000000 !important;
    /* ✅ Chữ đen */
  }

  .nav-links.left li .nav-item:hover {
    color: #ffa500;
    /* ✅ Hover chuyển sang màu cam */
  }

  .nav-links.right {
    display: none;
  }

  .logo-container {
    flex-grow: 1;
    justify-content: center;
  }

  .search-icon {
    font-size: 24px;
  }

  .search-container {
    padding: 0 10px;
  }

  .search-input {
    width: 100%;
    font-size: 16px;
    padding: 10px;
  }
}
</style>
