# Configuración de Supabase

## Estado Actual ✅
- **Conexión configurada**: Variables de entorno implementadas
- **Credenciales temporales**: Cargadas desde código anterior
- **Build funcional**: ✅ Compilación exitosa
- **Dev server**: ✅ Funciona en http://localhost:5174

## Próximos Pasos (IMPORTANTE)

### 1. Obtener Credenciales Frescas de Supabase
```
1. Ir a: https://app.supabase.com
2. Login con tu cuenta
3. Seleccionar proyecto: ghmcrixulzmaavevtobk
4. Settings → API
5. Copiar:
   - Project URL
   - anon public key
```

### 2. Actualizar Archivo .env
Reemplazar en `/Users/asbeldev/projects/react-himno-web/.trees/button-update-songs-supabase/.env`:

```bash
VITE_SUPABASE_URL=tu-url-fresca-aqui
VITE_SUPABASE_ANON_KEY=tu-key-fresca-aqui
```

### 3. Verificar Tabla 'himnos'
Asegurar que la tabla existe en Supabase con estructura:
- id (text/uuid, primary)
- title (text)
- description (text, optional)
- musical_note (text)
- paragraphs (jsonb)
- chorus (jsonb)
- filename (text, optional)

### 4. Probar Conexión
```bash
cd /Users/asbeldev/projects/react-himno-web/.trees/button-update-songs-supabase
npm run dev
# Abrir http://localhost:5174
# Click "Actualizar himnos" para sync
```

## Funcionalidades Implementadas

### Sync Button
- **Ubicación**: Home screen (logo → botón "Actualizar himnos")
- **Función**: Fetch todas las canciones desde Supabase
- **Feedback**: Loading → Success/Error states

### Validación
- **Create/Edit**: Validación completa antes de enviar a Supabase
- **Campos**: title, musicalNote, paragraphs, chorus, description
- **Errores**: Mensajes específicos por campo

### Context Update
- **SongNewContext**: syncFromSupabase(), isSyncing
- **UI Components**: SyncButton con estados visuales

## Troubleshooting

### Error: "Missing Supabase environment variables"
→ Verificar que .env existe y tiene variables correctas

### Error: "Invalid API key"
→ Credenciales expiraron/inválidas → obtener frescas del dashboard

### Error: "Table 'himnos' does not exist"
→ Crear tabla en Supabase con estructura correcta

### Sync no actualiza canciones
→ Verificar permisos RLS en Supabase para tabla 'himnos'

## Archivos Creados/Modificados

### Nuevos:
- `.env` - Credenciales Supabase
- `.env.example` - Template para setup
- `src/components/SyncButton.tsx` - UI sync button
- `src/state/useSongNew.ts` - Custom hook
- `src/utils/validation.ts` - Validación de canciones
- `SUPABASE_SETUP.md` - Este documento

### Modificados:
- `src/lib/supabaseClient.ts` - Variables de entorno
- `src/api/songService.ts` - syncSongsFromSupabase()
- `src/state/SongNewContext.tsx` - sync function + state
- `src/screens/HimnoHomeScreen.tsx` - Sync button integrado
- `src/screens/EditHimnoScreen.tsx` - Validación Supabase
- `src/screens/AddHimnoScreen.tsx` - Validación Supabase