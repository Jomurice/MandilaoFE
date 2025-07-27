<template>
  <div class="admin-page">
    <HeaderAdmin />
    <div class="admin-layout">
      <SidebarAdmin />
      <div class="table-page">
        <h2>Danh sách bàn</h2>
        <div class="table-container">
          <!-- Standard + Outdoor -->
          <div class="standard-section">
            <h3>Standard & Outdoor</h3>
            <div class="table-grid">
              <div
                v-for="table in standardTables"
                :key="table.id"
                class="table-item"
                :class="{ booked: table.status === 'Reserved' || table.status === 'Occupied', available: table.status === 'Available' }"
                @click="showDetail(table)"
              >
                {{ table.name }} ({{ table.tableTypeName }})
              </div>
            </div>
          </div>

          <!-- VIP Tables -->
          <div class="vip-section">
            <h3>VIP Pro Max</h3>
            <div class="vip-list">
              <div
                v-for="table in vipTables"
                :key="table.id"
                class="table-item"
                :class="{ booked: table.status === 'Reserved' || table.status === 'Occupied', available: table.status === 'Available' }"
                @click="showDetail(table)"
              >
                {{ table.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Popup Table Detail -->
        <div class="popup" v-if="selectedTable">
          <h3>Chi tiết bàn</h3>
          <div class="popup-content">
            <p><strong>Số bàn:</strong> {{ selectedTable.name }}</p>
            <p>
              <strong>Loại bàn:</strong>
              <select v-model="selectedTable.tableTypeName">
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <select v-model="selectedTable.status">
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Occupied">Occupied</option>
              </select>
            </p>
            <div class="actions">
              <button @click="selectedTable = null">Thoát</button>
              <button @click="updateTable(selectedTable)">Cập nhật</button>
            </div>
          </div>
        </div>

        <!-- Popup Booking Detail -->
        <div class="popup booking-popup" v-if="showBooking">
          <h3>Booking Detail</h3>
          <p><strong>Booking time:</strong> 7:00 PM 3/7/2025</p>
          <p><strong>Status:</strong> chưa đến</p>
          <p><strong>Note:</strong></p>
          <textarea rows="4" readonly>
            Làm tiệc đính hôn, 2 người, chuẩn bị giúp khách dàn kèn tây
          </textarea>
          <div class="actions">
            <button @click="showBooking = false">Thoát</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import HeaderAdmin from '../headers/HeaderAdmin.vue'
import SidebarAdmin from '../headers/SidebarAdmin.vue'

// ✅ Gắn token trực tiếp (lấy từ Postman)
const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ0aWVuIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NTM1MDAxOTcsImlhdCI6MTc1MzQ5NjU5Nywic2NvcGUiOiJST0xFX0FETUlOIn0.BZpchagOz1jnkggHZv2Hq0XzyxCMp-0DG_hh3zZ3ZeweSnD0xPHFqzOa-aKOsZqGFO-QneebOTBX8MArrJ_kNA";

const tables = ref([]);
const selectedTable = ref(null);
const showBooking = ref(false);
const loading = ref(false);
const error = ref("");

// ✅ Danh sách bàn phân loại
const vipTables = computed(() => tables.value.filter((t) => t.tableTypeName === "VIP"));
const standardTables = computed(() =>
  tables.value.filter((t) => t.tableTypeName === "Standard" || t.tableTypeName === "Outdoor")
);


// ✅ Lấy danh sách bàn
async function fetchTables() {
  loading.value = true;
  try {
    const resp = await axios.get("http://localhost:8080/identity/tables", {
      headers: { Authorization: `Bearer ${token}` },
    });
    tables.value = resp.data.result;
  } catch (err) {
    error.value = "Không thể tải danh sách bàn!";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function updateTable(table) {
  try {
    // ✅ Token hardcode (tránh lỗi 401)
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJ0aWVuIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3NTM1MDAxOTcsImlhdCI6MTc1MzQ5NjU5Nywic2NvcGUiOiJST0xFX0FETUlOIn0.BZpchagOz1jnkggHZv2Hq0XzyxCMp-0DG_hh3zZ3ZeweSnD0xPHFqzOa-aKOsZqGFO-QneebOTBX8MArrJ_kNA";

    // ✅ Ánh xạ lại đúng theo DB
    let tableTypeId;
    if (table.tableTypeName === "VIP") tableTypeId = 1;
    else if (table.tableTypeName === "Standard") tableTypeId = 2;
    else if (table.tableTypeName === "Outdoor") tableTypeId = 3;

    await axios.put(
      `http://localhost:8080/identity/tables/${table.id}`,
      {
        name: table.name,
        status: table.status, // Available, Reserved, Occupied
        tableTypeId: tableTypeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert(`✅ Cập nhật bàn ${table.name} thành công!`);
    await fetchTables(); // Load lại danh sách sau khi cập nhật
    selectedTable.value = null;
  } catch (err) {
    alert("❌ Cập nhật thất bại!");
    console.error(err);
  }
}



function showDetail(table) {
  selectedTable.value = { ...table };
}

function showBookingDetail() {
  showBooking.value = true;
}

onMounted(fetchTables);
</script>


<style scoped>
.admin-layout {
  display: flex;
}

.table-page {
  padding: 20px;
  flex: 1;
}

.table-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
}

/* Standard Section */
.standard-section {
  flex: 3;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  gap: 20px;
}

/* VIP Section */
.vip-section {
  width: 200px;
  height: 500px;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 15px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  position: sticky;
  top: 100px;
  overflow-y: auto;
}

.vip-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.table-item {
  padding: 15px;
  text-align: center;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.table-item.available {
  background-color: green;
}

.table-item.booked {
  background-color: red;
}

/* Popup */
.popup {
  position: fixed;
  top: 30%;
  left: 35%;
  background: #ff9900;
  padding: 20px;
  border-radius: 15px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.actions button {
  padding: 8px 16px;
  border: none;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
