'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const password = formData.get('password')
  if (password === 'shilonbhai008') {
    cookies().set('crm_auth', 'true', { secure: true, httpOnly: true, path: '/' })
    redirect('/admin')
  } else {
    redirect('/login?error=1')
  }
}

export async function logout() {
  cookies().delete('crm_auth')
  redirect('/')
}

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const brand = formData.get('brand') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string

  await supabase.from('products').insert([{ name, brand, price, description }])
  revalidatePath('/')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin')
}