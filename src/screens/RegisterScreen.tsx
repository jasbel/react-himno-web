import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input } from '@/components/ui';
import LayoutMain from '@/layout/LayoutMain';
import Layout from '@/layout/Layout';
import { useAuth } from '@/state/AuthContext';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async () => {
    setError('');
    setMessage('');

    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await signUp(email, password);

    setLoading(false);

    if (result.success) {
      setMessage('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error || 'Error al registrar');
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <Box style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', paddingTop: 80 }}>
          <Heading>Crear Cuenta</Heading>

          {error && (
            <div style={{ color: '#dc2626', marginBottom: 16, padding: 12, backgroundColor: '#fef2f2', borderRadius: 4, border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{ color: '#166534', marginBottom: 16, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 4, border: '1px solid #bbf7d0' }}>
              {message}
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
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#999' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
              marginBottom: 16
            }}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>

          <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontSize: 14 }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </Box>
      </LayoutMain>
    </Layout>
  );
};

export default RegisterScreen;
