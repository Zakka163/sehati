<template>
  <div>
    <nav class="navbar-container fixed-top d-flex align-items-center justify-content-between px-5 py-3 flex-wrap">
      <div class="d-flex align-items-center logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo me-2" />
        <span class="brand-text fw-bold">SEHATI</span>
      </div>
      <div class="d-flex gap-4 nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active-link">Beranda</router-link>
        <router-link to="/pantau" class="nav-link" exact-active-class="active-link">Pantau TTV</router-link>
        <router-link to="/laporan" class="nav-link" exact-active-class="active-link">Laporan</router-link>
        <router-link to="/profile" class="nav-link" exact-active-class="active-link">Profile</router-link>
      </div>
    </nav>
    <!-- Spacer biar konten ga ketimpa navbar -->
    <div style="height: 90px;"></div>
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  /* efek shadow */
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

.navbar-container {
  background-color: #780C28;
  border-radius: 20px;
  color: white;
  margin: 1rem 0;
  width: 90%;
  max-width: 1100px;
  flex-direction: row;
  flex-wrap: wrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
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

/* Responsive behavior */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
  }

  .logo-container {
    justify-content: center;
    margin-bottom: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .brand-text {
    font-size: 1.2rem;
  }
}
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}
.navbar-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Atur lebar navbar */
  max-width: 1100px; /* Lebar maksimal navbar */
  z-index: 1030;
}


</style>