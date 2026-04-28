# Website PPDT - Persatuan Pemuda Dukuh Tengah

Website resmi organisasi kepemudaan Persatuan Pemuda Dukuh Tengah (PPDT).

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel

## 📋 Fitur

### Halaman Publik
- Beranda dengan hero section dan statistik
- Profil organisasi (Tentang)
- Informasi bulanan & pengumuman
- Galeri kegiatan
- Daftar pemenang arisan
- Laporan keuangan transparan

### Panel Admin
- Login & autentikasi aman
- Dashboard statistik
- CRUD Kegiatan (dengan upload foto)
- CRUD Galeri (multi-upload)
- CRUD Informasi Bulanan
- CRUD Peserta Arisan
- CRUD Transaksi Keuangan
- User Management (super admin)
- Pengaturan Organisasi

## 🛠️ Setup Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Isi credentials Supabase di .env.local

# Run development server
npm run dev
```

Buka http://localhost:3000

## 📜 License

© 2026 Persatuan Pemuda Dukuh Tengah. All rights reserved.