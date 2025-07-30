<script setup>

</script>


<template>

<div class="container mt-5">
  <div class="mx-auto form-box" style="max-width: 500px;">
    <h4 class="mb-3">Tạo sản phẩm mới</h4>
    <form id="createProductForm">
      <div class="mb-2">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <input type="text" class="form-control form-control-sm" id="name" name="name" required>
      </div>

      <div class="mb-2">
        <label for="description" class="form-label">Mô tả</label>
        <textarea class="form-control form-control-sm" id="description" name="description" rows="2" required></textarea>
      </div>

      <div class="row g-2 mb-2">
        <div class="col">
          <label for="price" class="form-label">Giá</label>
          <input type="number"  class="form-control form-control-sm" id="price" name="price" required>
        </div>
        <div class="col">
          <label for="quantity" class="form-label">Số lượng</label>
          <input type="number" class="form-control form-control-sm" id="quantity" name="quantity" required>
        </div>
      </div>

      <div class="mb-2">
        <label for="id_category" class="form-label">Loại sản phẩm</label>
        <select class="form-select form-select-sm" id="id_category" name="id_category" required>
          <option value="">-- Chọn loại --</option>
          <option value="">Thịt gà</option>
          <option value="">Thịt bò</option>
         
        </select>
      </div>

      <div class="mb-2">
        <label for="photo" class="form-label">Ảnh sản phẩm</label>
        <input type="file" class="form-control form-control-sm" id="photo" name="photo" accept="image/*" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Sản phẩm chính?</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="isMain" value="true" id="mainTrue">
          <label class="form-check-label" for="mainTrue">Chính</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="isMain" value="false" id="mainFalse">
          <label class="form-check-label" for="mainFalse">Phụ</label>
        </div>
      </div>

      <button type="submit" class="btn btn-sm btn-orange">Tạo sản phẩm</button>
    </form>
  </div>
</div>


<div class="container mt-4 table-box">
  <h2 class="mb-4">Danh sách sản phẩm</h2>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Ảnh</th>
        <th>Tên sản phẩm</th>
        <th>Mô tả</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Loại</th>
        <th>Sản phẩm chính</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody id="productTableBody">
      <tr>
        <td><img src="https://file.hstatic.net/200000318501/article/8.3_a548fede66674393abe6012c1f1880bb.jpg" alt="Ảnh" width="50" height="50"></td>
        <td>Thịt bò wagyu</td>
        <td> wagyu</td>
        <td>19990000</td>
        <td>5</td>
        <td>Thịt bò</td>
        <td>true</td>
        <td>
          <button class="btn btn-sm btn-warning me-1 ">Sửa</button>
          <button class="btn btn-sm btn-danger">Xoá</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

</template>


<style scoped>
  .form-box {
    background-color: #fff7f0;
    border: 1px solid #fd7e14;
    border-radius: 8px;
    padding: 20px;
  }

  h4, h2 {
    color: #fd7e14;
  }

  .btn-orange {
    background-color: #fd7e14;
    border-color: #fd7e14;
    color: white;
  }

  .btn-orange:hover {
    background-color: #e96b0d;
    border-color: #e96b0d;
  }

  .table thead {
    background-color: #fff3e0;
    color: #fd7e14;
  }
  
  .table-box {
  max-width: 1000px;
  margin: 0 auto;
}
  .table-hover tbody tr:hover {
    background-color: #fff1e6;
  }
</style>