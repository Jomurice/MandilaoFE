<template>
  <div class="home-user-container">
    

    <!-- Banner -->
    <section class="main-banner">
      <img src="/img/Background1.jpg" alt="Main Banner" class="banner-image">
      <div class="banner-overlay">
        <h1 class="banner-title">Made in Vietnamese.</h1>
        <h2 class="banner-subtitle">Enjoy in restaurant.</h2>
      </div>
      <div class="carousel-nav left"> &lt; </div>
      <div class="carousel-nav right"> &gt; </div>
    </section>

    <!-- <section class=".events-section">
      <EventPage/>
    </section> -->
     

    <!-- Món mới -->
    <section class="new-dishes-section">
      <h2 class="section-title">Món mới</h2>

      <div class="dishes-carousel-wrapper">
        <div class="carousel-nav-small left" @click="prevDish"> &lt; </div>

        <div class="new-dishes-grid">
          <div v-for="dish in visibleDishes" :key="dish.id" class="dish-card">
            <img :src="dish.image" :alt="dish.name" class="dish-image" />
            <h4 class="dish-name">{{ dish.name }}</h4>
            <p class="dish-price">{{ dish.price }}</p>
          </div>
        </div>

        <div class="carousel-nav-small right" @click="nextDish"> &gt; </div>
      </div>
    </section>

   
    <!-- Footer -->
    <footer class="footer-container">
      <div class="footer-info">
        <p>Địa chỉ:</p>
        <p>Phone:</p>
        <p>Fanpage:</p>
      </div>
      <div class="footer-logo">
        <img src="" alt="Footer Logo">
      </div>
      <div class="footer-info">
        <p>Địa chỉ:</p>
        <p>Phone:</p>
        <p>Fanpage:</p>
      </div>
    </footer>

    <!-- Floating Buttons -->
    <div class="floating-buttons">
      <button class="notification-btn">🔔</button>
      <button class="scroll-top-btn" @click="scrollToTop">⬆</button>
    </div>
  </div>
</template>

<script >



import HeaderUser from '../headers/headerUser.vue';
export default {
  name: 'HomeUser',
  components: { HeaderUser },
  data() {
    return {
      startIndex: 0,
      itemsPerPage: 3,
      events: [
        { id: 1, title: 'Thành viên mới', price: '249K', image: 'event1.jpg' },
        { id: 2, title: 'Combo couple', price: '749k', image: 'event2.jpg' },
        { id: 3, title: 'Summer Sale', price: '299k', image: 'event3.jpg' },
      ],
      newDishes: [
        { id: 1, name: 'Wagyu Jepang', price: '480.000 VNĐ', image: '/img/p1.jpg' },
        { id: 2, name: 'Lidah Sapi NZ', price: '118.000 VNĐ', image: '/img/p2.jpg' },
        { id: 3, name: 'US Angus', price: '198.000 VNĐ', image: '/img/p3.jpg' },
        { id: 4, name: 'US Angus 2', price: '198.000 VNĐ', image: '/img/p4.jpg' },
        { id: 5, name: 'US Angus 3', price: '198.000 VNĐ', image: '/img/p5.jpg' },
      ]
    };
  },
  computed: {
    visibleDishes() {
      return this.newDishes.slice(this.startIndex, this.startIndex + this.itemsPerPage);
    }
  },
  methods: {
    nextDish() {
      if (this.startIndex + this.itemsPerPage < this.newDishes.length) {
        this.startIndex += this.itemsPerPage;
      }
    },
    prevDish() {
      if (this.startIndex - this.itemsPerPage >= 0) {
        this.startIndex -= this.itemsPerPage;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.home-user-container {
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow-x: hidden;

}

.main-banner {
  position: relative;
  width: 100vw;
  height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10%;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.banner-title {
  font-size: 3.5em;
  margin-bottom: 5px;
  text-align: left;
}

.banner-subtitle {
  font-size: 2.5em;
  margin-top: 0;
  text-align: left;
}

.carousel-nav,
.carousel-nav-small {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.2em;
  user-select: none;
}

.carousel-nav.left { left: 20px; }
.carousel-nav.right { right: 20px; }
.carousel-nav-small.left { left: 0; }
.carousel-nav-small.right { right: 0; }

.section-title {
  text-align: center;
  margin: 40px auto 20px;
  max-width: 1200px;
  padding: 0 20px;
  font-size: 2.5em;
  color: #333;
}

.events-section {
  padding: 20px 0;
}

.events-grid {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.event-card {
  position: relative;
  width: 100%;
  max-width: 550px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.event-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.event-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.event-title {
  font-size: 2.2em;
  margin-bottom: 5px;
}

.event-price {
  font-size: 2.5em;
  font-weight: bold;
  color: #FFD700;
  margin-top: 0;
}

.read-more-btn {
  background-color: orange;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.read-more-btn:hover {
  background-color: darkorange;
}

.new-dishes-section {
  padding: 40px 0;
  background-color: #fff;
}

.dishes-carousel-wrapper {
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.new-dishes-grid {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 30px;
  padding: 0 20px;
}

.new-dishes-grid::-webkit-scrollbar {
  display: none;
}

.dish-card {
  flex: 0 0 350px;
  max-width: 350px;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
  padding-bottom: 20px;
}

.dish-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  margin-bottom: 15px;
}

.dish-name {
  font-size: 1.5em;
  margin: 0 10px 10px;
  color: #333;
}

.dish-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #FFA500;
}

.footer-container {
  background-color: #FFA500;
  padding: 30px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  margin-top: 50px;
}

.footer-info p {
  margin: 5px 0;
  font-size: 1em;
}

.footer-logo img {
  height: 80px;
  object-fit: contain;
}

.floating-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}

.notification-btn,
.scroll-top-btn {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.notification-btn:hover,
.scroll-top-btn:hover {
  background-color: #ff8000;
}

@media (max-width: 768px) {
  .main-banner { height: 300px; }
  .banner-title { font-size: 2.5em; }
  .banner-subtitle { font-size: 1.8em; }
  .events-grid, .new-dishes-grid {
    flex-direction: column;
    align-items: center;
  }
  .event-card, .dish-card { max-width: 90%; }
  .section-title { font-size: 2em; text-align: center; }
  .footer-container {
    flex-direction: column;
    text-align: center;
  }
  .footer-info, .footer-logo { margin-bottom: 20px; }
}

@media (max-width: 480px) {
  .banner-title { font-size: 2em; }
  .banner-subtitle { font-size: 1.5em; }
  .event-title { font-size: 1.8em; }
  .event-price { font-size: 2em; }
}
</style>