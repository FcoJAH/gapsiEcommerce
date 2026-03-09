# Gestión de Proveedores - Gapsi

## Descripción
Aplicación web diseñada para la administración centralizada de proveedores, permitiendo registrar, visualizar y gestionar proveedores de manera eficiente.

## Requisitos previos
Para ejecutar este proyecto, asegúrate de tener instalado:
* **Java 17 o superior**
* **Maven**
* **Node.js (v18+) y npm**
* **H2**

---

## Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/FcoJAH/gapsiEcommerce.git
cd gapsiEcommerce
```

### 2. Configurar y ejecutar el Backend
```bash
cd backend/ecommerce
mvn clean install
mvn spring-boot:run
```
**Servicio disponible en: http://localhost:8080**

### 3. Configurar y ejecutar el Frontend
```bash
cd frontend
npm install
npm run dev
```
**App disponible en: http://localhost:5173**

## Documentación de la API
Los endpoints del proyecto están documentados en Postman. Puedes importar la colección para probar el servicio:

* **Archivo:** `docs/gapsiEcommerce.postman_collection`
* **Ambiente recomendado:** `http://localhost:8080/api`

## Arquitectura de la Solución
La aplicación comunica un frontend React con un backend Spring Boot mediante una API REST.

## Tecnologías
* **Frontend: React, Material UI, Axios.**
* **Backend: Spring Boot, Spring Data JPA, Hibernate, Validation.**
* **Base de Datos: H2 en memoria.**

