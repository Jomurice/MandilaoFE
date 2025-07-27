<template>
  <main class="p-8 bg-white shadow-xl rounded-xl max-w-7xl mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">🛍️ Quản lý sản phẩm</h2>
    <!-- Nút thêm mới sản phẩm -->
    <div class="flex justify-end mb-4">
      <button
        @click="openCreateForm"
        class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow"
      >
        ➕ Thêm sản phẩm
      </button>
    </div>

    <!-- Tab Form Edit -->
    <div
      v-if="isEditMode"
      class="fixed inset-0 bg-white/10 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
        <h3 class="text-xl font-bold mb-4">📝 Chỉnh sửa sản phẩm</h3>
        <form
          @submit.prevent="handleSubmit"
          enctype="multipart/form-data"
          class="grid gap-4"
        >
          <input
            v-model="form.name"
            type="text"
            placeholder="Tên sản phẩm"
            required
            class="border p-2 rounded"
          />
          <input
            v-model.number="form.price"
            type="number"
            placeholder="Giá sản phẩm"
            required
            class="border p-2 rounded"
          />
          <input
            v-model.number="form.quantity"
            type="number"
            placeholder="Số lượng"
            required
            class="border p-2 rounded"
          />
          <select
            v-model="form.id_category"
            required
            class="border p-2 rounded"
          >
            <option disabled value="">-- Chọn danh mục --</option>
            <option v-for="cate in categories" :key="cate.id" :value="cate.id">
              {{ cate.name }}
            </option>
          </select>
          <textarea
            v-model="form.description"
            placeholder="Mô tả sản phẩm"
            rows="3"
            class="border p-2 rounded"
          ></textarea>

          <!-- Hiển thị ảnh preview -->
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(img, index) in previewImages"
              :key="index"
              class="w-24 h-24 border rounded overflow-hidden"
            >
              <img
                :src="typeof img === 'string' ? img : URL.createObjectURL(img)"
                alt="Ảnh xem trước"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImageChange"
            class="border p-2 rounded"
          />

          <div class="flex justify-between mt-4">
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              💾 Lưu
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bảng sản phẩm -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full border border-gray-200 text-sm text-gray-700">
        <thead class="bg-blue-50 text-left">
          <tr>
            <th class="border p-3 font-medium">Ảnh</th>
            <th class="border p-3 font-medium">Tên</th>
            <th class="border p-3 font-medium">Giá</th>
            <th class="border p-3 font-medium">Danh mục</th>
            <th class="border p-3 font-medium">Mô tả</th>
            <th class="border p-3 font-medium">Trạng thái</th>
            <th class="border p-3 font-medium">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="index"
            class="border-t hover:bg-blue-50 transition duration-150"
          >
            <td class="p-3">
              <img
                :src="getMainImage(item)?.url"
                alt="Ảnh sản phẩm"
                class="w-20 h-20 object-cover rounded-md shadow-sm hover:scale-105 transition"
              />
            </td>
            <td class="p-3 font-semibold text-gray-800">{{ item.name }}</td>
            <td class="p-3 text-green-600 font-medium">
              {{ item.price.toLocaleString() }} đ
            </td>
            <td class="p-3 text-indigo-600">
              {{ getCategoryNameById(item.id_category) }}
            </td>
            <td class="p-3 text-gray-700">
              {{ item.description || "Không có mô tả" }}
            </td>
            <td class="p-3">
              <span
                :class="item.quantity > 0 ? 'text-green-600' : 'text-red-500'"
                class="font-semibold"
              >
                {{ item.quantity > 0 ? "Còn hàng" : "Hết hàng" }}
              </span>
            </td>
            <td class="p-3">
              <button
                @click="fillForm(item)"
                class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                🖊️ Sửa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import axios from "axios";

const products = ref([]);
const selectedFiles = ref([]);
const isEditMode = ref(false);
const editingProductId = ref(null);
const previewImages = ref([]);
const categories = ref([]);

const apiUrl = "http://localhost:8080/identity/product";

const form = ref({
  name: "",
  price: null,
  quantity: null,
  id_category: "",
  description: "",
  isMain: [true],
});

const loadCategories = async () => {
  try {
    const res = await axios.get("http://localhost:8080/identity/category");
    categories.value = res.data.result;
  } catch (error) {
    console.error("Lỗi khi tải danh mục:", error);
  }
};

const loadProducts = async () => {
  try {
    const res = await axios.get(apiUrl);
    products.value = res.data.result;
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
  }
};

const handleImageChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    selectedFiles.value = Array.from(files);
    previewImages.value = selectedFiles.value.map((file) =>
      URL.createObjectURL(file)
    );
  } else {
    selectedFiles.value = [];
    previewImages.value = [];
  }
};

const openCreateForm = () => {
  isEditMode.value = true;
  editingProductId.value = null;

  form.value = {
    name: "",
    price: null,
    quantity: null,
    id_category: "",
    description: "",
    isMain: [true],
  };
  selectedFiles.value = [];
  previewImages.value = [];
};

const handleSubmit = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userLogin"));
    const headers = {
      Authorization: `Bearer ${token.result.token}`,
    };

    const productJson = {
      name: form.value.name,
      price: form.value.price,
      quantity: form.value.quantity,
      id_category: form.value.id_category,
      description: form.value.description,
      isMain: form.value.isMain,
    };

    const formData = new FormData();
    formData.append("product", JSON.stringify(productJson));

    // Nếu đang tạo mới (không có editingProductId), gửi ảnh
    if (!editingProductId.value && selectedFiles.value.length > 0) {
      selectedFiles.value.forEach((file) => {
        formData.append("images", file);
      });
    }

    headers["Content-Type"] = "multipart/form-data";

    let res;
    if (editingProductId.value) {
      // Cập nhật
      res = await axios.put(`${apiUrl}/${editingProductId.value}`, formData, {
        headers,
      });
    } else {
      // Thêm mới
      res = await axios.post(apiUrl, formData, { headers });
    }

    // Reset form
    form.value = {
      name: "",
      price: null,
      quantity: null,
      id_category: "",
      description: "",
      isMain: [true],
    };
    selectedFiles.value = [];
    previewImages.value = [];
    isEditMode.value = false;
    editingProductId.value = null;

    await loadProducts();
  } catch (error) {
    console.error("Lỗi khi xử lý sản phẩm:", error.response || error);
  }
};

const getMainImage = (item) => {
  if (!item.images || item.images.length === 0) return null;
  return item.images.find((img) => img.isMain) || item.images[0];
};

// const urlToFile = async (url, filename) => {
//   const res = await fetch(url);
//   const blob = await res.blob();
//   const file = new File([blob], filename, { type: blob.type });
//   return file;
// };

const fillForm = (item) => {
  isEditMode.value = true;
  editingProductId.value = item.id;

  form.value.name = item.name;
  form.value.price = item.price;
  form.value.quantity = item.quantity;
  form.value.id_category = item.id_category || "";
  form.value.description = item.description || "";
  form.value.isMain = item.images?.map((img) => img.isMain) || [true];

  previewImages.value = item.images?.map((img) => img.url) || [];

  // Không gửi ảnh khi cập nhật nữa
  selectedFiles.value = [];
};

const cancelEdit = () => {
  isEditMode.value = false;
  editingProductId.value = null;
  form.value = {
    name: "",
    price: null,
    quantity: null,
    id_category: "",
    description: "",
    isMain: [true],
  };
  selectedFiles.value = [];
  previewImages.value = [];
};

const getCategoryNameById = (id) => {
  const found = categories.value.find((c) => c.id === id);
  return found ? found.name : "Không rõ";
};

onMounted(() => {
  loadProducts();
  loadCategories();
});
</script>

<style scoped>
img:hover {
  filter: brightness(1.05);
}
</style>
