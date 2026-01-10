// ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO EDITAR DIRECTAMENTE.
export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Prueba Técnica PrevalentWare API',
    version: '1.0.0',
    description:
      'Documentación de la API para el Sistema de Gestión de Ingresos y Egresos',
  },
  servers: [
    {
      url: '/',
      description: 'Servidor Actual',
    },
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
    schemas: {
      Movement: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          concept: {
            type: 'string',
            enum: ['INCOME', 'EXPENSE'],
          },
          amount: {
            type: 'number',
          },
          date: {
            type: 'string',
            format: 'date-time',
          },
          userId: {
            type: 'string',
          },
        },
      },
    },
  },
  paths: {
    '/api/movements': {
      get: {
        summary: 'Obtener todos los movimientos',
        description:
          'Retorna una lista de todos los ingresos y egresos registrados.',
        responses: {
          '200': {
            description: 'Lista de movimientos obtenida exitosamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Movement',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Crear un nuevo movimiento',
        description:
          'Registra un nuevo ingreso o egreso. Solo disponible para administradores.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['concept', 'amount', 'date'],
                properties: {
                  concept: {
                    type: 'string',
                    enum: ['INCOME', 'EXPENSE'],
                  },
                  amount: {
                    type: 'number',
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Movimiento creado exitosamente.',
          },
          '400': {
            description: 'Datos de entrada inválidos.',
          },
          '401': {
            description: 'No autorizado.',
          },
          '403': {
            description: 'Prohibido - Solo administradores.',
          },
        },
      },
    },
  },
  tags: [],
};
