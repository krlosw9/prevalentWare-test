import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba Técnica PrevalentWare API',
      version: '1.0.0',
      description:
        'Documentación de la API para el Sistema de Gestión de Ingresos y Egresos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(process.cwd(), './pages/api/**/*.ts')], // Busca de forma absoluta
};

export const spec = swaggerJsdoc(options);
