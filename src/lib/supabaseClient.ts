import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://spbaubkzwljxewzgonjq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYmF1Ymt6d2xqeGV3emdvbmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDA3MTIsImV4cCI6MjA5NTgxNjcxMn0.9hwPrxHTfwY7W5jlHNl_n2M2UdhkDD9n6JHTWLMv3aU'

export const supabase = createClient(supabaseUrl, supabaseKey)
