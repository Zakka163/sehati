export function groupDataBy(data, mode = 'date') {
    const grouped = {}

    data.forEach(item => {
        // Format: 'YYYY-MM' untuk bulan atau 'YYYY-MM-DD' untuk tanggal
        const key = mode === 'month'
            ? item.tanggal.slice(0, 7) // Ambil '2024-08' dari '2024-08-29'
            : item.tanggal

        if (!grouped[key]) {
            grouped[key] = []
        }
        grouped[key].push(item)
    })

    // Hitung rata-rata dari tiap pengukuran per grup
    const result = Object.entries(grouped).map(([key, values]) => {
        const count = values.length
        const avg = (field) =>
            values.reduce((sum, val) => sum + parseFloat(val[field] || 0), 0) / count

        return {
            tanggal: key,
            sistolik: avg('sistolik'),
            diastolik: avg('diastolik'),
            respirasi: avg('respirasi'),
            denyut: avg('denyut'),
            suhu: avg('suhu'),
            gula: avg('gula'),
            oksigen: avg('oksigen')
        }
    })

    return result
}
