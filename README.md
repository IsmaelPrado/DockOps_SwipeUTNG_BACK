
# 💘 Swipe App – UTNG

Aplicación de tipo "Tinder" para estudiantes de la UTNG.  
Permite a los usuarios registrarse, hacer "swipes" (like/dislike) y crear "matches" cuando ambos se gustan.

---

## 🚀 Tecnologías utilizadas

- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL
- **ORM**: Sequelize
- **Testing**: Jest + Supertest

---

## 📦 Paquetes instalados con `npm`

```bash
npm install pg sequelize express cors dotenv winston joi jest supertest socket.io
```

| Paquete       | Descripción                                              |
|---------------|----------------------------------------------------------|
| `pg`          | Cliente PostgreSQL para Node.js                         |
| `sequelize`   | ORM para modelar y manejar la base de datos              |
| `express`     | Framework backend para crear API REST                   |
| `cors`        | Middleware para control de acceso entre dominios         |
| `dotenv`      | Carga variables de entorno desde `.env`                  |
| `winston`     | Logger profesional para errores e info                   |
| `joi`         | Validación de datos del lado del servidor                |
| `jest`        | Framework de pruebas unitarias                           |
| `supertest`   | Testing para endpoints HTTP con Express                  |
| `socket.io`   | Comunicación en tiempo real entre cliente y servidor (chat) |

---

## 🗄️ Esquema de Base de Datos

### Tabla: `users`

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  career VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> Almacena la información de los usuarios registrados en el sistema.

---

### Tabla: `swipes`

```sql
CREATE TABLE swipes (
  id SERIAL PRIMARY KEY,
  swiper_id INT NOT NULL,        -- quien hace el swipe
  swiped_id INT NOT NULL,        -- a quién se lo hace
  is_like BOOLEAN NOT NULL,      -- true: like, false: dislike
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (swiper_id, swiped_id),
  FOREIGN KEY (swiper_id) REFERENCES users(id),
  FOREIGN KEY (swiped_id) REFERENCES users(id)
);
```

> Guarda los likes o dislikes que hace un usuario hacia otro.  
> Evita que un usuario haga más de un swipe al mismo perfil.

---

### Tabla: `matches`

```sql
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES users(id),
  FOREIGN KEY (user2_id) REFERENCES users(id),
  CHECK (user1_id < user2_id)
);
```

> Registra un match entre dos usuarios que **se dieron like mutuamente**.  
> El `CHECK (user1_id < user2_id)` evita duplicados como (3,5) y (5,3).

---

### Tabla: `messages`

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  match_id INT NOT NULL,         -- a qué match (chat) pertenece el mensaje
  sender_id INT NOT NULL,        -- quién envió el mensaje
  text TEXT NOT NULL,            -- contenido del mensaje
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);
```

> Guarda los mensajes entre dos usuarios que han hecho match previamente.
> Permite identificar qué usuario envió el mensaje (sender_id) y a qué conversación      pertenece (match_id).
> El campo timestamp garantiza que los mensajes se ordenen cronológicamente.

---

## 📌 Lógica de funcionamiento

1. El usuario realiza un **swipe** (like/dislike) a otro perfil.
2. Se guarda en la tabla `swipes`.
3. Si el swipe es **like**, se verifica si el otro usuario también dio like previamente.
4. Si **ambos dieron like**, se crea un registro en la tabla `matches`.

---

## 📫 Endpoints básicos (propuestos)

> Auth Routes 
> 
| Método | Ruta                      | Descripción                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/register`           | Registrar nuevo usuario            |
| POST   | `/api/login`              | Iniciar sesión                     |


> Swipe Routes
>
| Método | Ruta                      | Descripción                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/swipe`              | Enviar like o dislike              |
| GET    | `/api/swipe/user/:userId` | Obtener los swipes de un usuario   |


---

## 📁 Estructura sugerida del proyecto

```
📦 swipe-app/
│
├── 📁 config/
├── 📁 controllers/
├── 📁 middlewares/
├── 📁 models/
├── 📁 routes/
├── 📁 schemas/
├── 📁 services/
├── 📁 tests/
├── .env
├── index.js
├── README.md
└── package.json
```

---

## 📌 Autor

Desarrollado como parte de un proyecto escolar en la **Universidad Tecnológica del Norte de Guanajuato**.
## Participantes:
```
- Cristian Ismael Prado Salazar
- Jassiel Noe Manuel Martínez
- Mayra Alejandra Galván García
- Victor Manuel Arredondo Morales
```
---