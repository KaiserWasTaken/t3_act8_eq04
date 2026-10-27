# Bodrio PopCorn

Mini sistema desarrollado en React para la Actividad 8. Incluye autenticación simulada, catálogo interactivo y operaciones CRUD usando APIs públicas.

## Integrantes

- Navarro Vazquez Jonathan de Jesus
- Perez Cruz Maria Isabel
- Canseco Reyes Juan Carlos

> Los commits conservan el autor de Git de cada integrante.

## API utilizada

- Autenticación: [DummyJSON Auth](https://dummyjson.com/auth/login)
- Catálogo: [DummyJSON Products](https://dummyjson.com/products)

## Funcionalidades

- Login con validación de campos y manejo de credenciales incorrectas.
- Sesión protegida con datos del usuario, foto de perfil y cierre de sesión.
- Sidebar y navbar reutilizables.
- Tabla de productos con búsqueda, filtro por categoría y paginación.
- Selector de 10, 20, 40 o 50 registros por página.
- Parámetros de página y filtros reflejados en la URL.
- Alta, edición y eliminación con petición real a DummyJSON y actualización del estado local.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Credenciales de prueba:

```text
Usuario: emilys
Contraseña: emilyspass
```