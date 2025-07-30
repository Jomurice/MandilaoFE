<script setup>

</script>

<template>
<div class="container mt-4 table-box">
  <h2 class="mb-4 text-orange fw-bold">Danh sách đơn hàng</h2>
  <table class="table table-bordered table-hover table-striped align-middle">
    <thead class="table-orange text-white">
      <tr>
        <th>ID Bàn</th>
        <th>ID Người dùng</th>
        <th>Số lượng món</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody id="orderTableBody">
      <tr>
        <td>12</td>
        <td>user01</td>
        <td>3</td>
        <td>
          <button class="btn btn-sm btn-info me-1">Xem chi tiết</button>
          <button class="btn btn-sm btn-danger">Huỷ</button>
        </td>
      </tr>
      <tr>
        <td>5</td>
        <td>user02</td>
        <td>2</td>
        <td>
          <button class="btn btn-sm btn-info me-1">Xem chi tiết</button>
          <button class="btn btn-sm btn-danger">Huỷ</button>
        </td>
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