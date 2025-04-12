<template>
  <div style="background-color: #EAFAEA; height: 100%;">
    <Navbar />
    <div class="container py-5 d-flex justify-content-center">
      <div class="card shadow p-4 rounded-4 w-75" style="background-color: #EAFAEA">
        <h4 class="text-center mb-4">Pemantauan Tanda-Tanda Vital</h4>
        <form @submit.prevent="submitForm">
          <div class="d-flex flex-row gap-4 flex-wrap">
            <!-- Bagian Kiri -->
            <div class="flex-fill">

              <div class="mb-3 rounded d-flex flex-column">
                <div>
                  <label class="form-label fw-bold">Tekanan Darah (mmHg)</label>
                  <div class="d-flex flex-row  ">
                    <div class=" me-2">
                      <label for="sistolik" class="form-label ">Sistolik</label>
                      <input type="number" id="sistolik" class="form-control w-99 "
                        v-model="form.sistolik" />
                    </div>
                    <div class="">
                      <label for="diastolik" class="form-label">Diastolik</label>
                      <input type="number" id="diastolik" class="form-control w-99" v-model="form.diastolik" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Lainnya -->
              <div>
                <label for="respirasi" class="form-label">Laju Pernapasan (per menit)</label>
                <input type="number" id="respirasi" class="form-control w-75" v-model="form.respirasi" />
              </div>
              <div class="mb-3">
                <label for="suhu" class="form-label">Suhu Tubuh (°C)</label>
                <input type="number" step="0.1" id="suhu" class="form-control w-75" v-model="form.suhu" />
              </div>
              <div class="mb-3">
                <label for="oksigen" class="form-label">Tingkat Saturasi Oksigen (%)</label>
                <input type="number" id="oksigen" class="form-control w-75" v-model="form.oksigen" />
              </div>
            </div>

            <!-- Bagian Kanan -->
            <div class="flex-fill">
              <div class="mb-3">
                <label for="denyut" class="form-label">Denyut Jantung (bpm)</label>
                <input type="number" id="denyut" class="form-control w-50" v-model="form.denyut" />
              </div>
              <div class="mb-3">
                <label for="gula" class="form-label">Kadar Gula Darah (mg/dL)</label>
                <input type="number" id="gula" class="form-control w-50" v-model="form.gula" />
              </div>
              <div class="mb-3">
                <label for="tanggal" class="form-label">Tanggal Pengukuran</label>
                <input type="date" id="tanggal" class="form-control w-50" v-model="form.tanggal" />
              </div>
            </div>
          </div>

          <!-- Tombol -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-success px-4 py-2">Pantau TTV</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '@/components/Navbar.vue'

const form = reactive({
  sistolik: '',
  diastolik: '',
  respirasi: '',
  denyut: '',
  suhu: '',
  gula: '',
  oksigen: '',
  tanggal: ''
})

const submitForm = () => {
  console.log('Data Form:', form)
  alert('Data berhasil dikirim!')
}
</script>

<style scoped>
.card {
  background-color: #eff6ec;
}
</style>
