<template>
    <div style="background-color: #EAFAEA; min-height: 100vh;">
        <Navbar />
        <div class="container d-flex flex-column justify content-center align-items-center">
            <div class="shadow p-4 rounded-4 w-75 card">
                <h4 class="text-center mb-4">Profile</h4>
                <form @submit.prevent="handleSubmit">
                    <div class="d-flex flex-row gap-4 flex-wrap">
                        <!-- Bagian Kiri -->
                        <div class="flex-fill rounded p-3">
                            <div class="mb-3">
                                <label for="name" class="form-label fw-bold">Nama</label>
                                <input type="text" id="name" class="form-control custom-input" v-model="form.name"
                                    :disabled="!edit" required />
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label fw-bold">Email</label>
                                <input type="email" id="email" class="form-control custom-input" v-model="form.email"
                                    :disabled="!edit" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label fw-bold">Kata Sandi</label>
                                <input type="password" id="password" class="form-control custom-input"
                                    v-model="form.password" :disabled="!edit" required />
                            </div>
                            <div class="mb-3">
                                <label for="dob" class="form-label fw-bold">Tanggal Lahir</label>
                                <input type="date" id="dob" class="form-control custom-input" v-model="form.dob"
                                    :disabled="!edit" required />
                            </div>
                        </div>

                        <!-- Bagian Kanan -->
                        <div class="flex-fill rounded p-3 mt-2">
                            <div class="mb-3 mt-4">
                                <label for="gender" class="form-label fw-bold">Jenis Kelamin</label>
                                <select id="gender" class="form-select custom-input" v-model="form.gender"
                                    :disabled="!edit" required>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="contact" class="form-label fw-bold">Kontak</label>
                                <input type="tel" id="contact" class="form-control custom-input" v-model="form.contact"
                                    placeholder="Nomor Telepon" :disabled="!edit" required />
                            </div>
                            <div class="mb-3">
                                <label for="emergencyPhone" class="form-label fw-bold">Nomor Telepon Darurat</label>
                                <input type="tel" id="emergencyPhone" class="form-control custom-input"
                                    v-model="form.emergencyPhone" placeholder="Nomor Telepon" :disabled="!edit"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="emergencyName" class="form-label fw-bold">Nama Kontak Darurat</label>
                                <input type="text" id="emergencyName" class="form-control custom-input"
                                    v-model="form.emergencyName" placeholder="Nama Kontak Darurat" :disabled="!edit"
                                    required />
                            </div>
                        </div>
                    </div>

                    <!-- Tombol -->
                    <div class="text-center mt-4">
                        <button type="submit" class="custom-button btn btn-success px-4 py-2" :disabled="!edit">
                            Update
                        </button>
                        <button type="button" class="custom-button btn btn-primary px-4 py-2 ms-2" @click="toggleEdit">
                            {{ edit ? 'Cancel' : 'Edit' }}
                        </button>

                    </div>
                </form>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="mt-2 custom-button btn btn-danger px-4 py-2 ms-2" @click="logout">
                    Logout
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter() // inisialisasi router

// Inisialisasi data form
const form = reactive({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    contact: '',
    emergencyPhone: '',
    emergencyName: ''
})

const edit = ref(false)

// Ambil data dari localStorage ketika komponen dimuat
onMounted(() => {
    const users = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    if (users) {
        form.name = users.name || ''
        form.email = users.email || ''
        form.password = users.password || ''
        form.dob = users.dob || ''
        form.gender = users.gender || ''
        form.contact = users.contact || ''
        form.emergencyPhone = users.emergencyPhone || ''
        form.emergencyName = users.emergencyName || ''
    }
})

const handleSubmit = () => {
    // Logika untuk mengirim data atau simpan ke localStorage/db
    console.log('Form submitted:', form)
}

const toggleEdit = () => {
    edit.value = !edit.value
}

const logout = () => {
    localStorage.removeItem('loggedInUser')
    router.push('/login')
}
</script>

<style scoped>
.card {
    background-color: #EAFAEA;
    margin: 0px;
    padding: 0px;
}

.custom-button {
    background-color: #6E8E59;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.custom-button:hover {
    background-color: #5a774a;
    transform: scale(1.03);
}

.custom-input {
    background-color: #CAE0BC;
    border: none;
    color: #333;
    transition: box-shadow 0.2s ease;
}

.form-label {
    font-weight: bold;
}

.form-select,
.form-control {
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>
