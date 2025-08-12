<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import getImgUrl from "../../assets/utils/imgScript";
const name = ref("");
const description = ref("");
const price = ref("");
const quantity = ref("");
const idCategory = ref("");
const photoFiles = ref([]);
const isMain = ref("true");

const categories = ref([]);
const products = ref([]);


async function loadCategories() {
  const res = await axios.get("http://localhost:8080/identity/category");
  categories.value = res.data.result;
}


async function loadProducts() {

   const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await axios.get("http://localhost:8080/identity/product", {
    params: { page: 0, size: 100 }
  },
{headers});
 
  products.value = res.data.result.content;
}

function handleFileChange(e) {
  photoFiles.value = Array.from(e.target.files);
}


async function submitForm(e) {
  e.preventDefault();

  const product = {
    name: name.value,
    description: description.value,
    price: parseFloat(price.value),
    quantity: parseInt(quantity.value),
    id_category: idCategory.value,
    isMain: [isMain.value === "true"]
  };

  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );
  photoFiles.value.forEach(file => formData.append("images", file));

const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
const token = loginInfo?.result?.token;

await axios.post("http://localhost:8080/identity/product", formData, {
  headers: { 
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token}`
  }
});


  name.value = "";
  description.value = "";
  price.value = "";
  quantity.value = "";
  idCategory.value = "";
  isMain.value = "true";
  photoFiles.value = [];

  
  await loadProducts();
}


async function deleteProduct(id) {
   const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  await axios.delete(`http://localhost:8080/identity/product/${id}`, {
  headers
});
    
  
  await loadProducts();
}

onMounted(() => {
  loadCategories();
  loadProducts();
});
</script>

<template>
<div class="container mt-5">
  <div class="mx-auto form-box" style="max-width: 500px;">
    <h4 class="mb-3">Tạo sản phẩm mới</h4>
    <form @submit="submitForm">
      <div class="mb-2">
        <label class="form-label">Tên sản phẩm</label>
        <input v-model="name" type="text" class="form-control form-control-sm" required>
      </div>

      <div class="mb-2">
        <label class="form-label">Mô tả</label>
        <textarea v-model="description" class="form-control form-control-sm" rows="2" required></textarea>
      </div>

      <div class="row g-2 mb-2">
        <div class="col">
          <label class="form-label">Giá</label>
          <input v-model="price" type="number" class="form-control form-control-sm" required>
        </div>
        <div class="col">
          <label class="form-label">Số lượng</label>
          <input v-model="quantity" type="number" class="form-control form-control-sm" required>
        </div>
      </div>

      <div class="mb-2">
        <label class="form-label">Loại sản phẩm</label>
        <select v-model="idCategory" class="form-select form-select-sm" required>
          <option value="">-- Chọn loại --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="mb-2">
        <label class="form-label">Ảnh sản phẩm</label>
        <input type="file" class="form-control form-control-sm" accept="image/*" multiple @change="handleFileChange" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Sản phẩm chính?</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="true" v-model="isMain">
          <label class="form-check-label">Chính</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" value="false" v-model="isMain">
          <label class="form-check-label">Phụ</label>
        </div>
      </div>

      <button type="submit" class="btn btn-sm btn-secondary">Tạo sản phẩm</button>
    </form>
  </div>
</div>

<div class="container mt-4 table-box">
  <h2 class="mb-4">Danh sách sản phẩm</h2>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Ảnh</th>
        <th>Tên sản phẩm</th>
        <th>Mô tả</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Loại</th>
        <th>Sản phẩm chính</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prod in products" :key="prod.id">
        <td>
          <img :src="getImgUrl(prod.images)" alt="Ảnh" width="50" height="50">
        </td>
        <td>{{ prod.name }}</td>
        <td>{{ prod.description }}</td>
        <td>{{ prod.price }}</td>
        <td>{{ prod.quantity }}</td>
        <td>{{ categories.find(cat => cat.id === prod.id_category)?.name }}</td>
        <td>{{ prod.images?.find(img => img.isMain)?.isMain }}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">Sửa</button>
          <button class="btn btn-sm btn-danger" @click="deleteProduct(prod.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>
