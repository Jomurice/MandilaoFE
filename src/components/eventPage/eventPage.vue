<script setup>
const hello = "hello";
</script>

<template>
  <div class="content-event">
    <h1 class="title-event">Sự kiện</h1>
    <div class="container">
      <div class="card">
        <img src="/img/Background1.jpg" alt="Combo 1 người" />
        <div class="text-overlay">
          <h2>Combo 1 người</h2>
          <p>349k</p>
        </div>
        <router-link to="/eventdetail" class="btn">Read More</router-link>
      </div>

      <div class="card">
        <img src="/img/Background1.jpg" alt="Combo couple" />
        <div class="text-overlay">
          <h2>Combo couple</h2>
          <p>749k</p>
        </div>
         <router-link to="/eventdetail" class="btn">Read More</router-link>
      </div>

      <div class="card">
        <img src="/img/Background1.jpg" alt="Combo family" />
        <div class="text-overlay">
          <h2>Combo family</h2>
          <p>1249k</p>
        </div>
        <router-link to="/eventdetail" class="btn">Read More</router-link>
      </div>

      <div class="card">
        <img src="/img/Background1.jpg" alt="Thành viên mới" />
        <div class="text-overlay">
          <h2>Thành viên mới</h2>
          <p>249k</p>
        </div>
         <router-link to="/eventdetail" class="btn">Read More</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-event {
  background: #fff;
  text-align: center;
}

h1 {
  margin-top: 20px;
  color: #444;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: auto;
  display: block;
}

.text-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: #fff;
  text-align: left;
  max-width: 80%;
}

.text-overlay h2 {
  font-size: 30px;
  margin: 0;
  font-weight: bold;
}

.text-overlay p {
  font-size: 27px;
  color: #ef061e;
  font-weight: bold;
  margin: 5px 0 0 0;
  
}

.btn {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: #b22222;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
}

.btn:hover {
  background-color: #640202;
}

@media (max-width: 499px) {
  .text-overlay {
    padding: 8px 10px;
  }

  .text-overlay h2 {
    font-size: 16px;
  }

  .text-overlay p {
    font-size: 20px;
  }

  .btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
