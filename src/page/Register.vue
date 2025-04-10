<template>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100"
        style="background-color: #EAFAEA;">
        <div class="card p-4 shadow responsive-card">
            <div class="d-flex flex-row align-items-center justify-content-center mb-4">
                <img src="@/assets/logo.png" alt="Logo" width="60" class="me-2" />
                <h4 class="fw-bold mb-0">SEHATI</h4>
            </div>
            <div class="text-center mb-3">
                <!-- <h6 class="fw-bold">REGISTER</h6> -->
            </div>

            <form @submit="handleRegister">
                <div class="mb-3">
                    <label for="name" class="form-label">Nama Lengkap</label>
                    <input type="text" id="name" class="form-control custom-input" placeholder="Enter your name"
                        v-model="name" />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control custom-input" placeholder="Enter your email"
                        v-model="email" />
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control custom-input"
                        placeholder="Enter your password" v-model="password" />
                </div>

                <div class="mb-4">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" class="form-control custom-input"
                        placeholder="Repeat your password" v-model="confirmPassword" />
                </div>

                <button type="submit" class="btn w-100 custom-button">
                    REGISTER
                </button>
            </form>

            <div class="text-center mt-3" style="font-size: 13px;">
                Sudah Punya Akun?
                <router-link to="/login" class="text-decoration-underline fw-bold login-link">Login</router-link>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// State input
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Simpan data ke localStorage saat submit
const handleRegister = (e) => {
    e.preventDefault()

    // Validasi dasar
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        alert('Semua kolom wajib diisi.')
        return
    }

    if (password.value !== confirmPassword.value) {
        alert('Password dan konfirmasi password tidak sama.')
        return
    }

    // Buat objek user
    const newUser = {
        name: name.value,
        email: email.value,
        password: password.value, // jangan disimpan plaintext kalau real case ya!
        createdAt: new Date().toISOString()
    }

    // Ambil data lama dari localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    users.push(newUser)

    // Simpan kembali ke localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(users))

    alert('Pendaftaran berhasil!')

    // Reset form
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
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

/* Tombol register */
.custom-button {
    background-color: #6E8E59;
    color: white;
    border: none;
    transition: background-color 0.3s ease;
}

.custom-button:hover {
    background-color: #5a7a4d;
}

/* Link login */
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