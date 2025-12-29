📘 Quiz App — Versión 1.0

🎯 Objetivo de la aplicación

Crear una aplicación web simple, funcional y estable de preguntas por capítulos, que permita al usuario:
• Elegir un capítulo
• Responder preguntas
• Ver su progreso y puntaje
• Retomar el uso sin perder avances

Esta versión prioriza funcionar completa antes que crecer en complejidad.

⸻

✅ Qué hace la app (V1.0)

🏠 Vista de inicio
• Pantalla inicial clara
• Acceso al listado de capítulos

📚 Listado de capítulos
• 18 capítulos disponibles
• Cada capítulo se puede seleccionar
• Visualización básica de progreso por capítulo (completado / no completado)

❓ Vista de preguntas
• Muestra preguntas de un capítulo seleccionado
• Preguntas de opción múltiple
• Feedback inmediato (correcto / incorrecto)
• Avance pregunta por pregunta
• Botón “Volver al menú de capítulos”

🧮 Score (puntaje)
• Puntaje acumulado global
• El score se actualiza según respuestas correctas
• Visible para el usuario (simple, sin rankings)

💾 Persistencia de datos
• Uso de localStorage
• Se guarda:
• Progreso por capítulo
• Respuestas correctas / incorrectas
• Score total
• Al recargar la página:
• El progreso se mantiene
• El score se mantiene
• La app no se reinicia

⸻

❌ Qué NO hace la app (fuera de V1.0)

Estas funcionalidades no se implementan en esta versión, aunque sean buenas ideas:
• Usuarios / login
• Rankings o tablas comparativas
• Animaciones complejas
• Estadísticas avanzadas
• Dificultad adaptativa
• Temporizadores
• Modo examen
• Backend o base de datos externa
• Diseño visual avanzado

👉 Todas estas ideas se anotan en un documento aparte: “Ideas futuras”.

⸻

🧱 Alcance técnico (V1.0)
• HTML
• CSS (simple, utilitario)
• JavaScript Vanilla
• Sin frameworks
• Sin backend
• Deploy estático (Netlify o GitHub Pages)

⸻

📦 Contenido mínimo
• 18 capítulos
• Mínimo 10 preguntas por capítulo
• Total mínimo: 180 preguntas
• El contenido es parte esencial del producto

⸻

🧭 Roadmap acordado

🔹 Paso A — Definir V1 (este documento) ✅

Alcance claro y cerrado.

🔹 Paso B — Cerrar features

No se agregan nuevas funcionalidades hasta terminar V1.

🔹 Paso C — Completar contenido

Carga de preguntas y respuestas.

🔹 Paso D — Pulir UX mínima
• Botón volver
• Score visible
• Textos claros y consistentes

🔹 Paso E — Deploy
