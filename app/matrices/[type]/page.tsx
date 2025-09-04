import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MatrixDetailPage({ params }: { params: { type: string } }) {
  const { type } = await params;
  const matrixData: Record<string, any> = {
    leopold: {
      title: 'Matriz de Leopold',
      description: 'La matriz de Leopold es una herramienta clásica de evaluación de impacto ambiental desarrollada en 1971 por Luna Leopold y sus colaboradores.',
      formula: 'Significancia (S) = |Magnitud| × Importancia',
      explanation: {
        magnitud: 'Grado de alteración que produce la acción sobre el factor. Escala de -10 a +10 con signo (+ beneficioso, - perjudicial).',
        importancia: 'Peso relativo del factor en el conjunto del medio ambiente. Escala de 1 a 10 (1 = poca importancia, 10 = muy importante).',
        significancia: 'Resultado final que combina magnitud e importancia. Permite priorizar impactos.'
      },
      steps: [
        'Identificar acciones del proyecto por fase (preoperativa, operativa, cierre)',
        'Listar factores ambientales (físicos, bióticos, socioeconómicos)',
        'Crear matriz de interacciones acción × factor',
        'Asignar magnitud (-10 a +10) para cada interacción',
        'Asignar importancia (1 a 10) para cada interacción',
        'Calcular significancia S = |Magnitud| × Importancia',
        'Interpretar resultados y priorizar impactos'
      ],
      advantages: [
        'Metodología simple y fácil de entender',
        'Visualización clara en formato matricial',
        'Permite evaluación rápida',
        'Ideal para fines educativos',
        'Diferencia entre impactos positivos y negativos'
      ],
      limitations: [
        'Subjetividad en asignación de valores',
        'No considera interacciones entre impactos',
        'Limitada para proyectos muy complejos',
        'No incluye medidas de probabilidad',
        'Dificultad para comparar proyectos diferentes'
      ]
    },
    conesa: {
      title: 'Matriz de Conesa',
      description: 'Metodología española desarrollada por Vicente Conesa que utiliza evaluación multicriterio con 10 atributos para mayor objetividad.',
      formula: 'I = 3×IN + 2×EX + MO + PE + RV + SI + AC + EF + PR + MC',
      explanation: {
        criteria: 'IN (Intensidad), EX (Extensión), MO (Momento), PE (Persistencia), RV (Reversibilidad), SI (Sinergia), AC (Acumulación), EF (Efecto), PR (Periodicidad), MC (Recuperabilidad)',
        calculation: 'Cada criterio se evalúa en escalas específicas y se pondera según la fórmula',
        categories: 'Irrelevante (<25), Moderado (25-49), Severo (50-74), Crítico (≥75)'
      },
      steps: [
        'Identificar acciones y factores ambientales',
        'Evaluar cada interacción con 10 criterios',
        'IN: Grado de incidencia (1, 2, 4, 8, 12)',
        'EX: Área de influencia (1, 2, 4, 8) + zona crítica',
        'Aplicar fórmula de cálculo I = 3×IN + 2×EX + ...',
        'Categorizar impactos según valor I',
        'Proponer medidas según categoría'
      ],
      advantages: [
        'Mayor objetividad y detalle',
        'Considera múltiples aspectos del impacto',
        'Categorización clara de impactos',
        'Ampliamente aceptada en España',
        'Permite justificación técnica robusta'
      ],
      limitations: [
        'Más compleja de aplicar',
        'Requiere mayor tiempo y conocimiento',
        'Posible sobrecomplicación para proyectos simples',
        'Subjetividad en algunos criterios',
        'Necesita experiencia para aplicar correctamente'
      ]
    },
    battelle: {
      title: 'Sistema Battelle-Columbus',
      description: 'Sistema cuantitativo desarrollado por el Instituto Battelle-Columbus para evaluación objetiva mediante parámetros ambientales.',
      formula: 'UIA = UIP × (Calidad_con_proyecto - Calidad_sin_proyecto)',
      explanation: {
        uip: 'Unidades de Importancia del Parámetro: peso relativo (0-1), suma total = 1',
        quality: 'Calidad ambiental: valor de 0 a 1 (0 = mínima calidad, 1 = máxima calidad)',
        uia: 'Unidades de Impacto Ambiental: resultado que puede ser positivo o negativo'
      },
      steps: [
        'Seleccionar parámetros ambientales relevantes',
        'Asignar UIP (pesos) a cada parámetro',
        'Verificar que suma de UIP = 1',
        'Evaluar calidad sin proyecto (0-1)',
        'Evaluar calidad con proyecto (0-1)',
        'Calcular UIA para cada parámetro',
        'Sumar UIA total y analizar por categorías'
      ],
      advantages: [
        'Enfoque completamente cuantitativo',
        'Permite comparación económica',
        'Resultados objetivos y replicables',
        'Ideal para análisis de alternativas',
        'Agregación por categorías ambientales'
      ],
      limitations: [
        'Requiere datos cuantitativos precisos',
        'Dificultad para valorar aspectos cualitativos',
        'Complejidad en asignación de UIP',
        'Necesita expertise técnico especializado',
        'Posible pérdida de información cualitativa'
      ]
    }
  };

  const matrix = matrixData[type];
  if (!matrix) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">{matrix.title}</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">{matrix.description}</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Fórmula principal</h2>
        <div className="bg-white rounded-lg p-6 text-center">
          <code className="text-2xl font-mono text-primary">{matrix.formula}</code>
        </div>
        <div className="mt-6 grid gap-4">
          {Object.entries(matrix.explanation).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4">
              <div className="font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</div>
              <p className="text-gray-700">{value as string}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">✓ Ventajas</h3>
          <ul className="space-y-2">
            {matrix.advantages.map((advantage: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>{advantage}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-orange-700 mb-4">⚠ Limitaciones</h3>
          <ul className="space-y-2">
            {matrix.limitations.map((limitation: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">•</span>
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h3 className="text-2xl font-bold mb-6">Proceso paso a paso</h3>
        <div className="grid gap-4">
          {matrix.steps.map((step: string, index: number) => (
            <div key={index} className="flex items-start border-l-4 border-primary pl-4 py-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-4 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para aplicar {matrix.title}?</h2>
        <p className="text-lg mb-6">Elige un caso de estudio para ver cómo se aplica esta matriz paso a paso</p>
        <Link 
          href={`/matrices/${type}/casos`}
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-shadow"
        >
          Siguiente: Elegir caso de estudio →
        </Link>
      </div>
    </div>
  );
}
