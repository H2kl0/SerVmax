# 🚀 SerVmax - Plataforma Inteligente de Gestión de Ideas

SerVmax es una aplicación web innovadora que combina **Django** como backend y **React** como frontend, diseñada para gestionar ideas y proyectos con la ayuda de inteligencia artificial avanzada.

![SerVmax Logo](frontend/src/images/imagen%20principal%20para%20github.png)

## 🌟 Características Principales

### 🤖 **Mimir AI - Asistente Inteligente**
- **Modo Aprendizaje**: `aprender: [tema]` - Genera planes de aprendizaje estructurados
- **Modo Proyecto**: `proyecto: [idea]` - Crea planes de proyecto por fases
- **Modo Negocio**: `negocio: [concepto]` - Análisis de viabilidad de negocios
- **Modo General**: Ideas creativas y direcciones múltiples

### 📊 **Sistema de Gestión Completo**
- Creación y organización de ideas
- Historial completo de respuestas de IA
- Navegación intuitiva entre vistas
- Estadísticas de ideas y respuestas
- Sistema de guardado de respuestas

### 🎨 **Interfaz Moderna**
- Diseño responsivo con Tailwind CSS
- Iconos SVG personalizados
- Navegación fluida entre secciones
- Estados de carga y vacío optimizados

## 🛠️ Tecnologías Utilizadas

### Backend
- **Django 5.2.5** - Framework web principal
- **Django REST Framework** - API REST
- **SQLite** - Base de datos
- **Google Gemini API** - Inteligencia artificial
- **Django CORS Headers** - Manejo de CORS
- **Djoser** - Autenticación

### Frontend
- **React 19.1.1** - Biblioteca de UI
- **Vite 7.1.2** - Build tool y dev server
- **React Router DOM 7.8.2** - Enrutamiento
- **Tailwind CSS 4.1.12** - Framework de CSS
- **ESLint** - Linting de código

## 📋 Requisitos Previos

Antes de instalar SerVmax, asegúrate de tener instalado:

- **Python 3.8+** ([Descargar Python](https://www.python.org/downloads/))
- **Node.js 16+** ([Descargar Node.js](https://nodejs.org/))
- **npm** o **yarn** (incluido con Node.js)
- **Git** ([Descargar Git](https://git-scm.com/))

## ⚡ Inicio Rápido

¿Quieres probar SerVmax rápidamente? Sigue estos pasos:

```bash
# 1. Clonar y entrar al proyecto
git clone <url-del-repositorio>
cd SerVmax

# 2. Configurar backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

# 3. Configurar variables de entorno (crear archivo .env)
echo "SECRET_KEY=django-insecure-cambiar-en-produccion" > .env
echo "GOOGLE_API_KEY=tu-api-key-aqui" >> .env

# 4. Configurar base de datos
python manage.py migrate
python manage.py createsuperuser

# 5. Configurar frontend
cd frontend
npm install

# 6. Ejecutar (2 terminales)
# Terminal 1: python manage.py runserver
# Terminal 2: cd frontend && npm run dev
```

## 🚀 Instalación y Configuración Detallada

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd SerVmax
```

### 2. Configurar el Backend (Django)

#### Crear y activar entorno virtual:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Instalar dependencias de Python:
```bash
pip install -r requirements.txt
```

O instalar manualmente:
```bash
pip install django==5.2.5
pip install djangorestframework==3.15.2
pip install django-environ==0.11.2
pip install django-cors-headers==4.4.0
pip install djoser==2.2.3
pip install google-generativeai==0.8.3
```

#### Configurar variables de entorno:
Copia el archivo de ejemplo y configúralo:

```bash
cp .env.example .env
```

Luego edita el archivo `.env` con tus valores:

```env
SECRET_KEY=tu-clave-secreta-django-aqui
GOOGLE_API_KEY=tu-api-key-de-google-gemini-aqui
```

> **⚠️ Importante**: 
> - Obtén tu API Key de Google Gemini en [Google AI Studio](https://makersuite.google.com/app/apikey)
> - Genera una SECRET_KEY segura para Django

#### Configurar la base de datos:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 3. Configurar el Frontend (React)

#### Navegar a la carpeta frontend:
```bash
cd frontend
```

#### Instalar dependencias de Node.js:
```bash
npm install
```

## 🎯 Ejecución del Proyecto

### Ejecutar el Backend (Terminal 1):
```bash
# Desde la raíz del proyecto
python manage.py runserver
```
El backend estará disponible en: `http://localhost:8000`

### Ejecutar el Frontend (Terminal 2):
```bash
# Desde la carpeta frontend
cd frontend
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

## 🗂️ Estructura del Proyecto

```bash
SerVmax/
├── SerVmaX/                 # Configuración principal de Django
│   ├── settings.py         # Configuraciones del proyecto
│   ├── urls.py            # URLs principales
│   └── wsgi.py            # WSGI configuration
├── journal/                # App principal de Django
│   ├── models.py          # Modelos de datos
│   ├── serializers.py     # Serializers para API
│   ├── views.py           # Vistas de la API
│   └── urls.py            # URLs de la app
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── Home.jsx           # Página principal
│   │   │   ├── IdeasView.jsx      # Vista de todas las ideas
│   │   │   ├── GuideView.jsx      # Vista de guía completa
│   │   │   ├── MimirGuide.jsx     # Guía de Mimir
│   │   │   ├── MimirHistory.jsx   # Historial de respuestas
│   │   │   ├── SparkList.jsx      # Lista de ideas
│   │   │   ├── Notification.jsx   # Notificaciones
│   │   │   └── Icons.jsx          # Iconos SVG
│   │   ├── images/        # Recursos visuales
│   │   └── App.jsx        # Componente principal
│   ├── package.json       # Dependencias de Node.js
│   └── vite.config.js     # Configuración de Vite
├── .env.example           # Plantilla de variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── db.sqlite3             # Base de datos SQLite
├── manage.py              # Script de gestión de Django
├── requirements.txt       # Dependencias de Python
├── LICENSE                # Licencia del proyecto
└── README.md              # Este archivo
```

## 🎮 Guía de Uso

### 🏠 **Página Principal (`/`)**
- Crear nuevas ideas con Mimir AI
- Ver historial reciente de ideas
- Acceso rápido a navegación

### 💡 **Vista de Ideas (`/ideas`)**
- Ver todas las ideas ordenadas por fecha
- Estadísticas completas (total de ideas, respuestas, etc.)
- Expandir historial de cada idea
- Tags de tipos de respuestas

### 📖 **Guía Completa (`/guide`)**
- Tutorial completo de uso
- Ejemplos de comandos para Mimir
- Tips y mejores prácticas

### 🤖 **Comandos de Mimir AI**

| Comando | Ejemplo | Resultado |
|---------|---------|-----------|
| `aprender:` | `aprender: programación en Python` | Plan de aprendizaje estructurado |
| `proyecto:` | `proyecto: app móvil de fitness` | Plan de proyecto por fases |
| `negocio:` | `negocio: tienda online de ropa` | Análisis de viabilidad |
| Sin prefijo | `ideas para mejorar productividad` | Ideas creativas múltiples |

## 💡 Ejemplos de Uso

### Ejemplo 1: Plan de Aprendizaje
```
Entrada: aprender: desarrollo web con React
Salida: Plan estructurado con fundamentos, práctica, proyectos y recursos
```

### Ejemplo 2: Plan de Proyecto
```
Entrada: proyecto: aplicación de gestión de tareas
Salida: Fases del proyecto, tecnologías, cronograma y entregables
```

### Ejemplo 3: Análisis de Negocio
```
Entrada: negocio: servicio de delivery de comida saludable
Salida: Análisis de mercado, modelo de negocio, costos y proyecciones
```

### Ejemplo 4: Ideas Creativas
```
Entrada: formas innovadoras de enseñar programación
Salida: Múltiples enfoques creativos y metodologías
```

## 🔧 Comandos Útiles

### Backend (Django)
```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Ejecutar servidor de desarrollo
python manage.py runserver

# Acceder al shell de Django
python manage.py shell
```

### Frontend (React)
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 🐛 Solución de Problemas

### Problemas Comunes

#### 1. **Error de CORS**
- Verifica que `CORS_ALLOWED_ORIGINS` en `settings.py` incluya `http://localhost:5173`

#### 2. **Error de API Key**
- Asegúrate de que `GOOGLE_API_KEY` esté configurada correctamente en `.env`
- Verifica que la API Key sea válida en Google AI Studio

#### 3. **Error de Base de Datos**
```bash
python manage.py makemigrations journal
python manage.py migrate
```

#### 4. **Problemas con Node.js**
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### 5. **Puerto ocupado**
- Backend: Cambia el puerto con `python manage.py runserver 8001`
- Frontend: Vite automáticamente buscará un puerto disponible

## 🔒 Seguridad

### Variables de Entorno
- **Nunca** commits el archivo `.env`
- Usa claves secretas fuertes y únicas
- Mantén las API Keys seguras

### Producción
- Cambia `DEBUG = False` en `settings.py`
- Configura `ALLOWED_HOSTS` apropiadamente
- Usa una base de datos más robusta (PostgreSQL, MySQL)

## ❓ Preguntas Frecuentes (FAQ)

### **¿Necesito una API Key de Google?**
Sí, SerVmax utiliza Google Gemini AI para generar respuestas inteligentes. Puedes obtener una API Key gratuita en [Google AI Studio](https://makersuite.google.com/app/apikey).

### **¿Puedo usar SerVmax sin conexión a internet?**
No, SerVmax requiere conexión a internet para comunicarse con la API de Google Gemini y generar respuestas de IA.

### **¿Cómo cambio el puerto del servidor?**
- Backend: `python manage.py runserver 8001`
- Frontend: Vite automáticamente detectará puertos disponibles

### **¿Puedo personalizar los prompts de Mimir?**
Sí, puedes modificar los prompts en el archivo `journal/views.py` en la función que maneja las consultas a la IA.

### **¿Cómo exporto mis ideas?**
Actualmente no hay función de exportación, pero puedes acceder a tus datos directamente desde la base de datos SQLite o implementar esta funcionalidad.

### **¿SerVmax es gratuito?**
Sí, SerVmax es completamente gratuito y de código abierto. Solo necesitas una API Key de Google Gemini (que tiene un tier gratuito).

### **¿Puedo contribuir al proyecto?**
¡Por supuesto! Revisa la sección de contribución más abajo para conocer cómo participar.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de **Solución de Problemas**
2. Busca en los **Issues** del repositorio
3. Crea un nuevo **Issue** con detalles del problema

## 🎉 ¡Disfruta usando SerVmax!

SerVmax está diseñado para potenciar tu creatividad y productividad. Experimenta con diferentes tipos de consultas a Mimir AI y descubre nuevas formas de organizar tus ideas y proyectos.

---

**Desarrollado con ❤️ usando Django + React**
