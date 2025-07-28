<template>
  <header class="header-container">
    <nav class="navbar">
      <ul class="nav-links">
        <li><router-link to="/" class="nav-item">Home</router-link></li>
        <li><router-link to="/mon-an" class="nav-item">Món ăn</router-link></li>
        <li><router-link to="/eventPage" class="nav-item">Sự kiện</router-link></li>
        <li><router-link to="/menu" class="nav-item">Menu</router-link></li>
      </ul>

      <div class="logo-container">
        <router-link to="/">
          <img src="" alt="Logo" class="logo" />
        </router-link>
      </div>

      <ul class="nav-links right">
        <li><router-link to="/gioi-thieu" class="nav-item">Giới Thiệu</router-link></li>
        <li><router-link to="/register" class="nav-item">Đăng Ký</router-link></li>
        <li><router-link to="/login" class="nav-item">Đăng Nhập</router-link></li>
        <li class="search-icon" @click="toggleSearch">
          🔍
        </li>
      </ul>
    </nav>

  
    <div v-if="showSearch" class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm..."
        class="search-input"
        @keyup.enter="submitSearch"
      />
      <button>Tìm</button>
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
    const router = useRouter()

    const toggleSearch = () => {
      showSearch.value = !showSearch.value
    }

    const submitSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'product-search', query: { q: searchQuery.value } })
        showSearch.value = false
        searchQuery.value = ''
      }
    }

    return { showSearch, searchQuery, toggleSearch, submitSearch }
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
  flex-wrap: wrap;
  justify-content: flex-start;
}

.nav-links li {
  margin: 0 15px;
  cursor: pointer;
}

.nav-links li .nav-item:hover {
  color: rgb(122, 3, 33);
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
  margin: 0 20px;
}

.logo {
  height: 150px;
  object-fit: contain;
}

.nav-links.right {
  justify-content: flex-end;
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

@media (max-width: 768px) {
  .navbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .nav-links {
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-links.right {
    justify-content: center;
  }

  .nav-links li {
    margin: 8px;
  }

  .logo-container {
    order: -1;
    width: 100%;
    margin-bottom: 10px;
  }

  .search-container {
    padding: 0 10px;
  }

  .search-input {
    width: 100%;
    font-size: 16px;
    padding: 10px;
  }

  .search-icon {
    font-size: 24px;
  }
}
</style>
