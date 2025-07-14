<script setup>

</script>

<template>
  <div class="event-detail">
    <h1 class="title-event">Combo 1 người</h1>
    <div class="image-wrapper">
      <img src="/img/Background1.jpg" alt="Combo 1 người" />
    </div>

    <div class="info-event">
      <p class="price">Giá: <strong>349k</strong></p>
      <p class="description-event">
        Gói combo dành cho 1 người với đầy đủ món khai vị, món chính và tráng miệng. 
        Hoàn hảo cho bữa ăn đơn giản nhưng đầy đủ hương vị!
      </p>
        <button class="btn"> <- Quay lại</button>
      </div>
    </div>

</template>

<style scoped>
.event-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #fff;
}

.title-event {
  font-size: 32px;
  text-align: center;
  color: #b22222;
  margin-bottom: 20px;
}

.image-wrapper {
  text-align: center;
}

.image-wrapper img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.info-event {
  margin-top: 20px;
}

.price {
  font-size: 24px;
  color: #444;
  font-weight: bold;
}

.description-event {
  margin: 15px 0;
  font-size: 16px;
}




.btn {
  padding: 10px 20px;
  background-color: #b22222;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}



.btn:hover {
  opacity: 0.9;
   background-color: #640202;
}
</style>
