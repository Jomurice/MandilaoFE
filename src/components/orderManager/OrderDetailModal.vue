<template>
  <div class="modal-overlay" v-if="show" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Chi tiết đơn hàng</h3>
      </div>
      <div class="modal-body">
        <!-- <p><strong>ID:</strong> {{ order.id }}</p>
        <p><strong>Tổng tiền:</strong> {{ formatCurrency(order.totalPrice) }}</p>
        <p><strong>Ngày tạo:</strong> {{ formatDate(order.createdAt) }}</p> -->

        <div class="order-items">
          <h4>Sản phẩm:</h4>
          <table style="width: 100%;">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            
            <tbody >
              <tr v-for="(item, index) in order" :key="index">
                <td>{{ item.name }}</td>
                <td>x{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="$emit('close')" class="close-button">Thoát</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetailModal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => ({
        id: null,
        totalPrice: 0,
        createdAt: "",
        items: []
      })
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(value);
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    },
      getTotalPrice(orderItems) {
      return orderItems.reduce((total, item) => total + (item.price), 0);
  }
  }
};


</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffc107; /* Màu cam nhạt */
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #333;
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  color: white; /* Màu chữ tiêu đề */
}

.modal-body p {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 15px;
  color: white;
}

.order-items {
  background-color: rgba(255, 255, 255, 0.8); /* Nền trắng hơi trong suốt cho danh sách sản phẩm */
  padding: 15px;
  border-radius: 5px;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.item:last-child {
  border-bottom: none;
}

.item-name {
  flex: 3;
}

.item-quantity {
  flex: 1;
  text-align: center;
}

.item-price {
  flex: 2;
  text-align: right;
}

.modal-footer {
  text-align: center;
  margin-top: 20px;
}

.close-button {
  background-color: white;
  color: #ff9800; /* Màu cam */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.close-button:hover {
  background-color: #f0f0f0;
  color: #e68900;
}
</style>