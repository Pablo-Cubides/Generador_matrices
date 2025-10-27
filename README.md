# 🌱 EIA Matrix Studio - Generador de Matrices de Evaluación de Impacto Ambiental

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)
![Status](https://img.shields.io/badge/Status-✅%20Production%20Ready-success)
![Tests](https://img.shields.io/badge/Tests-4%2F4%20passing-brightgreen)

**Herramienta educativa interactiva para la construcción y análisis de matrices de Evaluación de Impacto Ambiental (EIA)**

---

## 🚀 **PRODUCTION READY** - Optimizado para Producción

✅ **SEO Completo**: Metadata en todas las páginas  
✅ **Performance**: Bundle optimizado con dynamic imports  
✅ **Seguridad**: Headers de seguridad configurados  
✅ **Accesibilidad**: ARIA labels y navegación por teclado  
✅ **Tests**: 4/4 tests pasando  
✅ **Error Handling**: Páginas de error personalizadas  

---

## 🎯 Características Principales

### 📊 **Tres Metodologías Implementadas**
- **🌲 Matriz Leopold**: Magnitud × Importancia con visualización bidimensional
- **⚖️ Matriz Conesa**: Valoración multicriterio con 10 atributos 
- **🔬 Battelle-Columbus**: Sistema UIA (Unidades de Impacto Ambiental)

### 🛠️ **Funcionalidades Interactivas**
- ✅ **Constructor paso a paso**: Flujo educativo guiado
- ✅ **Matrices interactivas**: Sliders, selectores y cálculos en tiempo real
- ✅ **Comparación simultánea**: Vista lado a lado de las tres metodologías
- ✅ **Exportación completa**: PDF profesionales, Excel y CSV
- ✅ **Casos de estudio**: Ejemplos por sectores (infraestructura, minería, etc.)

### 🎨 **Diseño Educativo**
- 📱 **Responsive**: Optimizado para proyección en aula
- 🎓 **Interfaz en español**: Terminología técnica apropiada
- 📈 **Visualizaciones claras**: Gráficos, colores y estadísticas
- 💡 **Explicaciones integradas**: Fórmulas y metodologías detalladas

## 🚀 Instalación y Uso

### **Prerrequisitos**
- Node.js 18+
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/Pablo-Cubides/Generador_matrices.git
cd Generador_matrices

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar tests
npm test
```

### **Acceso**
Abrir [http://localhost:3000](http://localhost:3000) en el navegador

### **Deploy a Producción**

#### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Variables de Entorno (Opcional)
```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## 📋 Estructura del Proyecto

```
├── app/                          # App Router (Next.js 15)
│   ├── page.tsx                 # Página principal
│   ├── matrices/                # Información de matrices
│   ├── selector/                # Árbol de decisión
│   ├── builder/[caseId]/[matriz]/ # Constructor interactivo
│   └── comparar/[caseId]/       # Comparación de matrices
├── src/
│   ├── components/              # Componentes React
│   │   ├── LeopoldMatrix.tsx    # Matriz Leopold interactiva
│   │   ├── ConesaForm.tsx       # Formulario Conesa
│   │   ├── BattelleTable.tsx    # Tabla Battelle
│   │   └── ExportButtons.tsx    # Exportación PDF/Excel/CSV
│   ├── lib/
│   │   └── matrices.ts          # Lógica de cálculo
│   └── types/
│       └── index.ts             # Definiciones TypeScript
└── content/
    └── knowledge/               # Documentos de referencia
```

## 🧮 Metodologías Implementadas

### **1. Matriz Leopold**
- **Fórmula**: S = |Magnitud| × Importancia  
- **Escalas**: Magnitud (-10 a +10), Importancia (1 a 10)
- **Visualización**: Tabla bidimensional con colores por intensidad

### **2. Matriz Conesa**
- **Fórmula**: I = 3×IN + 2×EX + MO + PE + RV + SI + AC + EF + PR + MC
- **Categorías**: Irrelevante (<25), Moderado (25-49), Severo (50-74), Crítico (≥75)
- **10 Criterios**: Intensidad, Extensión, Momento, etc.

### **3. Battelle-Columbus**  
- **Fórmula**: UIA = UIP × (Calidad_con - Calidad_sin)
- **Categorías**: Físico-químico, Biológico, Cultural, Ecológico-estético
- **Sistema cuantitativo**: Basado en Unidades de Impacto Ambiental

## 📄 Exportación

### **Formatos Disponibles**
- **📑 PDF**: Matriz completa con formato profesional
- **📊 Excel**: Datos estructurados con interpretaciones automáticas  
- **📋 CSV**: Formato para análisis estadístico externo

### **Contenido Exportado**
- ✅ Datos completos de la matriz
- ✅ Cálculos y fórmulas aplicadas
- ✅ Interpretaciones y categorías
- ✅ Metadatos (fecha, caso, metodología)

## 🎓 Uso Educativo

### **Para Profesores**
- 📊 **Proyección en aula**: Interfaz optimizada para presentaciones
- 📚 **Casos preparados**: Ejemplos listos por sector industrial
- 🔄 **Comparación metodológica**: Enseñar diferencias entre matrices
- 📈 **Resultados visuales**: Gráficos y estadísticas claras

### **Para Estudiantes**
- 👨‍💻 **Aprendizaje interactivo**: Construcción paso a paso
- 🧮 **Cálculos automáticos**: Verificación de fórmulas en tiempo real
- 📋 **Documentación**: Exportar matrices para reportes
- 🔍 **Análisis comparativo**: Entender fortalezas de cada método

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui  
- **Exportación**: jsPDF, html2canvas, SheetJS (XLSX)
- **Testing**: Vitest, Testing Library
- **CI/CD**: GitHub Actions
- **Deploy**: Vercel-ready

## 🎯 Características de Producción

### SEO Optimizado
- ✅ Metadata completa en todas las páginas
- ✅ Open Graph para redes sociales
- ✅ Sitemap.xml y robots.txt
- ✅ Títulos y descripciones dinámicas

### Performance
- ✅ First Load JS: 102 KB (optimizado)
- ✅ Dynamic imports para librerías pesadas
- ✅ Compresión habilitada
- ✅ Imágenes optimizadas (AVIF/WebP)

### Seguridad
- ✅ Headers de seguridad (HSTS, CSP, X-Frame-Options)
- ✅ Validación de inputs en APIs
- ✅ Rate limiting preparado
- ✅ Sin variables de entorno expuestas

### Accesibilidad (A11y)
- ✅ ARIA labels en componentes interactivos
- ✅ Navegación por teclado
- ✅ Contraste de colores adecuado
- ✅ Estados de loading accesibles

## 📊 Casos de Estudio Incluidos

1. **🛣️ Vías Regionales**: Infraestructura de transporte
2. **⛏️ Minería**: Explotación a cielo abierto  
3. **🌿 Ecoturismo**: Desarrollo sostenible
4. **⚡ Hidroeléctrica**: Generación energética

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork del repositorio
2. Crear branch para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Pablo Cubides**
- 🐙 GitHub: [@Pablo-Cubides](https://github.com/Pablo-Cubides)

## 🙏 Agradecimientos

- Metodología Leopold: U.S. Geological Survey
- Metodología Conesa: Vicente Conesa Fdez-Vítora  
- Metodología Battelle: Battelle Columbus Laboratories
- Comunidad académica de Evaluación de Impacto Ambiental

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**
