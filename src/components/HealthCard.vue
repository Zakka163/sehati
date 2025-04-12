<template>
    <div class="container py-5" style="background-color: #EAFAEA; min-height: 100vh;">
        <div class="row justify-content-center g-4">
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center" v-for="card in cards"
                :key="card.title">
                <div class="card rounded-5 shadow p-4 "
                    style="background-color: #EAFAEA; max-width: 480px; height: 210px;">
                    <div class="d-flex align-items-center mb-3">
                        <component :is="card.icon" class="me-2" :size="50" style="color: #780C28;" />
                        <h5 class="m-0" style="color: #780C28;">{{ card.title }}</h5>
                    </div>
                    <h4 class=" text-success fw-bold">
                        {{ card.value }}
                        <small class="text-muted fs-5">{{ card.unit }}</small>
                    </h4>
                    <span class="badge mt-4 px-3 py-3" :style="badgeStyle(card.status)">
                        {{ card.status }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    cards: {
        type: Array,
        required: true
    }
})
const badgeStyle = (status) => {
    const colors = {
        Normal: { background: '#6E8E59', color: '#fff' },
        Darurat: { background: '#780C28', color: '#fff' },
        Waspada: { background: '#FFB132', color: '#000' }
    }

    const style = colors[status] || { background: '#ccc', color: '#000' }

    return {
        backgroundColor: style.background,
        color: style.color,
        borderRadius: '20px',
        fontSize: '0.9rem'
    }
}

</script>