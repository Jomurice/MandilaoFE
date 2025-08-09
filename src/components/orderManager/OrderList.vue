<template>
  <div>

    <div class="admin-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><a href="#">Products</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Category</a></li>
            <li class="active"><a href="#">Order</a></li>
            <li><a href="#">Discount</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Table</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <section class="order-list">
          <h2>Order</h2>
          <div v-if="isLoading" class="loading-message">Đang tải đơn hàng...</div>
          <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <table v-else-if="orders.length > 0">
            <thead>
              <tr>
                <th>Id</th>
                <th>Ngày lập</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <!-- <td>{{ formatPrice(order.totalPrice) }}</td> -->
                <td>{{ formatDate(order.createdAt) }}</td>
                <td>{{ (order.createdAt) }}</td>
                <td>
                  <button @click="viewOrderDetails(order.id)" class="view-button">View</button>
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
          :order-data="selectedOrderDetails"
          @close="closeModal"
        />
      </main>
    </div>
    <div class="notification-icon">🔔</div>
    <div class="scroll-to-top">⬆️</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import HeaderAdmin from '../headers/headerAdmin.vue'; // Giữ nguyên import HeaderAdmin
import OrderDetailModal from './OrderDetailModal.vue';

// Reactive variables
const orders = ref([]);
const showModal = ref(false);
const selectedOrderDetails = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

// Format tiền
const formatPrice = (price) => {
  if (price === undefined || price === null) return "N/A";
  return price.toLocaleString("vi-VN") + " VNĐ";
};

// Format ngày
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('vi-VN', options);
};

// Hàm lấy danh sách đơn hàng từ API
const fetchOrders = async () => {
  isLoading.value = true;
  errorMessage.value = ""; // Reset lỗi trước khi fetch
  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Giả định API endpoint cho danh sách Orders
    // Đảm bảo backend trả về mảng các đối tượng order với id, totalPrice, createdAt
    const response = await axios.get("http://localhost:8080/admin/orders", { headers });
    // Kiểm tra và gán dữ liệu, response.data.result phải là một mảng
    orders.value = Array.isArray(response.data.result) ? response.data.result : [];

    console.log("Fetched Orders:", orders.value);

  } catch (err) {
    console.error("Lỗi khi tải danh sách đơn hàng:", err);
    errorMessage.value = "Không thể tải danh sách đơn hàng từ server. Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};

// Hàm xem chi tiết đơn hàng khi click nút "View"
const viewOrderDetails = async (orderId) => {
  selectedOrderDetails.value = null; // Reset chi tiết đơn hàng cũ
  // Bạn có thể thêm isLoading riêng cho modal nếu muốn hiển thị trạng thái tải trong modal
  // errorMessage.value = ""; // Có thể đặt lỗi riêng cho modal nếu cần

  try {
    const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    const token = loginInfo?.result?.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Giả định API endpoint cho chi tiết Order
    // Backend cần trả về thông tin chi tiết của Order, bao gồm các sản phẩm trong đó
    // Cấu trúc trả về cần có: id, totalPrice, createdAt, và một mảng `items` (hoặc `products`)
    // Trong đó mỗi item có: name, quantity, price
    const response = await axios.get(`http://localhost:8080/admin/orders/${orderId}`, { headers });
    selectedOrderDetails.value = response.data.result;

    console.log("Fetched Order Details:", selectedOrderDetails.value);

    // Mở modal sau khi có dữ liệu
    showModal.value = true;
  } catch (err) {
    console.error(`Lỗi khi tải chi tiết đơn hàng ${orderId}:`, err);
    // Bạn có thể đặt một thông báo lỗi riêng cho modal tại đây
    // errorMessage.value = `Không thể tải chi tiết đơn hàng ${orderId}.`;
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
  fetchOrders();
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
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
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

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 5px;
}

.sidebar nav ul li a {
  display: block;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.sidebar nav ul li a:hover,
.sidebar nav ul li.active a {
  background-color: #e68900; /* Cam đậm hơn khi hover/active */
}

.content {
  flex-grow: 1;
  padding: 20px;
}

/* Lưu ý: Nếu HeaderAdmin tự quản lý styling của nó, thì các style .header h1, .user-profile img
   có thể không cần ở đây nếu chúng là một phần của HeaderAdmin.
   Nếu HeaderAdmin chỉ là một slot hoặc nội dung đơn giản thì có thể giữ. */
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