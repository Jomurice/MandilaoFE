<template>
    <div class="admin-container">
      <main class="content">
        <section class="order-list">
          <h2>Hóa đơn</h2>
          <div v-if="isLoading" class="loading-message">Đang tải hóa đơn...</div>
          <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <table v-else-if="payments.length > 0">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Bàn</th>
                <th>Tên thu ngân</th>
                <th>Tên khách hàng</th>
                <th>Tổng tiền</th>
                <th>Ngày tạo hóa đơn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.id">
                <td>{{ payment.id }}</td>
                 <td>{{ payment.name_table }}</td>
                 <td>{{ payment.name_admin }}</td>
                 <td>{{ payment.name_user }}</td>
                 <td>{{ formatPrice(payment.totailPrice) }}</td>
                <td>{{ formatDate(payment.payment_time) }}</td>
                 <td >
                  <button @click="viewOrderDetails(payment.id_order)" class="view-button">Chi tiết</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="no-data-message">
            Không có đơn hàng nào.
          </div>
        </section>

        <OrderDetailModal
          :show="showModal"
          :order="selectedOrderDetails"
          @close="closeModal"
        />
      </main>
    </div>
    <div class="notification-icon">🔔</div>
    <div class="scroll-to-top">⬆️</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import OrderDetailModal from '../orderManager/OrderDetailModal.vue';

// Reactive variables
const payments = ref([]);
const showModal = ref(false);
const selectedOrderDetails = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");


  const formatPrice = (value) =>{
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(value);
    };

// Format ngày
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('vi-VN', options);
};

async function loadPayment() {
  selectedOrderDetails.value = null; 

    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = { Authorization: `Bearer ${token}` };
    
    try {
      const url = 'http://localhost:8080/identity/admin/find_payments'
      const response = await axios.get(url,{headers})
      payments.value = Array.isArray(response.data.result) ? response.data.result : []
    } catch (error) {
      console.error("Lỗi khi tải danh sách hóa đơn:", error);
      errorMessage.value = "Không thể tải danh sách hóa đơn từ server. Vui lòng thử lại.";
      console.log("ggg",loginInfo)
      console.log(token)
    }finally {
    isLoading.value = false;
  }
}


// Hàm xem chi tiết đơn hàng khi click nút "View"
const viewOrderDetails = async (orderId) => {
  selectedOrderDetails.value = null; 

    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = { Authorization: `Bearer ${token}` };
  try {


    const response = await axios.get(`http://localhost:8080/identity/order/${orderId}/detail`, { headers });
    selectedOrderDetails.value = response.data.result;

    console.log("Fetched Order Details:", selectedOrderDetails.value);

    // Mở modal sau khi có dữ liệu
    showModal.value = true;
  } catch (err) {
    console.error(`Lỗi khi tải chi tiết đơn hàng ${orderId}:`, err);
    alert(`Không thể tải chi tiết đơn hàng ${orderId}. Vui lòng kiểm tra console.`);
  }
};

// Hàm đóng modal
const closeModal = () => {
  showModal.value = false;
  selectedOrderDetails.value = null; // Xóa dữ liệu chi tiết khi đóng modal
};

// Gọi fetchOrders khi component được mount
onMounted(() => {
  loadPayment();
});
</script>

<style scoped>
/* Các style cho headerAdmin component được wrap trong .header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff9800; /* Màu cam */
  padding: 15px 20px;
  color: white; /* Màu chữ mặc định cho header */
  /* Loại bỏ border-radius và box-shadow nếu muốn góc vuông và không bóng */
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

/* Các style khác giữ nguyên như bạn đã cung cấp */
.admin-container {
  min-height: 100vh;
  width: 100%;
  /* background-color: #f0f2f5; */
}

.sidebar {
  width: 200px;
  background-color: #ff9800; /* Màu cam */
  padding: 20px 0;
  color: white;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  width: 60px; /* Điều chỉnh kích thước logo */
  height: auto;
}


.content {
  flex-grow: 1;
  padding: 20px;
}

.header h1 {
  margin: 0;
  color: white; /* Màu chữ Administrator */
  flex-grow: 1;
  text-align: center;
  font-size: 2em; /* Điều chỉnh kích thước chữ nếu cần */
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.order-list {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* Thêm khoảng cách nếu cần */
}

.order-list h2 {
  margin-top: 0;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.button{
  display: flex;
  gap: 5px;
}

.view-button {
  background-color: #4CAF50; /* Màu xanh lá */
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #45a049;
}

.loading-message, .error-message, .no-data-message {
  text-align: center;
  padding: 20px;
  font-size: 1.1em;
  color: #555;
}

.error-message {
  color: red;
}

/* Biểu tượng thông báo và lên đầu trang */
.notification-icon, .scroll-to-top {
  position: fixed;
  right: 20px;
  background-color: #ff9800; /* Màu cam */
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
}
.notification-icon {
  bottom: 20px;
}
.scroll-to-top {
  bottom: 70px; /* Đặt cao hơn nút thông báo */
}
</style>