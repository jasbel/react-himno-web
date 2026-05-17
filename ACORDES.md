# Sistema de Acordes Musicales

Esta aplicación ahora soporta acordes musicales que se muestran encima de las palabras de las canciones.

## Características del Sistema de Tamaño de Fuente

- **Cambios Graduales**: Cada click en +T o -T cambia el tamaño en 1 unidad (más suave y controlado)
- **Tamaño Proporcional**: Los acordes se ajustan automáticamente al 65% del tamaño del texto principal
- **Rango Optimizado**: El tamaño varía desde 18px (móvil) hasta 32px (escritorio) por defecto
- **Responsive**: El sistema se adapta a diferentes tamaños de pantalla
- **Sin Saltos Bruscos**: Los cambios de tamaño son graduales y predecibles

## Cómo Funciona

El sistema detecta automáticamente cuando un párrafo o coro contiene acordes en el formato `[ACORDE]` y los muestra encima de las palabras correspondientes.

## Formato de Acordes

Para agregar acordes a tus canciones, coloca el nombre del acorde entre corchetes `[]` inmediatamente antes de la palabra donde debe sonar:

```
Un [C] día de estos al [G] pasar
yo te [Am] quise saludar [F]
```

Esto mostrará:
- El acorde **C** (Do) sobre "día"
- El acorde **G** (Sol) sobre "pasar"
- El acorde **Am** (La menor) sobre "quise"
- El acorde **F** (Fa) sobre el espacio final

## Acordes Soportados

El sistema reconoce todos los acordes estándar:

- **Notas básicas**: C, D, E, F, G, A, B
- **Sostenidos**: C#, F#, G#, etc.
- **Bemoles**: Db, Eb, Ab, etc. (si es necesario)
- **Menores**: Am, Dm, Em, etc.
- **Séptimas**: C7, G7, A7, etc.
- **Mayores séptima**: Cmaj7, Fmaj7, etc.
- **Aumentados/Disminuidos**: Caug, Adim, etc.
- **Acordes con nota bajo**: C/G, Am/F#, D/A, etc.
- **Suspensiones**: Csus4, Gsus2, etc.

## Ejemplos de Uso

### Verso Simple
```
[C] Qué bonito es [G] vivir
[Am] para siempre con [F] Jesús
```

### Coro con Acordes
```
[G] Le daré mi [C] corazón
[G] A él que todo me [D] dio
[G] Por su gran a[C]mor
[G] Yo le doy mi [D] corazón
```

### Estrofa Completa
```
[Am] Fui hecho justo sin [Em] merecerlo
[F] toda mi culpa ya [C] cubierta es[D]tá
[Am] Toda mi deuda [Em] quedó saldada
[F] por la persona del [G] cordero in[C]mortal
```

## Detalles Técnicos

- **Detección automática**: El sistema detecta si un texto contiene acordes buscando el patrón `[...]`
- **Sin acordes**: Si no se detectan acordes, el texto se muestra normalmente
- **Color**: Los acordes se muestran en rojo (#d32f2f) para destacar sobre el texto negro
- **Tamaño**: Los acordes tienen un tamaño del 75% del texto principal
- **Posicionamiento**: Los acordes se posicionan exactamente sobre la palabra siguiente al corchete

## En la Base de Datos

Para agregar acordes a una canción existente:

1. Edita el campo `paragraph` o `choir` en la base de datos
2. Inserta los acordes entre corchetes donde correspondan
3. Guarda los cambios

Ejemplo de estructura JSON:

```json
{
  "paragraph": "Un [C] día de estos al [G] pasar\nyo te [Am] quise saludar [F]",
  "chorus": "[C] Salvador, [G] mi amigo [Am] fiel\n[F] Tu nombre [C] cantaré [G]"
}
```

## Visualización

Cuando se muestra una canción con acordes:

- **Con acordes**: Los acordes aparecen en rojo sobre las palabras
- **Sin acordes**: El texto se muestra normalmente, centrado y con formato estándar
- **Coros**: Los coros con acordes mantienen el estilo en negrita y cursiva

## Tips

1. **Espaciado**: Es importante mantener los espacios después del corchete de cierre para una correcta separación entre palabras
2. **Líneas nuevas**: Usa `\n` para separar líneas dentro de un mismo párrafo
3. **Consistencia**: Mantén un formato consistente en toda la canción
4. **Simplificación**: Usa la notación más simple posible (C en lugar de Cmaj7 si no es necesario)

## Ejemplo Completo de Canción

```json
{
  "title": "Fui Hecho Justo",
  "musicalNote": "G|Sol",
  "paragraphs": [
    {
      "id": "1",
      "paragraph": "[G] Fui hecho justo sin [Em] merecerlo\n[C] toda mi culpa ya [D] cubierta está.\n[G] Toda mi deuda [Em] quedó saldada,\n[C] por la persona del [D] cordero inmortal.",
      "chorusPos": [["1"]]
    }
  ],
  "chorus": [
    {
      "id": "1",
      "choir": "[C] Salvación, camino [G] angosto,\n[D] Plenitud incomparable [Em] don de Dios.\n[C] Una cruz cubierta en [G] sangre.\n[D] Fue necesaria para [C] nuestra redención."
    }
  ]
}
```
