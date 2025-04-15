<template>
  <div class="py-4 px-3" style="background-color: #EAFAEA;">
    <div class="container">
      <div class="row g-4">
        <div
          class="col-12 col-sm-6 col-lg-4"
          v-for="(article, index) in articles"
          :key="index"
        >
          <div class="card h-100 shadow-sm border-0">
            <img
              :src="article.image"
              :alt="article.title"
              class="card-img-top"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-success mb-2">
                {{ article.title }}
              </h5>
              <p class="card-text text-muted small">
                {{ article.summary }}
              </p>
              <p class="text-secondary small mt-auto">
                <i class="bi bi-person-circle me-1"></i>{{ article.author }} • {{ article.date }}
              </p>
              <a
                :href="article.link"
                target="_blank"
                class="btn btn-sm btn-outline-success mt-2 align-self-start"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
});
</script>
