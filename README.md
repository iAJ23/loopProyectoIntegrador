# LOOP - Red Social para Programadores

> La plataforma de networking premium diseñada por y para desarrolladores e ingenieros de software. Conexión directa y análisis avanzados sin ruido intrusivo.

![Loop Preview](./assets/preview.png)

**Bootcamp:** Generation México - Agosto a Noviembre 2026  
**Equipo:** Equipo 1  
**Repositorio:** https://github.com/iAJ23/loopProyectoIntegrador.git

---

## 1. Descripción del Proyecto

Bienvenido al repositorio oficial de **LOOP**, la red social y plataforma de colaboración diseñada específicamente para programadores, estudiantes y profesionales del sector tecnológico.

En un mercado altamente competitivo, **LOOP busca solucionar la falta de espacios especializados para la promoción de trabajos freelance tecnológicos y el desarrollo colaborativo.** La plataforma facilita la creación de contactos, la difusión de proyectos y el fortalecimiento de la empleabilidad de sus usuarios, permitiendo formar equipos y presentar propuestas grupales.

A diferencia de redes genéricas, Loop está optimizada para developers, con una experiencia oscura, fluida y sin ruido intrusivo, enfocada en código, arquitectura y networking de alto nivel.

---

## 2. Funcionalidades Implementadas

El proyecto ya funciona de extremo a extremo:

- [x] **Registro** con validación de mayoría de edad (+18) y validación de correo único
- [x] **Inicio de sesión** y autenticación segura
- [x] **Creación de publicaciones** (posts de código/proyectos)
- [x] **Sistema de comentarios**
- [x] **Reacciones / Likes**
- [x] **Sistema de amigos / red de contactos**
- [x] Búsqueda de perfiles y membresía Premium (UI)

**Diferencia técnica clave:**
- Registro = `INSERT INTO Usuario` + encriptación de contraseña
- Login = `SELECT + comparación de hash` + generación de sesión

---

## 3. Tecnologías Utilizadas

| Capa | Tecnologías |
| :--- | :--- |
| **Front End** | HTML5, CSS3, Bootstrap 4, ECMAScript 6 (JavaScript) |
| **Back End** | Java, Spring Boot, Postman |
| **Base de Datos** | MySQL (Relacional) + Modelado NoSQL con JSON |
| **Control de Versiones** | Git, GitHub |

---

## 4. Modelo de Base de Datos

### Relacional (MySQL) - Implementado en el proyecto
```dbml
Table Usuario {
  id_usuario int [pk, increment]
  nombre_usuario varchar(50) [unique]
  correo varchar(150) [unique]
  contrasena_hash varchar(255)
  fecha_nacimiento date
  fecha_registro datetime
  foto_perfil varchar(255)
  biografia text
}

Table Publicacion {
  id_publicacion int [pk, increment]
  id_usuario int [ref: > Usuario.id_usuario]
  contenido text
  fecha_publicacion datetime
  likes int
}

Table Comentario {
  id_comentario int [pk, increment]
  id_publicacion int [ref: > Publicacion.id_publicacion]
  id_usuario int [ref: > Usuario.id_usuario]
  mensaje text
}
