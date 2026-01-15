const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ghmcrixulzmaavevtobk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdobWNyaXh1bHptYWF2ZXZ0b2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1Mjk2NzEsImV4cCI6MjA4MjEwNTY3MX0.WR6zylm_kqUAXrtvrdZiV7R0gGEdxRzjsi-A3d1xp2Q';

const supabase = createClient(supabaseUrl, supabaseKey);

const users = [
  {
    email: 'hermano1@gmail.com',
    password: 'hermano1@gmail.com',
    email_confirm: true
  },
  {
    email: 'hermana1@gmail.com',
    password: 'hermana1@gmail.com',
    email_confirm: true
  }
];

async function createUsers() {
  console.log('Creating users...');

  for (const user of users) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          emailRedirectTo: undefined,
          data: {
            role: 'member'
          }
        }
      });

      if (error) {
        if (error.message.includes('already been registered')) {
          console.log(`✓ User ${user.email} already exists`);
        } else {
          console.error(`✗ Error creating user ${user.email}:`, error.message);
        }
      } else {
        console.log(`✓ User ${user.email} created successfully`);
      }
    } catch (err) {
      console.error(`✗ Error creating user ${user.email}:`, err.message);
    }
  }

  console.log('\nUser creation process completed!');
  console.log('\nTest users:');
  console.log('1. hermano1@gmail.com / hermano1@gmail.com');
  console.log('2. hermana1@gmail.com / hermana1@gmail.com');
}

createUsers();
