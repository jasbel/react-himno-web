import { useState, useEffect } from 'react';
import { useOffline } from '../hooks/useOffline';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator = () => {
    const { isOffline, showOfflineMessage } = useOffline();

    if (!showOfflineMessage) return null;

    return (
        <div className={`fixed bottom-4 right-4 z-50 max-w-sm rounded-lg shadow-lg p-4 flex items-start gap-3 transition-all duration-300 ${isOffline
            ? 'bg-orange-500 text-white'
            : 'bg-green-500 text-white'
            }`}>
            {isOffline ? (
                <WifiOff className="w-6 h-6 flex-shrink-0 mt-0.5" />
            ) : (
                <Wifi className="w-6 h-6 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                    {isOffline ? 'Sin conexión a internet' : 'Conexión restablecida'}
                </h3>
                <p className="text-xs opacity-90">
                    {isOffline
                        ? 'La aplicación está funcionando en modo offline. Puedes seguir usando los himnos guardados.'
                        : 'La conexión a internet ha sido restablecida. Los cambios se sincronizarán automáticamente.'}
                </p>
            </div>
            <button
                onClick={() => {
                    // Hide the message by setting state through the hook
                    const event = new CustomEvent('hideOfflineMessage');
                    window.dispatchEvent(event);
                }}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export const OfflineReadyIndicator = () => {
    const [showReady, setShowReady] = useState(false);

    useEffect(() => {
        const handleReady = () => {
            setShowReady(true);
            setTimeout(() => setShowReady(false), 5000);
        };

        window.addEventListener('offline-ready', handleReady);
        return () => window.removeEventListener('offline-ready', handleReady);
    }, []);

    if (!showReady) return null;

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm rounded-lg shadow-lg p-4 bg-blue-600 text-white flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                    ¡Lista para usar sin internet!
                </h3>
                <p className="text-xs opacity-90">
                    La aplicación ha guardado todos los himnos y recursos. Ahora puedes usarla sin conexión a internet.
                </p>
            </div>
            <button
                onClick={() => setShowReady(false)}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
