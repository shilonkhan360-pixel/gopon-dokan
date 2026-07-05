'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const password = formData.get('password')
  if (password === 'shilonbhai008') {
    cookies().set('crm_auth', 'true', { secure: true, httpOnly: true, path: '/' })
    redirect('/')
  } else {
    redirect('/login?error=1')
  }
}

export async function logout() {
  cookies().delete('crm_auth')
  redirect('/login')
}

export async function addLead(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const source = formData.get('source') as string
  const status = formData.get('status') as string

  await supabase.from('leads').insert([{ name, email, source, status }])
  revalidatePath('/leads')
  redirect('/leads')
}

export async function addContact(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const role = formData.get('role') as string

  await supabase.from('contacts').insert([{ name, email, phone, role }])
  revalidatePath('/contacts')
  redirect('/contacts')
}