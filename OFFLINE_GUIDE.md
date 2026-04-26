# Guía de Funcionalidad Offline - Himnos Web

Esta guía explica cómo funciona la funcionalidad offline en la aplicación de Himnos Web y cómo probarla.

## ¿Cómo funciona?

La aplicación ahora puede funcionar sin conexión a internet gracias a la implementación de:

1. **Service Worker**: Un script que se ejecuta en segundo plano y gestiona el caché
2. **Caching Estratégico**: Diferentes estrategias para diferentes tipos de archivos
3. **Detección de Conexión**: Indicadores visuales cuando no hay internet

## Estrategias de Caching

### 1. Archivos JSON (Himnos)
- **Estrategia**: CacheFirst
- **Duración**: 1 año
- **Máximo**: 50 archivos
- **Por qué**: Los himnos no cambian frecuentemente, así que se cachean por mucho tiempo

### 2. Imágenes
- **Estrategia**: CacheFirst
- **Duración**: 30 días
- **Máximo**: 100 imágenes
- **Por qué**: Las imágenes son estáticas y ocupan espacio

### 3. Archivos JS y CSS
- **Estrategia**: StaleWhileRevalidate
- **Duración**: Indefinido
- **Por qué**: Sirve el caché inmediatamente mientras busca actualizaciones

### 4. API Requests
- **Estrategia**: NetworkFirst
- **Duración**: 1 día
- **Máximo**: 50 requests
- **Por qué**: Prioriza la red para datos frescos, pero usa caché si no hay conexión

## Características Implementadas

### 1. Indicador de Estado Offline
- Muestra una notificación cuando no hay conexión a internet
- Indica que la aplicación sigue funcionando en modo offline
- Se oculta automáticamente al reconectar

### 2. Indicador de Listo para Offline
- Aparece cuando el service worker ha cacheado todos los recursos necesarios
- Confirma que la aplicación puede usarse sin internet

### 3. Actualizaciones Automáticas
- El service worker busca actualizaciones cada hora
- Si hay una nueva versión, pregunta al usuario si desea actualizar

## Cómo Probar la Funcionalidad Offline

### Paso 1: Construir la Aplicación
```bash
npm run build
```

### Paso 2: Iniciar el Servidor de Producción
```bash
npm run preview
```

### Paso 3: Abrir la Aplicación
1. Abre el navegador en `http://localhost:4173` (o el puerto que muestre)
2. Abre las DevTools del navegador (F12)
3. Ve a la pestaña "Application" o "Aplicación"
4. En la sección "Service Workers", deberías ver el service worker activo

### Paso 4: Cachear los Recursos
1. Navega por la aplicación y carga varios himnos
2. Esto cacheará los archivos JSON necesarios
3. Verás un indicador azul confirmando que está lista para offline

### Paso 5: Simular Modo Offline
1. En las DevTools, ve a la pestaña "Network" o "Red"
2. Haz clic en el menú desplegable "No throttling" o "Sin limitación"
3. Selecciona "Offline" o "Sin conexión"
4. O simplemente desconecta tu internet

### Paso 6: Verificar Funcionamiento Offline
1. Intenta navegar por la aplicación
2. Deberías ver un indicador naranja diciendo "Sin conexión a internet"
3. Los himnos deberían cargarse desde el caché
4. La aplicación debería funcionar normalmente

### Paso 7: Restaurar Conexión
1. Vuelve a conectar tu internet
2. O en las DevTools, selecciona "No throttling" o "Online"
3. Verás un indicador verde confirmando que la conexión está restablecida

## Instalación como PWA

La aplicación ahora es una PWA (Progressive Web App) que puede instalarse:

1. Abre la aplicación en un navegador compatible (Chrome, Edge, Safari)
2. Busca el icono de instalación en la barra de direcciones
3. Haz clic en "Instalar" o "Add to Home Screen"
4. La aplicación se instalará como una app nativa

## Beneficios

### Para los Usuarios
- ✅ No consume datos cada vez que abren la aplicación
- ✅ Funciona sin conexión a internet
- ✅ Carga más rápido (desde el caché)
- ✅ Se puede instalar como app nativa

### Para el Desarrollador
- ✅ Mejor experiencia de usuario
- ✅ Menor carga en el servidor
- ✅ Aplicación más robusta

## Archivos Modificados

1. **vite.config.ts**: Configuración del plugin PWA
2. **src/main.tsx**: Registro del service worker
3. **src/App.tsx**: Componentes de indicadores offline
4. **src/hooks/useOffline.ts**: Hook para detectar estado de conexión
5. **src/components/OfflineIndicator.tsx**: Componentes visuales de estado offline
6. **src/types/vite-env.d.ts**: Tipos TypeScript para el PWA

## Solución de Problemas

### El service worker no se registra
- Verifica que estás usando HTTPS o localhost
- Limpia el caché del navegador
- Deshabilita extensiones que puedan bloquear service workers

### Los archivos no se cachean
- Verifica que el build se completó exitosamente
- Revisa la consola por errores del service worker
- Asegúrate de que los archivos están en la carpeta `public`

### La aplicación no funciona offline
- Asegúrate de haber navegado por la aplicación al menos una vez con conexión
- Verifica que el service worker esté activo en las DevTools
- Revisa la pestaña "Cache Storage" en las DevTools

## Actualizaciones Futuras

Para agregar más archivos al caché, modifica `vite.config.ts`:

```typescript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,json,webp}'], // Agrega más extensiones
  // ...
}
```

## Soporte

Si encuentras algún problema, revisa:
1. La consola del navegador por errores
2. La pestaña "Application" > "Service Workers"
3. La pestaña "Application" > "Cache Storage"
