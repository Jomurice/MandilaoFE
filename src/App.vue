<script setup>
import login from './components/login/login.vue';
import register from './components/account/register.vue';
import headerUser from './components/headers/headerUser.vue';
</script>

<template>
  <!-- <ul>
    <li><RouterLink to="/login">login</RouterLink></li>
    <li><RouterLink to="/register">register</RouterLink></li>
  </ul> -->
  <RouterView></RouterView>
</template>

<style scoped>

</style>
