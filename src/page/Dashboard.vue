<template>
    <div style="background-color: #EAFAEA; height: 100vh;">
        <Navbar />
        <router-view /> <!-- Tempat tampilkan halaman dari routing -->
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>