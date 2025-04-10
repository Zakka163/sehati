<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100"
        style="background-color: #EAFAEA;">
        <div class="card p-4 shadow responsive-card">
            <div class="d-flex flex-row align-items-center justify-content-center mb-4">
                <img src="@/assets/logo.png" alt="Logo" width="60" class="me-2" />
                <h4 class="fw-bold mb-0">SEHATI</h4>
            </div>

            <form @submit="handleLogin">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control custom-input" placeholder="Masukkan email"
                        v-model="email" />
                </div>

                <div class="mb-4">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control custom-input"
                        placeholder="Masukkan password" v-model="password" />
                </div>

                <button type="submit" class="btn w-100 custom-button">
                    LOGIN
                </button>
            </form>

            <div class="text-center mt-3" style="font-size: 13px;">
                Belum punya akun?
                <router-link to="/register" class="text-decoration-underline fw-bold login-link">Register</router-link>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')

const router = useRouter() // inisialisasi router

const handleLogin = (e) => {
    e.preventDefault()

    if (!email.value || !password.value) {
        alert('Email dan password wajib diisi.')
        return
    }

    // Ambil user dari localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

    // Cari user yang cocok
    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (user) {
        alert(`Selamat datang, ${user.name}!`)
        localStorage.setItem('loggedInUser', JSON.stringify(user))

        // ✅ Redirect ke dashboard
        router.push('/')
    } else {
        alert('Email atau password salah.')
    }

    // Reset form
    email.value = ''
    password.value = ''
}
</script>


<style scoped>
.responsive-card {
    width: 100%;
    max-width: 400px;
    background-color: #780C28;
    color: #d7e8c6;
    border-radius: 15px;
}

/* Warna input */
.custom-input {
    background-color: #CAE0BC;
    border: none;
    color: #333;
    transition: box-shadow 0.2s ease;
}

.custom-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(110, 142, 89, 0.25);
}

/* Placeholder */
.custom-input::placeholder {
    color: #555;
}

/* Tombol login */
.custom-button {
    background-color: #6E8E59;
    color: white;
    border: none;
    transition: background-color 0.3s ease;
}

.custom-button:hover {
    background-color: #5a7a4d;
}

/* Link register */
.login-link {
    color: #d7e8c6;
}

.login-link:hover {
    color: #ffffff;
}

/* Responsif */
@media (max-width: 576px) {
    .responsive-card {
        padding: 2rem 1.5rem;
        margin: 0 1rem;
    }

    img {
        width: 40px;
    }

    h4 {
        font-size: 1.2rem;
    }

    h6 {
        font-size: 1rem;
    }
}
</style>