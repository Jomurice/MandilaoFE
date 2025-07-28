<template>
  <div class="menu-container">
    <aside class="category-sidebar">
      <ul>
        <li
          v-for="cat in categories"
          :key="cat.id"
          :class="{ active: cat.id === selectedCategoryId }"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </aside>

    <main class="product-list">
      <div v-if="isLoading">Đang tải dữ liệu...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else>
        <div
          class="product-item"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <img
            :src="getMainImage(product)"
            alt="product"
            onerror="this.src='https://dummyimage.com/150x150/cccccc/000000&text=No+Image'"
          />
          <p class="product-name">{{ product.name }}</p>
          <p class="product-price">{{ formatPrice(product.price) }}</p>
          <button class="add-button" @click="addToCart(product)">Add</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { getImgUrl } from "../../assets/utils/imgScript";
const categories = ref([]);
const products = ref([]);
const selectedCategoryId = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

// Format tiền
const formatPrice = (price) => {
  if (price === 0) return "0 VNĐ";
  return price.toLocaleString("vi-VN") + " VNĐ";
};

const addToCart = (product) =>{
  const cart =JSON.parse(localStorage.getItem('cart'));

  const existingItem = cart.find(item => item.id === product.id);
  if(existingItem){
    existingItem.quantity += 1;
  }else{
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getMainImage(product),
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

// Lấy ảnh chính từ danh sách ảnh
const getMainImage = (product) => {
  const mainImage = product.images?.find((img) => img.isMain);
  return (
    mainImage?.url ||
    "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
  );
};

// Lọc sản phẩm theo category
const filteredProducts = computed(() => {
  return products.value.filter(
    (p) => p.id_category === selectedCategoryId.value
  );
});

const selectCategory = (id) => {
  selectedCategoryId.value = id;
};

// Gọi API
onMounted(async () => {
  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = { Authorization: `Bearer ${token}` };

    const [catRes, prodRes] = await Promise.all([
      axios.get("http://localhost:8080/identity/category", { headers }),
      axios.get("http://localhost:8080/identity/product", { headers }),
    ]);

    categories.value = Array.isArray(catRes.data.result)
      ? catRes.data.result
      : [];
    products.value = Array.isArray(prodRes.data.result)
      ? prodRes.data.result
      : [];
    console.log(prodRes.data.result);

    if (categories.value.length > 0) {
      selectedCategoryId.value = categories.value[0].id;
    }
  } catch (err) {
    console.error("Lỗi khi tải dữ liệu:", err);
    errorMessage.value = "Không thể tải dữ liệu từ server.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.menu-container {
  display: flex;
  min-height: 100vh;
}

.category-sidebar {
  width: 200px;
  background: orange;
  padding: 1rem;
}

.category-sidebar ul {
  list-style: none;
  padding: 0;
}

.category-sidebar li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
}

.category-sidebar li.active {
  font-weight: bold;
  border-left: 4px solid blue;
}

.product-list {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.product-item {
  background: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.add-button {
  margin-top: 5px;
  background-color: #cc5a36;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
