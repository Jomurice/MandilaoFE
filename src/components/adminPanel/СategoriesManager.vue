<script setup>
</script>

<template>
 <div class="container mt-5">
  <div class="mx-auto form-box" style="max-width: 500px;">
    <h4 class="mb-3 text-orange fw-bold">Tạo loại sản phẩm mới</h4>
    <form id="createCategoryForm">
      <div class="mb-2">
        <label for="name" class="form-label">Tên loại sản phẩm</label>
        <input
          type="text"
          class="form-control form-control-sm hover-input"
          id="name"
          name="name"
          placeholder="Nhập tên loại"
          required
        />
      </div>

      <div class="mb-2">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          class="form-control form-control-sm hover-input"
          id="description"
          name="description"
          rows="2"
          placeholder="Nhập mô tả (nếu có)"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-sm btn-orange mt-3">Tạo loại sản phẩm</button>
    </form>
  </div>
</div>

<div class="container mt-4 table-box">
  <h2 class="mb-4 text-orange fw-bold">Danh sách loại sản phẩm</h2>
  <table class="table table-bordered table-hover table-striped align-middle">
    <thead class="table-orange text-white">
      <tr>
        <th>STT</th>
        <th>Tên loại</th>
        <th>Mô tả</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody id="categoryTableBody">
      <tr>
        <td>1</td>
        <td>Điện thoại</td>
        <td>Thiết bị di động thông minh</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">Sửa</button>
          <button class="btn btn-sm btn-danger">Xoá</button>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>Máy tính</td>
        <td>Dùng cho học tập và làm việc</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">Sửa</button>
          <button class="btn btn-sm btn-danger">Xoá</button>
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

  .btn-orange {
    background-color: #ffa500;
    color: white;
    font-weight: 600;
    border: none;
    transition: background-color 0.3s ease;
  }
  .btn-orange:hover {
    background-color: #e69500;
    cursor: pointer;
  }

  .hover-input {
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .hover-input:hover,
  .hover-input:focus {
    box-shadow: 0 0 8px 2px rgba(255, 165, 0, 0.6);
    border-color: #ffa500;
    outline: none;
  }

  .table-orange {
    background-color: #ffa500;
  }
</style>
