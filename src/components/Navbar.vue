<template>
    <div class="d-flex justify-content-center">
      <nav class="navbar-container d-flex align-items-center justify-content-between px-5 py-3 flex-wrap">
        <div class="d-flex align-items-center mb-2 mb-md-0">
          <img src="@/assets/logo.png" alt="Logo" class="logo me-2" />
          <span class="brand-text fw-bold">SEHATI</span>
        </div>
        <div class="d-flex gap-4 flex-wrap justify-content-center">
          <router-link to="/" class="nav-link" exact-active-class="active-link">Beranda</router-link>
          <router-link to="/pantau" class="nav-link" exact-active-class="active-link">Pantau TTV</router-link>
          <router-link to="/laporan" class="nav-link" exact-active-class="active-link">Laporan</router-link>
          <router-link to="/profile" class="nav-link" exact-active-class="active-link">Profile Saya</router-link>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  // Navbar ini hanya statis, jadi tak perlu JavaScript logic
  </script>
  
  <style scoped>
  .navbar-container {
    background-color: #780C28;
    border-radius: 20px;
    color: white;
    margin: 1rem 0;
    width: 90%;
    max-width: 1100px;
    flex-direction: row;
    flex-wrap: wrap;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* efek shadow */
    transition: all 0.3s ease-in-out;
  }
  
  .logo {
    height: 40px;
  }
  
  .brand-text {
    font-size: 1.4rem;
    color: white;
  }
  
  .nav-link {
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    position: relative;
  }
  
  .nav-link:hover {
    color: #FFCDD2;
  }
  
  .active-link {
    font-weight: bold;
    border-bottom: 2px solid #fff;
  }
  
  @media (max-width: 768px) {
    .navbar-container {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
    }
  
    .nav-link {
      margin: 0.5rem 0;
    }
  
    .brand-text {
      font-size: 1.2rem;
    }
  }
  </style>
  