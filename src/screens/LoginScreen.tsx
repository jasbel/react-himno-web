import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input } from '@/components/ui';
import LayoutMain from '@/layout/LayoutMain';
import Layout from '@/layout/Layout';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded logic as requested
    if (email === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/create'); // Navigate to create page by default for admin
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <Box style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', paddingTop: 100 }}>
          <Heading>Administrador</Heading>
          <Input 
            placeholder="Usuario" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            placeholder="Contraseña" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            style={{
                marginTop: 20,
                padding: '10px 20px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer'
            }}
          >
            Ingresar
          </button>
        </Box>
      </LayoutMain>
    </Layout>
  );
};

export default LoginScreen;
