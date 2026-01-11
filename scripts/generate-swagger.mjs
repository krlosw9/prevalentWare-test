import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba Técnica PrevalentWare API',
      version: '1.0.0',
      description: 'Documentación de la API para el Sistema de Gestión de Ingresos y Egresos. \n\n**Nota sobre Autenticación:** Esta API utiliza sesiones basadas en cookies. Para probar los endpoints protegidos, simplemente inicia sesión en la aplicación. Swagger heredará automáticamente la sesión de tu navegador.',
    },
    servers: [
      {
        url: '/',
        description: 'Servidor Actual',
      },
    ],
    components: {},
  },
  apis: [path.join(rootDir, 'pages/api/**/*.ts')],
};

const spec = swaggerJsdoc(options);

const targetPath = path.join(rootDir, 'lib/swagger-definition.ts');
const content = `// ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO EDITAR DIRECTAMENTE.
export const swaggerDefinition = ${JSON.stringify(spec, null, 2)};
`;

fs.writeFileSync(targetPath, content);

try {
  console.log('Formatting with Prettier...');
  execSync(`npx prettier --write ${targetPath}`);
} catch (error) {
  console.warn('Could not format with Prettier, but file was saved.');
}

console.log('✅ Swagger definition generated and formatted successfully!');
