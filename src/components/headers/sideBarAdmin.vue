<template>
  <aside class="sidebar">
    <ul class="sidebar-menu">
      <li><router-link to="/admin/product">Products</router-link></li>
       <li><router-link to="/admin/category">Category</router-link></li>
      <li><router-link to="/admin/users">Users</router-link></li>

      <li><router-link to="/admin/Order-Manegerment">Order</router-link></li>

      <li><router-link to="/admin/discount">Discount</router-link></li>
      <li><router-link to="/admin/table">Table</router-link></li>
      <li><router-link to="/admin/reports">Reports</router-link></li>
    </ul>
  </aside>
</template>

<script setup>


</script>

<style scoped>
.sidebar {
  width: 180px;
  background-color: #ffa500;
  min-height: calc(100vh - 60px);
  color: black;
}

.sidebar-menu {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.sidebar-menu li {
  margin: 15px 0;
  font-weight: bold;
}

.sidebar-menu li a {
  color: black; /* ✅ chữ đen mặc định */
  text-decoration: none;
  padding: 5px 10px;
  display: block;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-menu li a:hover {
  background-color: #ddd; /* nền xám khi hover */
  color: black;           /* chữ đen */
  border-radius: 4px;
}

</style>
