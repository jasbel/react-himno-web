import { useState, useEffect } from 'react';

export const useOffline = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showOfflineMessage, setShowOfflineMessage] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOffline(false);
            setTimeout(() => setShowOfflineMessage(false), 3000);
        };

        const handleOffline = () => {
            setIsOffline(true);
            setShowOfflineMessage(true);
        };

        const handleHideMessage = () => {
            setShowOfflineMessage(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('hideOfflineMessage', handleHideMessage);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('hideOfflineMessage', handleHideMessage);
        };
    }, []);

    return { isOffline, showOfflineMessage };
};
