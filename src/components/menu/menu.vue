<template>
  <div class="menu-container">
    <aside class="category-sidebar">
      <ul>
        <li
          v-for="cat in categories"
          :key="cat.id ?? 'all'"
          :class="{ active: cat.id === selectedCategoryId }"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </aside>

    <main class="product-section">
      <div v-if="isLoading">Đang tải dữ liệu...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else>
        <div class="product-grid">
          <div
            class="product-item"
            v-for="product in products"
            :key="product.id"
          >
            <img
              :src="getImgUrl(product.images)"
              alt="product"
              onerror="this.src='https://dummyimage.com/150x150/cccccc/000000&text=No+Image'"
            />
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
            <button class="add-button" @click="addToCart(product)">Add</button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage.value <= 1">Prev</button>

          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage.value === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage.value >= totalPages">
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import getImgUrl from "../../assets/utils/imgScript";

const categories = ref([]);
const products = ref([]);
const selectedCategoryId = ref(null); // null = Tất cả
const isLoading = ref(true);
const errorMessage = ref("");
const currentPage = ref(1);
const totalPages = ref(1);

const formatPrice = (price) => {
  return price === 0 ? "0 VNĐ" : price.toLocaleString("vi-VN") + " VNĐ";
};

const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getMainImage(product),
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

const getMainImage = (product) => {
  const mainImage = product.images?.find((img) => img.isMain);
  return (
    mainImage?.url ||
    "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
  );
};

const selectCategory = (id) => {
  selectedCategoryId.value = id;
  currentPage.value = 1;
  loadProduct();
};

const goToPage = async (page) => {
  currentPage.value = page;
  await loadProduct();
};

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    await loadProduct();
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await loadProduct();
  }
};

const loadProduct = async () => {
  try {
    isLoading.value = true;

    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let url = `http://localhost:8080/identity/product?page=${currentPage.value}&size=10&sortBy=name&direction=desc`;

    if (selectedCategoryId.value !== null) {
      url += `&categoryId=${selectedCategoryId.value}`;
    }

    const res = await axios.get(url, { headers });

    products.value = Array.isArray(res.data.result?.content)
      ? res.data.result.content
      : [];

    totalPages.value = res.data.result?.totalPages || 1;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    errorMessage.value = "Không thể tải dữ liệu từ server.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const [catRes, prodRes] = await Promise.all([
      axios.get("http://localhost:8080/identity/category", { headers }),
      axios.get(
        `http://localhost:8080/identity/product?page=${currentPage.value}&size=10&sortBy=name&direction=desc`,
        { headers }
      ),
    ]);

    categories.value = [
      { id: null, name: "Tất cả" }, 
      ...(Array.isArray(catRes.data.result) ? catRes.data.result : []),
    ];

    products.value = Array.isArray(prodRes.data.result?.content)
      ? prodRes.data.result.content
      : [];

    totalPages.value = prodRes.data.result?.totalPages || 1;

    selectedCategoryId.value = null;
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
  margin: 0;
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

.product-section {
  flex: 1;
  padding: 1rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.product-item {
  background: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: 0.3s;
}

.product-item img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-name {
  font-weight: bold;
}

.add-button {
  margin-top: 5px;
  background-color: #cc5a36;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.2s;
}

.pagination button.active {
  background-color: orange;
  color: white;
  font-weight: bold;
}
</style>
