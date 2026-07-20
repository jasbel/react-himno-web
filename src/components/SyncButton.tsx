import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSongNew } from '@/state/useSongNew';
import { Loader2, CloudDownload, CheckCircle2, AlertCircle } from 'lucide-react';

export const SyncButton = () => {
  const { syncFromSupabase, isSyncing } = useSongNew();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSync = async () => {
    try {
      setStatus('idle');
      await syncFromSupabase();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      console.error('Sync failed:', error);
    }
  };

  const getButtonContent = () => {
    if (isSyncing) {
      return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sincronizando...</>;
    }

    if (status === 'success') {
      return <><CheckCircle2 className="mr-2 h-4 w-4" /> Sincronizado</>;
    }

    if (status === 'error') {
      return <><AlertCircle className="mr-2 h-4 w-4" /> Error</>;
    }

    return <><CloudDownload className="mr-2 h-4 w-4" /> Actualizar himnos</>;
  };

  return (
    <Button
      onClick={handleSync}
      disabled={isSyncing}
      variant={status === 'error' ? 'destructive' : status === 'success' ? 'default' : 'outline'}
      className="w-full sm:w-auto"
    >
      {getButtonContent()}
    </Button>
  );
};