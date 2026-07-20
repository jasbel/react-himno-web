import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Heading, Input } from '@/components/ui';
import LayoutMain from '@/layout/LayoutMain';
import Layout from '@/layout/Layout';
import { useAuth } from '@/state/AuthContext';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('El correo electrónico es requerido');
      return;
    }

    setLoading(true);

    const result = await resetPassword(email);

    setLoading(false);

    if (result.success) {
      setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
    } else {
      setError(result.error || 'Error al enviar correo de recuperación');
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <Box style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', paddingTop: 100 }}>
          <Heading>Recuperar Contraseña</Heading>

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

          <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </p>

          <Input
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 20 }}
          />

          <button
            onClick={handleSubmit}
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
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 14 }}>
            <Link to="/login" style={{ color: '#333', textDecoration: 'none' }}>
              ← Volver al inicio de sesión
            </Link>
            <Link to="/register" style={{ color: '#333', textDecoration: 'none' }}>
              Crear cuenta
            </Link>
          </div>
        </Box>
      </LayoutMain>
    </Layout>
  );
};

export default ForgotPasswordScreen;
