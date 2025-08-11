<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const errorMessage = ref("");
const isLoading = ref(true);
const categoryList = ref([]);
const formCategory = ref({
  name: "",
  description: "",
});
const currentEdit = ref(null);

async function loadCategories () {
  try {
    const response = await axios.get('http://localhost:8080/identity/category');
    categoryList.value = response.data.result;
  } catch (error) {
    console.log("error load categories: " + error);
    errorMessage.value = "Không load được data từ server.";
  } finally {
    isLoading.value = false;
  }
}

async function createCategory(){
  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.post('http://localhost:8080/identity/category',
      { name: formCategory.value.name, description: formCategory.value.description },
      { headers }
    );
    loadCategories();
    formCategory.value = { name: "", description: "" };
  } catch (error) {
    console.log("error create category:", error);
  } 
}

function getIdForUpdate(id){
  const category = categoryList.value.find(c => c.id === id);
  if(category){
    currentEdit.value = id;
    formCategory.value.name = category.name;
    formCategory.value.description = category.description;
  }
}

async function updateCategory(){
  const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
  const token = loginInfo?.result?.token;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    let url = "http://localhost:8080/identity/category";
    if(currentEdit.value != null){
      url += `/${currentEdit.value}`;
    }
    await axios.put(url,
      {
        name: formCategory.value.name,
        description: formCategory.value.description
      },
      { headers }
    );
    loadCategories();
    currentEdit.value = null;
    formCategory.value = { name: "", description: "" };
  } catch (error) {
    console.log("error update Category: ", error);
  }
}

async function deleteCategory(id) {
  if (!confirm("Bạn có chắc chắn muốn xoá loại sản phẩm này?")) {
    return;
  }
  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(`http://localhost:8080/identity/category/${id}`, { headers });
    loadCategories();
  } catch (error) {
    console.log("error delete category:", error);
  }
}

onMounted(loadCategories);
</script>

<template>
 <div class="container mt-5">
  <div class="mx-auto form-box" style="max-width: 500px;">
    <h4 class="mb-3 text-orange fw-bold">Tạo loại sản phẩm mới</h4>
    <form id="createCategoryForm">
      <div class="mb-2">
        <label for="name" class="form-label">Tên loại sản phẩm</label>
        <input
          type="text"
          class="form-control form-control-sm hover-input"
          id="name"
          name="name"
          placeholder="Nhập tên loại"
          required
          v-model="formCategory.name"
        />
      </div>

      <div class="mb-2">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          class="form-control form-control-sm hover-input"
          id="description"
          name="description"
          rows="2"
          placeholder="Nhập mô tả (nếu có)"
          v-model="formCategory.description"
        ></textarea>
      </div>

      <button type="button" class="btn btn-sm btn-orange mt-3" @click="createCategory()">Tạo</button>
      <button type="button" class="btn btn-sm btn-orange mt-3" @click="updateCategory()">Cập nhật</button>
    </form>
  </div>
</div>

<div class="container mt-4 table-box">
  <h2 class="mb-4 text-orange fw-bold">Danh sách loại sản phẩm</h2>
  <table class="table table-bordered table-hover table-striped align-middle">
    <thead class="table-orange text-white">
      <tr>
        <th>STT</th>
        <th>Tên loại</th>
        <th>Mô tả</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category,index) in categoryList" :key="category.id">
        <td>{{ index+1 }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" @click="getIdForUpdate(category.id)">Sửa</button>
          <button class="btn btn-sm btn-danger" @click="deleteCategory(category.id)">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<style scoped>
.text-orange {
  color: #ff8800;
}

.btn-orange {
  background-color: #ffa500;
  color: white;
  font-weight: 600;
  border: none;
  transition: background-color 0.3s ease;
}
.btn-orange:hover {
  background-color: #e69500;
  cursor: pointer;
}

.hover-input {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.hover-input:hover,
.hover-input:focus {
  box-shadow: 0 0 8px 2px rgba(255, 165, 0, 0.6);
  border-color: #ffa500;
  outline: none;
}

.table-orange {
  background-color: #ffa500;
}
</style>
