<template>
    <div style="background-color: #EAFAEA; max-width: 100%; overflow-x: auto; height: 400px; position: relative;"
        class="">
        <component :is="selectedChart" :data="chartData" :options="chartOptions" />
    </div>

    <!-- Pilih jenis grafik dan mode data -->
    <div
        class="chart-controls mt-4 d-flex flex-wrap align-items-center justify-content-between gap-3 text-center text-md-start">
        <!-- Tombol jenis grafik -->
        <div class="chart-buttons d-flex flex-wrap justify-content-center gap-2">
            <button @click="chartType = 'line'" class="custom-button">Line Chart</button>
            <button @click="chartType = 'bar'" class="custom-button">Bar Chart</button>
            <button @click="chartType = 'radar'" class="custom-button">Radar Chart</button>
        </div>

        <!-- Dropdown mode data -->
        <div class="chart-mode-dropdown d-flex align-items-center gap-2">
            <label for="mode-select" class="fw-bold mb-0">Tipe:</label>
            <select id="mode-select" v-model="mode" class="custom-select-mode">
                <option value="day">Hari</option>
                <option value="month">Bulan</option>
                <option value="year">Tahun</option>
            </select>
        </div>
    </div>

</template>
<script setup>
import { computed, ref } from 'vue'
import { Line, Bar, Radar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale
} from 'chart.js'
import { groupDataBy } from '../helper'

// Register chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    BarElement,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    {
        id: 'backgroundColor',
        beforeDraw: (chart, args, options) => {
            const { ctx, chartArea } = chart;
            ctx.save();
            ctx.fillStyle = options.color || '#ffffff';
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
            ctx.restore();
        }
    }
)

// Props dari parent
const props = defineProps({
    dataTTV: {
        type: Array,
        required: true
    }
})

// Dropdown: default mode 'day'
const mode = ref('day')

// Chart type
const chartType = ref('line')

// Data yang sudah dikelompokkan berdasarkan mode
const groupedData = computed(() => groupDataBy(props.dataTTV, mode.value))

// Data untuk chart
const chartData = computed(() => ({
    labels: groupedData.value.map(item => item.tanggal),
    datasets: [
        {
            label: 'Tekanan Darah Sistolik',
            borderColor: '#42a5f5',
            backgroundColor: '#bbdefb',
            data: groupedData.value.map(item => item.sistolik),
            tension: 0.3
        },
        {
            label: 'Tekanan Darah Diastolik',
            borderColor: '#66bb6a',
            backgroundColor: '#c8e6c9',
            data: groupedData.value.map(item => item.diastolik),
            tension: 0.3
        },
        {
            label: 'Respirasi',
            borderColor: '#ff9800',
            backgroundColor: '#ffe0b2',
            data: groupedData.value.map(item => item.respirasi),
            tension: 0.3
        },
        {
            label: 'Denyut',
            borderColor: '#ff5722',
            backgroundColor: '#ffccbc',
            data: groupedData.value.map(item => item.denyut),
            tension: 0.3
        },
        {
            label: 'Suhu',
            borderColor: '#9c27b0',
            backgroundColor: '#e1bee7',
            data: groupedData.value.map(item => item.suhu),
            tension: 0.3
        },
        {
            label: 'Gula Darah',
            borderColor: '#4caf50',
            backgroundColor: '#c8e6c9',
            data: groupedData.value.map(item => item.gula),
            tension: 0.3
        },
        {
            label: 'Saturasi Oksigen',
            borderColor: '#2196f3',
            backgroundColor: '#bbdefb',
            data: groupedData.value.map(item => item.oksigen),
            tension: 0.3
        }
    ]
}))

// Opsi untuk chart
const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animations: {
        tension: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: { size: 14, weight: 'bold' }
            }
        },
        tooltip: {
            callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw} (unit)`
            }
        },
        backgroundColor: {
            color: '#EAFAEA'
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: { stepSize: 10 }
        }
    }
}))

// Pilih jenis chart yang ditampilkan
const selectedChart = computed(() => {
    switch (chartType.value) {
        case 'bar': return Bar
        case 'radar': return Radar
        default: return Line
    }
})
</script>


<style scoped>
.chart-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.chart-btn {
    background-color: #007bff;

}

.chart-btn:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.chart-btn:focus {
    outline: none;
}

.custom-button {
    background-color: #6E8E59;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
    color: white;
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.custom-button:hover {
    background-color: #5a774a;
    transform: scale(1.03);
}

.custom-select-mode {
    padding: 4px 6px;
    font-size: 1rem;
    border: 2px solid #42a5f5;
    border-radius: 8px;
    background-color: #ffffff;
    color: #333;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    appearance: none;
    /* Remove default arrow */
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
    min-width: 80px;
}

.custom-select-mode:focus {
    border-color: #1e88e5;
    box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.3);
}

.chart-controls {
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .chart-controls {
        flex-direction: row;
        justify-content: space-between;
    }
}

.chart-buttons {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
}

.chart-buttons .custom-button {
    flex: 1 1 auto;
    min-width: 100px;
}

.chart-mode-dropdown {
    flex-wrap: wrap;
    justify-content: center;
}

.custom-select-mode {
    max-width: 140px;
    width: 100%;
}

@media (max-width: 576px) {
    .custom-button {
        font-size: 14px;
        padding: 6px 8px;
    }

    .custom-select-mode {
        font-size: 14px;
        padding: 4px;
    }

    .chart-mode-dropdown {
        margin-left: 0 !important;
    }
}
</style>
