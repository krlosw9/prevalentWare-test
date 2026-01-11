# Sistema de Gestión Financiera - Prueba Técnica PrevalentWare

Este proyecto es una solución fullstack para la gestión de ingresos, egresos y administración de usuarios, construida siguiendo los requisitos de la prueba técnica de PrevalentWare.

## 🚀 Tecnologías Utilizadas

- **Frontend:** Next.js 15 (Pages Router), TypeScript, Tailwind CSS.
- **UI Components:** Shadcn/UI y Lucide React.
- **Backend:** Next.js API Routes con Patrón Service-Repository.
- **Base de Datos:** PostgreSQL (Supabase) con Prisma ORM.
- **Autenticación:** Better Auth (GitHub Provider).
- **Documentación:** OpenAPI / Swagger UI.
- **Testing:** 
  - **Unitarios:** Vitest (via Bun Test) para servicios y repositorios.
  - **E2E:** Playwright para flujo de usuario crítico.

## 🛠️ Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone git@github.com:krlosw9/prevalentWare-test.git
   cd prueba-tecnica-fullstack
   ```

2. **Instalar dependencias:**
   ```bash
   bun install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env` basado en `.env.example`:
   - `DATABASE_URL`: URL de conexión transaccional de Supabase (Connection Pooling).
   - `DIRECT_URL`: URL de conexión directa a la base de datos de Supabase (necesaria para migraciones de Prisma).
   - `BETTER_AUTH_SECRET`: Un string aleatorio de seguridad para firmar las sesiones. Puedes generar uno con `openssl rand -base64 32`.
   - `BETTER_AUTH_URL`: **Fundamental para el cliente de autenticación**. Indica la URL base donde corre la aplicación (ej: `http://localhost:3000`). Se usa en `lib/auth/client.ts` para que el frontend sepa a qué endpoint enviar las peticiones de login/sesión.
   - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: Credenciales obtenidas al crear una OAuth App en GitHub.

4. **Preparar la Base de Datos:**
   ```bash
   bun x prisma migrate dev
   ```

5. **Ejecutar el proyecto:**
   ```bash
   bun dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## 📖 Documentación de la API

La documentación interactiva de la API (Swagger) está disponible en la ruta:
`http://localhost:3000/api/docs`

## 🧪 Pruebas

Para ejecutar las pruebas unitarias:
```bash
bun test
```

Para ejecutar las pruebas de extremo a extremo (E2E):
```bash
bun test:e2e
```
*Nota: Requiere tener instalados los navegadores de Playwright (`npx playwright install chromium`).*

## 🌐 Despliegue

### Opción 1: Despliegue desde Cero (Vercel)
1. Conecta tu repositorio de GitHub a un nuevo proyecto en **Vercel**.
2. Configura todas las **Variables de Entorno** mencionadas en la sección de configuración local. 
   - *Nota:* Cambia `BETTER_AUTH_URL` por la URL de producción proporcionada por Vercel.
3. En la configuración de tu OAuth App en GitHub, añade la URL de producción a los campos `Homepage URL` y `Authorization callback URL` (ej: `https://tu-app.vercel.app/api/auth/callback/github`).
4. Vercel detectará automáticamente Next.js y realizará el build.

### Opción 2: Flujo de Contribución (Deployment Continuo)
Si deseas colaborar en el despliegue actual:
1. Crea una nueva rama para tus cambios: `git checkout -b feature/nueva-mejoras`.
2. Realiza tus commits y sube la rama a GitHub: `git push origin feature/nueva-mejoras`.
3. Abre un **Pull Request** hacia la rama `main`.
4. El sistema de CI de Vercel generará una "Preview Deployment" para revisar los cambios.
5. Una vez aprobado y realizado el **Merge**, los cambios se desplegarán automáticamente a producción.