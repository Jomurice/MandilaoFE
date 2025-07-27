<template>
  <div class="admin-page">
    <HeaderAdmin />

    <div class="admin-layout">
      <SidebarAdmin />

      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { useToast } from "vue-toast-notification";
import HeaderAdmin from "../headers/HeaderAdmin.vue";
import SidebarAdmin from "../headers/SidebarAdmin.vue";
import { useRouter } from "vue-router";
import Product from "../product/product.vue";

const toast = useToast();
const router = useRouter();
watchEffect(() => {
  const roleSession = JSON.parse(sessionStorage.getItem("userLogin"));
  // console.log(roleSession.result.scope);

  if (!roleSession) {
    router.push("/Login");
    toast.success("Vui lòng login với quyền admin để truy cập!");
  } else if (roleSession.result.scope !== "ROLE_ADMIN") {
    toast.error("Bạn không có quyền truy cập trang này! Cook.");
  }
});
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
