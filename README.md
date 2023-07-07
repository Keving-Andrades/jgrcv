<div align="center">
	<img width="200" src="https://i.imgur.com/k0gJA1f.png" alt="JGR - Conexión Viajera" title="JGR - Conexión Viajera"/>
</div>


<h1 align="center">Conexión Viajera</h1>

<h4 align="center">Esta es una página web desarrollada para la empresa Conexión Viajera, dedicada a la Publicidad Turística en el Municipio Juan German Roscio en San Juan de los Morros.</h4>

<br/>

<div align="center">
	<img width="30" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/192107854-765620d7-f909-4953-a6da-36e1ef69eea6.png" alt="HTTP" title="HTTP"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/>
	<img width="30" src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="Figma" title="Figma"/>
</div>

<br/>

<div align="center">
	<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" title="Express.js"></img>
	<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" title="Vite"></img>
	<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" title="MongoDB"></img>
	<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" title="Render"></img>
</div>

<br/>

### 📂 Estructura de carpetas 

```bash
├──ConexionViajera (root)
│  ├── client (frontend folder)
│  │  └── public
│  │  └── src
│  ├── controllers
│  ├── models
│  ├── routes
```

### 👩‍💻 Para desarrolladores 👨‍💻

* Asegúrense estar posicionados en el root del proyecto: `./conexionviajera/`

* Para instalar todas las dependencias, usen el comando:
  ```
  npm run install-all
  ```

* Una vez instaladas las dependencias, deben iniciar el proyecto con el comando:

	```
	npm run dev
	```

### 🏓 La API

La **API** esta desarrollada en un servidor `Express.js`, el cual se inicia junto con el servidor frontend al hacer uso del `npm run dev`.

Por defecto el **puerto** del servidor es `8080` en el modo `development`, pero podría ser cualquier otro al entrar en producción, haciendo uso de la variable de entorno `PORT`.

El archivo `vite.config.js` ya esta configurado para redireccionar todas las consultas `HTTP` a la dirección URL `http://localhost:8080` que pasen por el endpoint:

```js
/api
```

#### 📃 Como usarla

La **API** responde a dos de los métodos `HTTP` más usados: `GET` y `POST`. Todas las respuestas devolverán datos en `json`.

##### GET

El método `GET` de esta **API**, solo tiene un uso:

Obtener todos los comentarios existentes.

La manera de hacerlo sería la siguiente:

```js
GET /api/reviews
```

```js
{
  "status": 200,
  "success": true,
  "content": [
    {
      "name": "Jonaiker Jaspes",
      "location": "Estado Aragua, Venezuela",
      "review": "Fino 👍"
    },
    // ...
  ]
}
```

##### POST

El método `POST` de esta **API**, solo tiene un uso:

Enviar a la base de datos la reseña del formulario.

La manera de hacerlo sería la siguiente:

```js
POST /api/reviews
```

```js
{
  "name": "Génesis Sumoza",
  "review": "Malo 👎"
}
```

```js
{
  "status": 200,
  "success": true,
  "content": {
    "name": "Génesis Sumoza",
    "location": "Distrito Federal, Venezuela",
    "review": "Malo 👎"
  }
}
```
