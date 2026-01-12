import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ghmcrixulzmaavevtobk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobWNyaXh1bHptYWF2ZXZ0b2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1Mjk2NzEsImV4cCI6MjA4MjEwNTY3MX0.WR6zylm_kqUAXrtvrdZiV7R0gGEdxRzjsi-A3d1xp2Q'

export const supabase = createClient(supabaseUrl, supabaseKey)
