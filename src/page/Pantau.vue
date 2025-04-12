<template>
  <div style="background-color: #EAFAEA; min-height: 100vh;">
    <Navbar />
    <div class="container py-5 d-flex justify-content-center">
      <div class="card shadow p-4 rounded-4 w-75">
        <h4 class="text-center mb-4">Pemantauan Tanda-Tanda Vital</h4>
        <form @submit.prevent="submitForm">
          <div class="d-flex flex-row gap-4 flex-wrap">
            <!-- Bagian Kiri -->
            <div class="flex-fill rounded p-3">
              <div class="mb-3">
                <label class="form-label fw-bold">Tekanan Darah (mmHg)</label>
                <div class="d-flex flex-row gap-3">
                  <div class="flex-fill">
                    <label for="sistolik" class="form-label">Sistolik</label>
                    <input type="number" id="sistolik" class="form-control custom-input" v-model="form.sistolik" />
                  </div>
                  <div class="flex-fill">
                    <label for="diastolik" class="form-label">Diastolik</label>
                    <input type="number" id="diastolik" class="form-control custom-input" v-model="form.diastolik" />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="respirasi" class="form-label">Laju Pernapasan (per menit)</label>
                <input type="number" id="respirasi" class="form-control custom-input" v-model="form.respirasi" />
              </div>
              <div class="mb-3">
                <label for="suhu" class="form-label">Suhu Tubuh (°C)</label>
                <input type="number" step="0.1" id="suhu" class="form-control custom-input" v-model="form.suhu" />
              </div>
              <div class="mb-3">
                <label for="oksigen" class="form-label">Tingkat Saturasi Oksigen (%)</label>
                <input type="number" id="oksigen" class="form-control custom-input" v-model="form.oksigen" />
              </div>
            </div>

            <!-- Bagian Kanan -->
            <div class="flex-fill rounded p-3 mt-2">
              <div class="mb-3 mt-4">
                <label for="denyut" class="form-label">Denyut Jantung (bpm)</label>
                <input type="number" id="denyut" class="form-control custom-input" v-model="form.denyut" />
              </div>
              <div class="mb-3">
                <label for="gula" class="form-label">Kadar Gula Darah (mg/dL)</label>
                <input type="number" id="gula" class="form-control custom-input" v-model="form.gula" />
              </div>
              <div class="mb-3">
                <label for="tanggal" class="form-label">Tanggal Pengukuran</label>
                <input type="date" id="tanggal" class="form-control custom-input" v-model="form.tanggal" />
              </div>
            </div>
          </div>

          <!-- Tombol -->
          <div class="text-center mt-4">
            <button type="submit" class="custom-button btn btn-success px-4 py-2">Pantau TTV</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
const users = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
const router = useRouter()

const form = reactive({
  sistolik: '',
  diastolik: '',
  respirasi: '',
  denyut: '',
  suhu: '',
  gula: '',
  oksigen: '',
  tanggal: '',
  user: users.email
})

// Fungsi untuk menentukan status dari tiap indikator
const getStatus = () => {
  const status = {
    tekananDarah: 'Normal',
    respirasi: 'Normal',
    denyut: 'Normal',
    suhu: 'Normal',
    gula: 'Normal',
    oksigen: 'Normal'
  }

  const s = parseInt(form.sistolik)
  const d = parseInt(form.diastolik)
  const r = parseInt(form.respirasi)
  const hr = parseInt(form.denyut)
  const t = parseFloat(form.suhu)
  const g = parseInt(form.gula)
  const o2 = parseInt(form.oksigen)

  // Tekanan darah
  if (s >= 140 || d >= 90) {
    status.tekananDarah = 'Darurat'
  } else if (s >= 120 || d >= 80) {
    status.tekananDarah = 'Waspada'
  }

  // Laju napas
  if (r < 12 || r > 25) {
    status.respirasi = 'Darurat'
  } else if (r >= 21 && r <= 25) {
    status.respirasi = 'Waspada'
  }

  // Denyut jantung
  if (hr < 60 || hr > 100) {
    status.denyut = 'Darurat'
  } else if (hr >= 90 && hr <= 100) {
    status.denyut = 'Waspada'
  }

  // Suhu tubuh
  if (t >= 39 || t <= 35) {
    status.suhu = 'Darurat'
  } else if (t >= 37.5 && t < 39) {
    status.suhu = 'Waspada'
  }

  // Gula darah (setelah makan)
  if (g >= 200) {
    status.gula = 'Darurat'
  } else if (g >= 140 && g < 200) {
    status.gula = 'Waspada'
  }

  // Saturasi oksigen
  if (o2 < 90) {
    status.oksigen = 'Darurat'
  } else if (o2 < 95) {
    status.oksigen = 'Waspada'
  }

  return status
}

// Fungsi untuk submit form dan menyimpan data beserta status
const submitForm = () => {
  const existingData = JSON.parse(localStorage.getItem('dataTTV')) || []

  const hasilStatus = getStatus()

  // Gabungkan form dengan status hasil analisis
  const dataBaru = {
    ...form,
    status: hasilStatus
  }

  existingData.push(dataBaru)

  // Simpan ke localStorage
  localStorage.setItem('dataTTV', JSON.stringify(existingData))

  alert('Data berhasil disimpan ke localStorage!')
  console.log('Data Form + Status:', dataBaru)

  // Arahkan ke halaman laporan
  router.push('/laporan')
}
</script>


<style scoped>
.card {
  background-color: #EAFAEA;
}

.custom-button {
  background-color: #6E8E59;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.custom-button:hover {
  background-color: #5a774a;
  transform: scale(1.03);
}

.custom-input {
  background-color: #CAE0BC;
  border: none;
  color: #333;
  transition: box-shadow 0.2s ease;
}
</style>
