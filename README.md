# 🎬 S7.Films

Aplicación web de películas desarrollada con **React**, **TypeScript** y **Vite**, que consume la API de TMDB (The Movie Database). Permite explorar películas, ver detalles, navegar por géneros y gestionar la autenticación de usuarios con Supabase.

## 🚀 Características

- **Listado de películas** con paginación y scroll infinito  
- **Detalle de película** con información ampliada  
- **Listado y detalle de actores y autores**  
- **Navegación por géneros**  
- **Autenticación de usuarios** (login, registro, perfil) usando Supabase  
- **Diseño responsive** con Material-UI  
- **Despliegue automático** en Vercel al actualizar el repositorio de GitHub  

## 🛠️ Tecnologías

- [React](https://react.dev/)
- [TypeScript](https://www.themoviedb.org/documentation/api)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material-UI](https://mui.com/)
- [Supabase](https://supabase.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Vercel](https://vercel.com/) (deploy automático)

## 📦 Instalación y uso local

1. **Clona el repositorio**
```

git clone https://github.com/EdgarPomar/S7.Films.git
cd S7.Films

```

2. **Instala las dependencias**
```

npm install

```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con tus claves de TMDB y Supabase:

```

VITE_TMDB_API_KEY=tu_clave_tmdb
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_supabase

```

4. **Inicia la aplicación**
```

npm run dev

```

5. **Abre en tu navegador**
```

http://localhost:5173

```

## 🧑‍💻 Scripts útiles

- `npm run dev` - Inicia el servidor de desarrollo  
- `npm run build` - Genera una build de producción  
- `npm run preview` - Previsualiza la build de producción  

## 📝 Notas de desarrollo

- El proyecto está basado en la plantilla oficial de Vite para React + TypeScript.
- Se recomienda usar [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) para mantener la calidad del código.
- El despliegue en Vercel es automático al hacer push a la rama principal (`main`).
