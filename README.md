# 🌱 EIA Matrix Studio - Generador de Matrices de Evaluación de Impacto Ambiental

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC)
![Status](https://img.shields.io/badge/Status-✅%20Completo-success)

**Herramienta educativa interactiva para la construcción y análisis de matrices de Evaluación de Impacto Ambiental (EIA)**

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
```

### **Acceso**
Abrir [http://localhost:3000](http://localhost:3000) en el navegador

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

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui  
- **Exportación**: jsPDF, html2canvas
- **Procesamiento**: Mammoth.js (documentos Word)
- **Deploy**: Vercel-ready

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
