import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input } from '@/components/ui';
import LayoutMain from '@/layout/LayoutMain';
import Layout from '@/layout/Layout';
import { useAuth } from '@/state/AuthContext';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('La nueva contraseña no coincide');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { supabase } = await import('@/lib/supabaseClient');

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        setError('La contraseña actual es incorrecta');
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setError('Error al actualizar la contraseña: ' + updateError.message);
        setLoading(false);
        return;
      }

      setSuccess('Contraseña actualizada exitosamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError('Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <Box style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', paddingTop: 100 }}>
          <Heading>Cambiar Contraseña</Heading>

          {error && (
            <div style={{ color: '#dc2626', marginBottom: 20, padding: 12, backgroundColor: '#fef2f2', borderRadius: 6, border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ color: '#16a34a', marginBottom: 20, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0' }}>
              {success}
            </div>
          )}

          <div style={{ textAlign: 'left', marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
              Usuario: <strong>{user?.email}</strong>
            </p>
          </div>

          <Input
            placeholder="Contraseña actual"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          <Input
            placeholder="Nueva contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          <Input
            placeholder="Confirmar nueva contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />

          <button
            onClick={handleChangePassword}
            disabled={loading}
            style={{
              padding: '12px 20px',
              backgroundColor: loading ? '#999' : '#1f2937',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>

          <button
            onClick={() => navigate('/')}
            disabled={loading}
            style={{
              marginTop: 12,
              padding: '10px 20px',
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #ccc',
              borderRadius: 6,
              cursor: loading ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: 14,
            }}
          >
            Cancelar
          </button>
        </Box>
      </LayoutMain>
    </Layout>
  );
};

export default ChangePasswordScreen;
