# 🧩 App Social – Fullstack con NestJS, Prisma, PostgreSQL y React

## 📦 Requisitos Previos

- Node.js 18+
- Docker y Docker Compose
- Git
- (Opcional) Postman para pruebas de endpoints

---

## 🚀 Instalación y Puesta en Marcha

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/app-social.git
   cd app-social
   ```

2. **Levanta los servicios con Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   Esto iniciará:
   - Un contenedor `postgres` en el puerto `5432`
   - El backend NestJS en el puerto `3000`
   - El frontend React (Vite) en el puerto `5173`

3. **Aplica las migraciones y el seed (opcional):**
   ```bash
   docker exec -it backend npx prisma migrate dev --name init
   docker exec -it backend npx ts-node prisma/seed.ts
   ```

---

## 👨‍💻 Funcionalidades

### ✅ Registro de Usuario
- URL: `http://localhost:5173/register`

### 🔐 Inicio de Sesión
- URL: `http://localhost:5173/login`

### 👤 Perfil
- URL: `http://localhost:5173/profile`

### 📝 Crear Publicación
- URL: `http://localhost:5173/create-post`

### 📰 Ver Publicaciones
- URL: `http://localhost:5173/posts`

### ❤️ Like a Post
- Desde el feed

---

## ⚙️ Usuarios Predefinidos

```ts
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com', password },
      { name: 'Bob', email: 'bob@example.com', password },
    ],
    skipDuplicates: true,
  });

  console.log('Usuarios predefinidos insertados');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
```

---
