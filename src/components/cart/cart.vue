<script setup>
import HeaderUser from '../headers/headerUser.vue';
import { ref , onMounted} from 'vue';
import axios from 'axios';


const note = ref('');
const err = ref('');
const cartItems = ref([]);
const msg = ref('')

onMounted( fill = () =>{
    // const loginInfo = JSON.parse(sessionStorage.getItem("userLogin"));
    // const token = loginInfo?.result?.token;
    // const headers = { Authorization: `Bearer ${token}` };
    
    const storeCart = JSON.parse(localStorage.getItem('cart') || []);
    cartItems.value = storeCart;
})

const upq = item => item.quantity++;updateLocalStorage();
const downq = item =>{
    if(item.quantity >1 )item.quantity--;updateLocalStorage();
}

const updateLocalStorage = () =>{localStorage.setItem('cart',JSON.stringify(cartItems.value))}

const formatPrice = price => price.toLocaleString('vi-VN') + ' VNĐ'

const placeCart = () =>{
    const validItems = cartItems.value.filter(item => item.quantity > 0)
    if(validItems.length === 0) {
        err.value = 'Phải chọn ít nhất 1 món';
        return;
    }

    const cart = {
        items: validItems.map(item=>({
            id: item.id,
            name:item.name,
            quantity:item.quantity,
            totalPrice: item.totalPrice
        })),
        note: note.value
    }
    // ham nay test lai nhe a 
    // try{
    //     await axios.post('/order',cart)
    //     msg = 'Success'
    //    localStorage.removeItem('cart')
    // }catch(e){
    //     console.error("Error send cart",e)
    //     err.value = 'Lỗi gọi món'
    // }
}


</script>

<template>
    <div>
      <HeaderUser/>
    </div>
    <div class="content">
        <div class="left">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <img :src="item.image" alt="img"/>
                <div class="info">
                    <div class="name">{{ item.name }}</div>
                    <div class="quantity">
                        <button @click="downq(item)">-</button>
                        <input type="number" name="quantity" id="quantity" value="{{ item.quantity }}"/>
                        <button @click="upq(item)">+</button>
                    </div>
                    <div class="price">{{ formatPrice(item.price * item.quantity) }} VNĐ</div>
                </div>
            </div>
        </div>

        <div class="right">
            <textarea placeholder="Ghi chú" v-model="note"></textarea>
            <button>Gọi món</button>
        </div>
    </div>


</template>

<style scoped>
.content {
  display: flex;
  gap: 2rem;
  padding: 2rem;
}

.left {
  flex: 2;
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.menu-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-control input {
  width: 50px;
  text-align: center;
}

.price {
  font-weight: bold;
  color: #2b2b2b;
}

textarea {
  margin-top: 1rem;
  padding: 0.5rem;
  resize: vertical;
  min-height: 100px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
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