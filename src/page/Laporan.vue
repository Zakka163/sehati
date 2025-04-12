<template>
    <div style="background-color: #EAFAEA; min-height: 100vh;">
        <Navbar />

        <!-- Card to contain the chart -->
        <div class="container py-5 ">

            <div v-if="data.length > 0" style="background-color: #EAFAEA;" class="shadow card mb-5 p-4">
                <h5 class="text-center">Grafik Pemantauan TTV</h5>
                <div class="card-body">
                    <TTVChart :dataTTV="data" />
                </div>
            </div>

            <div v-if="data.length > 0" class="shadow card mb-4 p-3"
                style="background-color: #EAFAEA;  border-radius: 10px;">
                <h5 class="text-center mb-4">Riwayat Pemantauan TTV</h5>
                <ul class="list-group mb-4" style="max-height: 400px; overflow-y: auto;">
                    <li class="list-group-item list-group-item-action" v-for="(item, index) in data" :key="index"
                        @click="showDetail(item)" style="cursor: pointer; transition: background-color 0.2s;"
                        @mouseover="e => e.target.style.backgroundColor = '#6E8E59'"
                        @mouseleave="e => e.target.style.backgroundColor = ''">
                        Pengukuran Tanggal {{ item.tanggal }}
                    </li>
                </ul>
            </div>

            <div v-else class="alert alert-warning text-center">
                Belum ada data TTV yang tersimpan.
            </div>

        </div>

        <!-- Modal Overlay -->
        <div v-if="selectedItem" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content shadow-lg p-4 rounded">
                <button class="btn-close-modal" @click="closeModal">×</button>
                <h5 class="modal-title">Detail Pengukuran</h5>
                <div class="detail-info">
                    <p><strong>Tanggal:</strong> {{ selectedItem.tanggal }}</p>
                    <p><strong>Tekanan Darah:</strong> {{ selectedItem.sistolik }}/{{ selectedItem.diastolik }} mmHg</p>
                    <p><strong>Laju Pernapasan:</strong> {{ selectedItem.respirasi }} /menit</p>
                    <p><strong>Denyut Jantung:</strong> {{ selectedItem.denyut }} bpm</p>
                    <p><strong>Suhu Tubuh:</strong> {{ selectedItem.suhu }} °C</p>
                    <p><strong>Gula Darah:</strong> {{ selectedItem.gula }} mg/dL</p>
                    <p><strong>Saturasi Oksigen:</strong> {{ selectedItem.oksigen }} %</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import TTVChart from '@/components/TTVchart.vue'

const data = ref([])
const selectedItem = ref(null)


onMounted(() => {
    const users = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    const stored = localStorage.getItem('dataTTV')
    if (stored) {
        const parsedData = JSON.parse(stored)

        // Filter data berdasarkan properti 'user' 
        const filteredData = parsedData.filter(item => item.user == users.email)  // Sesuaikan dengan kondisi filter yang diinginkan

        // Menyimpan data yang telah difilter ke dalam data
        data.value = filteredData
    }
})

const showDetail = (item) => {
    selectedItem.value = item
}

const closeModal = () => {
    selectedItem.value = null
}
</script>
<style scoped>
/* Modal Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Content */
.modal-content {
    background-color: #ffffff;
    max-width: 500px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* List Item */
.list-group-item-action {
    cursor: pointer;
    border: none;
    background-color: #CAE0BC;
    transition: background-color 0.3s;
    color: black;
    font-weight: 500;
}

.list-group-item-action:hover {
    background-color: #EAFAEA;
}

/* Detail Info Style */
.detail-info p {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
}

/* Container */
.container {
    max-width: 1200px;
}

/* Center Text */
.text-center {
    text-align: center;
}

/* Button Style */
.btn-sm {
    padding: 0.25rem 0.5rem;
}

/* Card Title */
.card-title {
    font-size: 1.5rem;
    color: #6E8E59;
}

/* Card Style */
.card {
    border: none;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(110, 142, 89, 0.2);
}

/* Card Header */


/* Card Body */
.card-body {
    padding: 20px;
}

/* Page Background */
body,
.bg-main {
    background-color: #EAFAEA;
}

/* Alert Warning */
.alert-warning {
    background-color: #fff3cd;
    color: #856404;
    border: none;
    border-radius: 6px;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #ffffff;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    padding: 24px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-title {
    color: #2e7d32;
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.detail-info p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
}

.btn-close-modal {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    color: #dc3545;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.btn-close-modal:hover {
    transform: scale(1.2);
}

/* Modal Overlay */
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Content */
.modal-content {
    background-color: #ffffff;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    padding: 24px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Modal Title */
.modal-title {
    color: #2e7d32;
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

/* Detail Info */
.detail-info p {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
}

/* Close Button */
.btn-close-modal {
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    color: #dc3545;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.btn-close-modal:hover {
    transform: scale(1.2);
}

/* Responsive */
@media (max-width: 1200px) {
    .container {
        padding-left: 15px;
        padding-right: 15px;
    }

    .modal-content {
        max-width: 400px;
        padding: 20px;
    }

    .card-body {
        padding: 15px;
    }
}

@media (max-width: 992px) {
    .container {
        padding-left: 10px;
        padding-right: 10px;
    }

    .card-body {
        padding: 15px;
    }

    .modal-content {
        width: 85%;
        max-width: 400px;
        padding: 20px;
    }

    .list-group-item-action {
        font-size: 14px;
    }
}

@media (max-width: 768px) {
    .list-group-item-action {
        font-size: 12px;
    }

    .modal-content {
        width: 90%;
        padding: 18px;
    }

    .card-body {
        padding: 10px;
    }

    .container {
        padding: 10px;
    }

    .btn-close-modal {
        font-size: 1.25rem;
        top: 10px;
        right: 10px;
    }
}

@media (max-width: 576px) {
    .modal-content {
        width: 95%;
        padding: 15px;
    }

    .list-group-item-action {
        font-size: 12px;
    }

    .card-body {
        padding: 10px;
    }

    .container {
        padding: 0;
    }

    .modal-title {
        font-size: 1.1rem;
    }

    .btn-close-modal {
        font-size: 1.25rem;
        top: 8px;
        right: 8px;
    }
}
</style>
