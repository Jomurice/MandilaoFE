<template>
  <header class="header-container">
    <nav class="navbar">
      <!-- ICON 3 GẠCH -->
      <div class="mobile-menu-icon" @click="toggleMobileMenu">
        ☰
      </div>

      <!-- MENU TRÁI -->
      <ul class="nav-links left" :class="{ show: mobileMenuOpen }">
        <li><router-link to="/" class="nav-item">Home</router-link></li>
        <hr>
        <li><router-link to="/mon-an" class="nav-item">Món ăn</router-link></li>
        <li><router-link to="/eventPage" class="nav-item">Sự kiện</router-link></li>
        <li><router-link to="/menu" class="nav-item">Menu</router-link></li>
      </ul>

      <!-- LOGO -->
      <div class="logo-container">
        <router-link to="/">
          <img src="" alt="Logo" class="logo" />
        </router-link>
      </div>

      <!-- MENU PHẢI -->
      <ul class="nav-links right">
        <li><router-link to="/gioi-thieu" class="nav-item">Giới Thiệu</router-link></li>
        <li><router-link to="/register" class="nav-item">Đăng Ký</router-link></li>
        <li><router-link to="/login" class="nav-item">Đăng Nhập</router-link></li>
      </ul>

      <!-- TÌM KIẾM ICON -->
      <div class="search-icon" @click="toggleSearch">
        🔍
      </div>
    </nav>

    <!-- Ô TÌM KIẾM -->
    <div v-if="showSearch" class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm..."
        class="search-input"
        @keyup.enter="submitSearch"
      />
      <button @click="submitSearch">Tìm</button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderUsers',
  setup() {
    const showSearch = ref(false)
    const searchQuery = ref('')
    const mobileMenuOpen = ref(false)
    const router = useRouter()

    const toggleSearch = () => {
      showSearch.value = !showSearch.value
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const submitSearch = () => {
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
      submitSearch
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 100vw;
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

.nav-links.left li,
.nav-links.right li {
  margin: 0 10px;
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
  color: #f0f0f0;
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
  max-width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  outline: none;
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
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    z-index: 999;
  }

  .nav-links.left.show {
    display: flex;
  }

  
  .nav-links.left li .nav-item {
    color: #000000 !important; /* ✅ Chữ đen */
  }

    .nav-links.left li .nav-item:hover {
    color: #ffa500; /* ✅ Hover chuyển sang màu cam */
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
