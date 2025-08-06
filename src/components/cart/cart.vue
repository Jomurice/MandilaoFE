<script setup>


import { ref , onMounted} from 'vue';
import axios from 'axios';

const note = ref('');
const err = ref('');
const cartItems = ref([]);
const msg = ref('');

function load() {
  try {
    cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    cartItems.value = [];
    console.error("Lỗi khi parse cart từ localStorage:", e);
  }
}



const upq = item => item.quantity++;
const downq = item =>{
    if(item.quantity >1 )item.quantity--; 
}

const updateLocalStorage = () =>{localStorage.setItem('cart',JSON.stringify(cartItems.value))}

const formatPrice = price => price.toLocaleString('vi-VN') + ' VNĐ'

async function placeCart(cartItems) {
  // const validItems = cartItems.value.filter(item => item.quantity > 0);
  // if (validItems.length === 0) {
  //   err.value = 'Phải chọn ít nhất 1 món';
  //   return;
  // }

  // const id_table = localStorage.getItem("table"); 

  // if (!id_table) {
  //   err.value = 'Không xác định được bàn, vui lòng quét mã QR';
  //   return;
  // }

  const cart = {
  // id_user: null,  
  id_table: 1,
  orderDetaiList: cartItems.map(item => ({
    id_product: item.id,
    quantity: item.quantity
  }))
};

  try {
    const url = "http://localhost:8080/identity/order/call";
    await axios.post(url, cart, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    msg.value = 'Đặt món thành công!';
    localStorage.removeItem('cart');
    console.log("Gọi món thành công");
    load()
  } catch (e) {
    console.error("Lỗi gửi cart", e);
    err.value = 'Lỗi gọi món';
  }
}

onMounted(() =>{
  load();
});

</script>

<template>
  <div class="content">
    <div class="left">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image || 'https://via.placeholder.com/80x80?text=No+Image'" alt="img" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="bottom-row">
            <div class="quantity">
              <button @click="downq(item)">-</button>
              <input type="number" v-model="item.quantity" min="1" />
              <button @click="upq(item)">+</button>
            </div>
            <div class="price">{{ formatPrice(item.price * item.quantity) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <textarea placeholder="Ghi chú" v-model="note"></textarea>
      <button @click="placeCart">Gọi món</button>
      <p class="error" v-if="err">{{ err }}</p>
      <p class="success" v-if="msg">{{ msg }}</p>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  align-items: center;
  background: #fafafa;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  font-size: 1.1rem;
  font-weight: 500;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity input {
  width: 60px;
  text-align: center;
}

.price {
  font-weight: bold;
  color: #2b2b2b;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea {
  margin-top: 1rem;
  padding: 0.75rem;
  resize: vertical;
  min-height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 1.2rem;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: orange;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.success {
  color: green;
  margin-top: 0.5rem;
}
</style>
