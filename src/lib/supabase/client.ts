import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqxcckboughqekjlavbn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxeGNja2JvdWdocWVramxhdmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3Njk2NzEsImV4cCI6MjEwNTM0NTY3MX0.RsS8sP5lFYgEriZtmmt0ZcWJFHdw0gVHG1ui_lTQoVE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
