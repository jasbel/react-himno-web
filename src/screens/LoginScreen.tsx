import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input } from '@/components/ui';
import LayoutMain from '@/layout/LayoutMain';
import Layout from '@/layout/Layout';
import { useAuth } from '@/state/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    setLoading(false);

    if (result.success) {
      navigate('/'); // Navigate to home after successful login
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <Box style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', paddingTop: 100 }}>
          <Heading>Iniciar Sesión</Heading>
          {error && (
            <div style={{ color: 'red', marginBottom: 20, padding: 10, backgroundColor: '#fee', borderRadius: 4 }}>
              {error}
            </div>
          )}
          <Input 
            placeholder="Correo electrónico" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Input 
            placeholder="Contraseña" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <button 
            onClick={handleLogin}
            disabled={loading}
            style={{
                marginTop: 20,
                padding: '10px 20px',
                backgroundColor: loading ? '#999' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%'
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </Box>
      </LayoutMain>
    </Layout>
  );
};

export default LoginScreen;
