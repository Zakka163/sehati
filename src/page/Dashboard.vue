<template>
    <div style="background-color: #EAFAEA; min-height: 100vh;">
        <Navbar />

        <div class="content-container d-flex flex-wrap justify-content-center gap-4 p-4">
            <!-- HealthCard di kiri -->
            <div class="left-box">
                <HealthCard :cards="healthData" />
            </div>

            <!-- Notifikasi di kanan -->
            <div class="right-box mt-1">
                <div class="mt-2">
                    <div class="card p-4 shadow rounded-4 notif-box mt-5">
                        <h6 class="fw-bold">Notifikasi</h6>
                        <ul class="list-unstyled mb-0">
                            <!-- Menampilkan notifikasi berdasarkan data terakhir -->
                            <li v-for="(notif, index) in notifications" :key="index"
                                class="mb-3 d-flex align-items-start">
                                <span class="me-2">📅</span>
                                <div>
                                    <div class="text-muted small">{{ notif.date }}</div>
                                    <div :class="notif.statusClass" class="fw-bold">{{ notif.message }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HealthCard from '@/components/HealthCard.vue'
const router = useRouter() // inisialisasi router
onMounted(()=>{
    
    const users = JSON.parse(localStorage.getItem('loggedInUser'))
   
    console.log("🚀 ~ onMounted ~ users:", users)
    if (!users) {
        return router.push('/login')
    }
})
import {
    HeartPulse,
    Thermometer,
    Activity,
    Droplets,
    Gauge,
    Droplet
} from 'lucide-vue-next'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const users = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
const dataTTV = JSON.parse(localStorage.getItem('dataTTV')) || [];

// Filter data berdasarkan properti 'user' (sesuaikan dengan kondisi yang diinginkan)
const filteredData = dataTTV.filter(item => item.user == users.email);  // Gantilah 'specificUser' dengan kondisi yang sesuai

// Ambil data terakhir dari data yang telah difilter
const lastData = filteredData[filteredData.length - 1] || {};

// Sesuaikan healthData dengan data terakhir
const healthData = [
    {
        title: 'Tekanan Darah',
        value: `${lastData.sistolik || '0'}/${lastData.diastolik || '0'}`,
        unit: 'mmHg',
        status: lastData.status?.tekananDarah || 'Normal',
        icon: HeartPulse
    },
    {
        title: 'Suhu Tubuh',
        value: `${lastData.suhu || '0'}`,
        unit: '°C',
        status: lastData.status?.suhu || 'Normal',
        icon: Thermometer
    },
    {
        title: 'Laju Pernapasan',
        value: `${lastData.respirasi || '0'}`,
        unit: 'bpm',
        status: lastData.status?.respirasi || 'Normal',
        icon: Activity
    },
    {
        title: 'Saturasi Oksigen',
        value: `${lastData.oksigen || '0'}`,
        unit: '%',
        status: lastData.status?.oksigen || 'Normal',
        icon: Droplets
    },
    {
        title: 'Denyut Jantung',
        value: `${lastData.denyut || '0'}`,
        unit: 'bpm',
        status: lastData.status?.denyut || 'Normal',
        icon: Gauge
    },
    {
        title: 'Gula Darah',
        value: `${lastData.gula || '0'}`,
        unit: 'mg/dL',
        status: lastData.status?.gula || 'Normal',
        icon: Droplet
    }
]



// Menentukan notifikasi berdasarkan status
const notifications = []

// Menambahkan notifikasi sesuai kondisi
if (lastData.status?.gula === 'Darurat') {
    notifications.push({
        date: lastData.tanggal,
        message: '❗ Gula Darah: Kadar tinggi setelah makan',
        statusClass: 'text-danger'
    })
}

if (lastData.status?.suhu === 'Waspada') {
    notifications.push({
        date: lastData.tanggal,
        message: '⚠️ Suhu Tubuh: Kategori waspada',
        statusClass: 'text-warning'
    })
}

if (lastData.status?.oksigen === 'Darurat') {
    notifications.push({
        date: lastData.tanggal,
        message: '❗ Saturasi Oksigen: Kadar rendah',
        statusClass: 'text-danger'
    })
}

if (lastData.status?.denyut === 'Darurat') {
    notifications.push({
        date: lastData.tanggal,
        message: '❗ Denyut Jantung: Tidak normal',
        statusClass: 'text-danger'
    })
}
</script>

<style scoped>
.content-container {
    max-width: 1200px;
    margin: auto;
}

.left-box {
    flex: 2;
    min-width: 300px;
}

.right-box {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
}

.notif-box {
    background-color: #EAFAEA;
}

ul {
    max-height: 500px;
    overflow-y: auto;
}
</style>