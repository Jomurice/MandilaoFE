<template>
  <div class="min-h-screen w-full flex bg-gray-100">
    <aside class="w-56 bg-orange-400 p-6 text-white">
      <ul class="space-y-4">
        <li
          v-for="cat in categories"
          :key="cat.id"
          :class="[
            'cursor-pointer transition duration-200 px-2 py-1 rounded',
            cat.id === selectedCategoryId
              ? 'font-bold bg-orange-500 border-l-4 border-white'
              : 'hover:opacity-80',
          ]"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </aside>

    <main class="flex-1 px-6 sm:px-12 py-8">
      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow hover:shadow-lg transition-all p-4 flex flex-col items-center text-center"
        >
          <img
            :src="getImgUrl(product.images)"
            alt="product"
            class="w-full h-40 object-cover rounded-lg mb-4"
            @error="
              (e) =>
                (e.target.src =
                  'https://dummyimage.com/150x150/cccccc/000000&text=No+Image')
            "
          />
          <p class="font-semibold text-gray-900 truncate w-full text-base">
            {{ product.name }}
          </p>
          <p class="text-gray-500 mt-1 text-sm">
            {{ formatPrice(product.price) }}
          </p>
          <button
            class="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm"
          >
            + Add
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import getImgUrl from "../../assets/utils/imgScript";
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

// Lấy ảnh chính từ danh sách ảnh
// const getMainImage = (product) => {
//   const mainImage = product.images?.find((img) => img.isMain);
//   return (
//     mainImage?.url ||
//     "https://dummyimage.com/150x150/cccccc/000000&text=No+Image"
//   );
// };

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
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const [catRes, prodRes] = await Promise.all([
      axios.get("http://localhost:8080/identity/category", { headers }),
      // axios.get("http://localhost:8080/identity/category"),
      axios.get("http://localhost:8080/identity/product", { headers }),
      // axios.get("http://localhost:8080/identity/product"),
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
