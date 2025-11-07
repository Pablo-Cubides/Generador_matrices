# EIA Matrix Studio - Monorepo Integration Guide

Esta aplicación está preparada para integrarse en un monorepo manteniendo toda su funcionalidad.

## ✅ Problemas de Integración Resueltos

### 🔴 CRÍTICOS - SOLUCIONADOS

#### 1. Rutas Relativas Hardcodeadas
- **Antes**: `../../../src/components/...` (fallaba al cambiar estructura)
- **Después**: `@/components/...` usando paths configurados en `tsconfig.json`
- **Configuración**: `baseUrl` y `paths` agregados a `tsconfig.json`

#### 2. process.cwd() en Server Components
- **Antes**: `fs.readFileSync(path.join(process.cwd(), 'content/knowledge/...'))`
- **Después**: `fetch('/knowledge/knowledge.json')` desde client component
- **Archivos movidos**: `content/knowledge/` → `public/knowledge/`

### 🟠 MODERADOS - SOLUCIONADOS

#### 3. Path Resolution
- **Solución**: Configurados paths en `tsconfig.json`:
  ```json
  {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/types": ["./src/types"],
      "@/utils": ["./src/utils"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
  ```

#### 4. Dependencias Duplicadas
- **Solución**: Agregadas `peerDependencies` para React, React-DOM y TypeScript
- **Beneficio**: Reduce bundle size cuando se comparten en monorepo

### 🟡 MENORES - SOLUCIONADOS

#### 5. Knowledge JSON
- **Solución**: Archivos movidos a `public/knowledge/` para acceso desde navegador
- **Compatibilidad**: Funciona tanto standalone como en monorepo

## 🚀 Cómo Integrar en Monorepo

### 1. Estructura Recomendada
```
monorepo/
├── apps/
│   └── eia-matrix-studio/  # ← Esta aplicación
├── packages/
│   ├── ui/                 # Componentes compartidos
│   ├── config/            # Configuración compartida
│   └── ...
└── package.json
```

### 2. Dependencias Compartidas
En el `package.json` del monorepo, instala las dependencias compartidas:

```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9"
  }
}
```

### 3. Configuración de Paths (Opcional)
Si quieres usar paths del monorepo, agrega al `tsconfig.json` de la app:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "paths": {
      "@monorepo/*": ["../../packages/*"],
      // ... paths locales
    }
  }
}
```

## 🧪 Verificación de Funcionalidad

### Build Test
```bash
npm run build  # Debe compilar sin errores
```

### Tests
```bash
npm test       # Debe pasar todos los tests (4/4)
```

### Development
```bash
npm run dev    # Debe iniciar sin problemas
```

## 📁 Archivos Modificados

- `tsconfig.json`: Agregados `baseUrl` y `paths`
- `package.json`: Agregadas `peerDependencies`
- `app/page.tsx`: Cambiado a client component con `fetch`
- `app/comparar/[caseId]/page.tsx`: Imports actualizados
- `app/builder/[caseId]/[matriz]/page.tsx`: Imports actualizados
- `public/knowledge/`: Archivos knowledge movidos aquí

## 🔧 Configuración Mantenida

- ✅ Next.js 15 con App Router
- ✅ TypeScript con configuración estricta
- ✅ Tailwind CSS
- ✅ Vitest para testing
- ✅ Todas las funcionalidades de matrices
- ✅ SEO y performance optimizations
- ✅ API routes para exportación

## 🎯 Beneficios de la Integración

1. **Mantenibilidad**: Paths consistentes y configurables
2. **Performance**: Dependencias compartidas reducen bundle
3. **Flexibilidad**: Fácil mover entre carpetas del monorepo
4. **Consistencia**: Misma configuración en todo el monorepo
5. **Escalabilidad**: Preparado para crecimiento del proyecto