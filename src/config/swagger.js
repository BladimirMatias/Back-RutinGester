import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RutinGester API',
      version: '1.0.0',
      description: 'API para el backend de RutinGester',
    },
    // Seguridad global para que Swagger UI muestre el botón "Authorize" (Bearer JWT)
    security: [{ bearerAuth: [] }],
    // Usar la misma URL de donde se sirve Swagger UI por defecto.
    // En producción (Render) evita que Swagger intente llamar a localhost.
    servers: [
      {
        url: process.env.SERVER_URL || '/',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js', './src/docs/*.js'],
};

const specs = swaggerJsdoc(options);
export default specs;
