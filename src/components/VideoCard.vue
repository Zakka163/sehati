<template>
  <div class="card-container">
    <div class="ratio ratio-16x9 rounded-4 overflow-hidden">
      <iframe :src="video.url" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="p-2">
      <div class="text-muted small d-flex align-items-center gap-2 mb-1">
        <span>📅 {{ video.date }}</span>
      </div>
      <div class="fw-bold text-success-emphasis">{{ video.title }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  video: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card-container {
  background-color: #EAFAEA;
  border-radius: 0.75rem;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, 0.075);
  /* shadow-sm */
  padding: 0.4rem;
  font-size: 0.85rem;
  max-width: 320px;
  /* sebelumnya 260px */
}

.ratio {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.ratio iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
