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
      url: 'https://prevalent-ware-test.vercel.app/api/docs',
      description: 'Producción',
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
          user: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          role: {
            type: 'string',
            enum: ['USER', 'ADMIN'],
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
          'Retorna una lista de todos los ingresos y egresos registrados junto con el total.',
        responses: {
          '200': {
            description:
              'Lista de movimientos y totales obtenida exitosamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    movements: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Movement',
                      },
                    },
                    totalCount: {
                      type: 'number',
                    },
                    totalBalance: {
                      type: 'number',
                    },
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
    '/api/users/{id}': {
      patch: {
        summary: 'Actualizar un usuario',
        description:
          'Actualiza el nombre o el rol de un usuario. Solo administradores.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID del usuario',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  role: {
                    type: 'string',
                    enum: ['USER', 'ADMIN'],
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Usuario actualizado exitosamente.',
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
          '404': {
            description: 'Usuario no encontrado.',
          },
        },
      },
    },
    '/api/users': {
      get: {
        summary: 'Obtener todos los usuarios',
        description:
          'Retorna una lista de todos los usuarios registrados. Solo administradores.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Lista de usuarios obtenida exitosamente.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
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
