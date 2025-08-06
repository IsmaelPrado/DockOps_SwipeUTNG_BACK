# Imagen base oficial de Node.js con Alpine para mayor ligereza
FROM node:18-alpine

# Establecer una variable de entorno para producción
ENV NODE_ENV=production

# Crear y usar un usuario no root para mayor seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Crear directorio de trabajo con permisos adecuados
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias solo de producción
RUN npm install --omit=dev && npm cache clean --force

# Copiar el resto del código
COPY . .

# Cambiar permisos de la carpeta (evitar acceso innecesario)
RUN chown -R appuser:appgroup /app

# Cambiar a usuario no root
USER appuser

# Exponer el puerto necesario
EXPOSE 8080

# Ejecutar la aplicación
CMD ["node", "src/index.js"]
