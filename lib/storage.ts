 import { createClient } from '@/lib/supabase/client'

const BUCKET = 'ppdt-uploads'

/**
 * Upload single file ke Supabase Storage
 * @returns Public URL dari file yang di-upload
 */
export async function uploadFile(file: File, folder: string = 'umum'): Promise<string> {
  const supabase = createClient()

  // Generate nama file unik dengan timestamp
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const fileName = `${folder}/${timestamp}-${random}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Upload gagal: ${error.message}`)
  }

  // Get public URL
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

/**
 * Upload multiple files
 */
export async function uploadFiles(files: File[], folder: string = 'umum'): Promise<string[]> {
  const urls = await Promise.all(files.map((file) => uploadFile(file, folder)))
  return urls
}

/**
 * Hapus file dari Supabase Storage berdasarkan public URL
 */
export async function deleteFileFromUrl(url: string): Promise<void> {
  const supabase = createClient()

  // Extract path dari URL
  // URL format: https://xxx.supabase.co/storage/v1/object/public/ppdt-uploads/folder/file.jpg
  const match = url.match(new RegExp(`/${BUCKET}/(.+)$`))
  if (!match) return

  const path = match[1]
  await supabase.storage.from(BUCKET).remove([path])
}

/**
 * Validate file: tipe & ukuran maksimal
 */
export function validateImageFile(file: File): string | null {
  const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Hanya file JPG, PNG, atau WebP yang diizinkan'
  }
  if (file.size > MAX_SIZE) {
    return `Ukuran file maksimal 5 MB (file Anda ${(file.size / 1024 / 1024).toFixed(1)} MB)`
  }
  return null
}