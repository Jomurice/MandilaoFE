<template>
  <div class="admin-page">
    <HeaderAdmin />

    <div class="admin-layout">
      <SidebarAdmin />

      <main class="admin-content">
        <h2>Products</h2>
        <div class="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
          <button>Tìm</button>
        </div>

        <table class="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Tên</th>
              <th>Giá</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td><img :src="item.image" class="product-img" /></td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td><button class="edit-btn">Sửa</button></td>
              <td><button class="toggle-btn">Ẩn/hiện</button></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </div>
</template>

<script>
import HeaderAdmin from '../headers/HeaderAdmin.vue'
import SidebarAdmin from '../headers/SidebarAdmin.vue'

export default {
  name: 'HomeAdmin',
  components: {
    HeaderAdmin,
    SidebarAdmin
  },
  data() {
    return {
      products: [
        {
          name: 'Bò wagyu',
          price: '280.000 VNĐ',
          image: '@/assets/bo-wagyu.jpg'
        },
        {
          name: 'Bò shabu',
          price: '450.000 VNĐ',
          image: '@/assets/bo-shabu.jpg'
        },
        {
          name: 'Quân',
          price: '960.000 VNĐ',
          image: '@/assets/quan.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
}

.admin-content {
  flex: 1;
  padding: 20px;
  background: #fff;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.product-img {
  width: 60px;
  height: auto;
}

.edit-btn {
  background-color: #00cc00;
  color: white;
  padding: 5px 10px;
  border: none;
}

.toggle-btn {
  background-color: navy;
  color: white;
  padding: 5px 10px;
  border: none;
}
</style>
