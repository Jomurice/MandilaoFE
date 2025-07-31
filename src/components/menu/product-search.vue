<template>
  <div class="search-results">
    <h2>Kết quả tìm kiếm cho: "{{ query }}"</h2>

    <div v-if="loading">Đang tìm kiếm...</div>

    <div v-else-if="!Array.isArray(results) || results.length === 0">
      Không tìm thấy sản phẩm nào
    </div>

    <div v-else class="product-grid">
      <div class="product" v-for="product in results" :key="product.id">
        <img :src="getImage(product)" alt="Product" @error="setDefaultImage" />
        <p class="product-name">{{ product.name }}</p>
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        <button class="add-button">Add</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const query = ref(route.query.q || '')
const results = ref([])
const loading = ref(false)

const fetchResults = async () => {
  if (!query.value) return

  loading.value = true
  try {
    const res = await axios.get('http://localhost:8080/identity/product/search', {
      params: { name: query.value }
    })

    results.value = Array.isArray(res.data.result) ? res.data.result : []
  } catch (err) {
    console.error('Lỗi khi tìm kiếm:', err)
    results.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => route.query.q,
  (newQ) => {
    query.value = newQ || ''
    fetchResults()
  }
)

onMounted(fetchResults)

const getImage = (product) =>
  product.images?.find((img) => img.isMain)?.url ||
  'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'

const setDefaultImage = (e) => {
  e.target.src = 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'
}

const formatPrice = (price) =>
  price?.toLocaleString('vi-VN') + ' VNĐ'
</script>

<style scoped>
.search-results {
  padding: 1rem;
}

h2 {
  margin-bottom: 1rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.product {
  background: #f8f8f8;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
}

.product img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.product-name {
  font-weight: bold;
  margin: 10px 0 5px;
}

.product-price {
  color: #cc5a36;
}

.add-button {
  margin-top: 5px;
  background-color: #cc5a36;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>