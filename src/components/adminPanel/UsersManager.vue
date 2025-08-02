<script setup>

</script>

<template>
<div class="container mt-4 table-box">
  <h2 class="mb-4 text-orange fw-bold">Danh sách người dùng</h2>
  <table class="table table-bordered table-hover table-striped align-middle">
    <thead class="table-orange text-white">
      <tr>
    
        <th>Username</th>
        <th>Email</th>
        <th>Điện thoại</th>
        <th>Ngày sinh</th>
        <th>Họ và tên</th>
        <th>Vai trò</th>
       
      </tr>
    </thead>
    <tbody >
      <tr>
        <td>DungKick</td>
        <td>Dung@gmail.com</td>
        <td>0123456789</td>
        <td>03-04-2005</td>
        <td>Trung Dũng</td>
        <td>USER</td>
      </tr>
    </tbody>
  </table>
</div>



</template>

<style scoped>
 .text-orange {
    color: #ff8800;
  }

  .table-orange {
    background-color: #ffa500;
  }
</style>