<template>
  <div style="background-color: #eafaea; min-height: 100vh">
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
              <li v-for="(notif, index) in notifications" :key="index" class="mb-3 d-flex align-items-start">
                <span class="me-2">📅</span>
                <div>
                  <div class="text-muted small">{{ notif.date }}</div>
                  <div :class="notif.statusClass" class="fw-bold">
                    {{ notif.message }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Judul Artikel -->
      <div class="w-100 text-center mt-3 mb-2">
        <h4 class="fw-bold text-success">Berita dan Edukasi Kesehatan</h4>
      </div>

      <!-- VideoCard Section -->
      <div class="w-100 d-flex flex-wrap justify-content-center gap-4 mt-4">
        <VideoCard v-for="(video, index) in videoList" :key="index" :video="video" />
      </div>


      <!-- ArtikelCard Section -->
      <div class="flex flex-wrap justify-center gap-4 mt-3">
        <ArticleCard :articles="articleList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import HealthCard from "@/components/HealthCard.vue";
import VideoCard from "../components/VideoCard.vue";
import ArticleCard from "../components/ArticleCard.vue";
import artikel_1 from '@/assets/artikel_1.jpeg';
import artikel_2 from '@/assets/artikel_2.jpeg';
import artikel_3 from '@/assets/artikel_3.jpeg';
import artikel_4 from '@/assets/artikel_4.jpeg';
const router = useRouter(); // inisialisasi router
onMounted(() => {
  const users = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log("🚀 ~ onMounted ~ users:", users);
  if (!users) {
    return router.push("/login");
  }
});
import {
  HeartPulse,
  Thermometer,
  Activity,
  Droplets,
  Gauge,
  Droplet,
} from "lucide-vue-next";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const users = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
const dataTTV = JSON.parse(localStorage.getItem("dataTTV")) || [];

// Filter data berdasarkan properti 'user' (sesuaikan dengan kondisi yang diinginkan)
const filteredData = dataTTV.filter((item) => item.user == users.email); // Gantilah 'specificUser' dengan kondisi yang sesuai

// Ambil data terakhir dari data yang telah difilter
const lastData = filteredData[filteredData.length - 1] || {};

// Sesuaikan healthData dengan data terakhir
const healthData = [
  {
    title: "Tekanan Darah",
    value: `${lastData.sistolik || "0"}/${lastData.diastolik || "0"}`,
    unit: "mmHg",
    status: lastData.status?.tekananDarah || "Normal",
    icon: HeartPulse,
  },
  {
    title: "Suhu Tubuh",
    value: `${lastData.suhu || "0"}`,
    unit: "°C",
    status: lastData.status?.suhu || "Normal",
    icon: Thermometer,
  },
  {
    title: "Laju Pernapasan",
    value: `${lastData.respirasi || "0"}`,
    unit: "bpm",
    status: lastData.status?.respirasi || "Normal",
    icon: Activity,
  },
  {
    title: "Saturasi Oksigen",
    value: `${lastData.oksigen || "0"}`,
    unit: "%",
    status: lastData.status?.oksigen || "Normal",
    icon: Droplets,
  },
  {
    title: "Denyut Jantung",
    value: `${lastData.denyut || "0"}`,
    unit: "bpm",
    status: lastData.status?.denyut || "Normal",
    icon: Gauge,
  },
  {
    title: "Gula Darah",
    value: `${lastData.gula || "0"}`,
    unit: "mg/dL",
    status: lastData.status?.gula || "Normal",
    icon: Droplet,
  },
];

// Menentukan notifikasi berdasarkan status
const notifications = [];

// Menambahkan notifikasi sesuai kondisi
if (lastData.status?.gula === "Darurat") {
  notifications.push({
    date: lastData.tanggal,
    message: "❗ Gula Darah: Kadar tinggi setelah makan",
    statusClass: "text-danger",
  });
}

if (lastData.status?.suhu === "Waspada") {
  notifications.push({
    date: lastData.tanggal,
    message: "⚠️ Suhu Tubuh: Kategori waspada",
    statusClass: "text-warning",
  });
}

if (lastData.status?.oksigen === "Darurat") {
  notifications.push({
    date: lastData.tanggal,
    message: "❗ Saturasi Oksigen: Kadar rendah",
    statusClass: "text-danger",
  });
}

if (lastData.status?.denyut === "Darurat") {
  notifications.push({
    date: lastData.tanggal,
    message: "❗ Denyut Jantung: Tidak normal",
    statusClass: "text-danger",
  });
}
// Data untuk VideoCard
const videoList = [
  {
    url: "https://www.youtube.com/embed/MaQzaNoRJ7o",
    date: "September 12, 2017",
    title: "CARA PEMERIKSAAN TANDA-TANDA VITAL (TTV) LENGKAP | Video Edukasi",
  },
  {
    url: "https://www.youtube.com/embed/mIrFqOrQ1TQ",
    date: "October 15, 2019",
    title: "Video Tutorial Pemeriksaan Tanda-Tanda Vital (TTV)",
  },
  {
    url: "https://www.youtube.com/embed/apur_xbMpEk",
    date: "August 20, 2020",
    title: "VIDEO PRAKTEK KEPERAWATAN (EPISODE 26) | PEMERIKSAAN TANDA VITAL",
  },
  {
    url: "https://www.youtube.com/embed/82PuONLFDo8",
    date: "October 5, 2021",
    title: "Pemeriksaan Tanda - Tanda Vital (Vital Sign) Neonatus",
  },
  {
    url: "https://www.youtube.com/embed/bNbsN3yNdNg",
    date: "November 10, 2024",
    title: "PENGUKURAN TANDA-TANDA VITAL (TTV)",
  },
  {
    url: "https://www.youtube.com/embed/qKvZaaY3fPs",
    date: "March 25, 2025",
    title: "Pemeriksaan Tanda-Tanda Vital TTV",
  },
  {
    url: "https://www.youtube.com/embed/TERgm7TDtqg",
    date: "December 1, 2024",
    title: "Video Pembelajaran Pemeriksaan Tanda-tanda Vital Fakultas Kedokteran",
  },
  {
    url: "https://www.youtube.com/embed/EDtXMtqbPl8",
    date: "July 18, 2023",
    title: "Prosedur Pemeriksaan Tanda tanda Vital - Vital Sign dengan Benar",
  },
];

// Data untuk ArticleCard
const articleList = [
  {
    title: 'Tujuan Pemeriksaan TTV',
    summary: 'Panduan lengkap untuk memahami pentingnya pemeriksaan Tanda-Tanda Vital (TTV) demi kesehatan optimal.',
    date: '13 Apr, 2025',
    author: 'Liputan6',
    image: artikel_1,
    link: 'https://www.liputan6.com/feeds/read/5904194/tujuan-pemeriksaan-ttv-panduan-lengkap-untuk-kesehatan-optimal'
  },
  {
    title: 'Mengapa TTV Penting Dipantau?',
    summary: 'TTV dapat memberikan petunjuk awal adanya masalah kesehatan. Ketahui manfaat pemantauan rutin.',
    date: '14 Apr, 2025',
    author: 'Liputan6',
    image: artikel_2,
    link: 'https://www.liputan6.com/health/read/5904195/mengapa-ttv-penting-dipantau'
  },
  {
    title: 'Cara Membaca Hasil TTV dengan Benar',
    summary: 'Penjelasan mudah mengenai cara membaca suhu tubuh, nadi, respirasi, dan tekanan darah.',
    date: '15 Apr, 2025',
    author: 'Liputan6',
    image: artikel_3,
    link: 'https://www.liputan6.com/health/read/5904196/cara-membaca-hasil-ttv-dengan-benar'
  },
  {
    title: 'Peran TTV dalam Dunia Medis',
    summary: 'TTV menjadi indikator penting dalam diagnosa awal. Pelajari bagaimana tenaga medis menggunakannya.',
    date: '16 Apr, 2025',
    author: 'Liputan6',
    image: artikel_4,
    link: 'https://www.liputan6.com/health/read/5904197/peran-ttv-dalam-dunia-medis'
  }
];

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
  background-color: #eafaea;
}

ul {
  max-height: 500px;
  overflow-y: auto;
}
</style>
