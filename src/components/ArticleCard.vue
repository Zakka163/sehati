<template>
  <div class="article-card bg-[#EAFAEA] rounded-lg shadow-sm p-1.5 w-[130px] items-center">
    <img
      :src="article.image"
      alt="Article Image"
      class="w-[100px] h-16 object-cover rounded-md mb-1 mx-auto"
    />

    <div class="text-muted text-[9px] mb-[1px] flex items-center gap-[2px]">
      📅 {{ article.date }}
    </div>

    <h5 class="font-semibold text-success-emphasis mb-[1px] text-[10px] leading-tight text-center">
      {{ article.title }}
    </h5>

    <p class="text-[9px] text-gray-700 mb-1 line-clamp-2 text-center">
      {{ article.summary }}
    </p>

    <div class="flex justify-center mt-auto">
      <a
        :href="article.link"
        target="_blank"
        class="text-white bg-[#960A3C] px-1.5 py-[1px] rounded-full text-[8px] hover:bg-[#7b082f]"
      >
        Read
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
