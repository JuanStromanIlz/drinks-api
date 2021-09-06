# DRINKS API
Si te gusta ser anfitrión u organizar cenas en tu casa sabes muy bien que ninguna reunión está completa sin un toque de novedad, gustos u aromas. Es por eso que uno busca la “frutilla del postre”, algo con que acompañar lo bueno de compartir experiencias.\
drinksAPI te permite buscar tragos por ingredientes así como calcular el precio de cada preparación, según los precios en mercado libre de cada uno de los ingredientes. Por supuesto algunos no los considera, como por ejemplo Hielo y Naranja(a la hora de usar rodajas o la cascara), ya que los considera de uso hogareño y por eso presentes en tu casa.\
A continuación los métodos y rutas para comunicarte con la API, asi como ejemplos de algunas respuestas.\
Recordar que si tomaste no debes conducir.

## Metodos publicos 
## Traer los tragos que contengan los ingredientes consultados
### Request
`GET /drinks/search?i=Hielo&i=Soda`
### Response
````
[
  {
    "name": "Americano",
    "description": "Un clásico trago con gancia que no puedes dejar de probar, su frescura lo convierte en el aliado perfecto para disfrutar a cualquier hora del día.",
    "ingredients": [
      "Soda",
      "Gancia Americano",
      "Gancia Spritz",
      "Hielo"
    ],
    "price": {
      "final": 886,
      "Soda": 199,
      "Gancia Americano": 381,
      "Gancia Spritz": 306
    }
  }
]
```
## Traer una lista con todos los tragos disponibles
### Request
`GET /drinks/list`
### Response
````
[
  {
    "name": "Fernet Cola",
    "description": "De cordoba al mundo",
    "ingredients": [
      "Fernet",
      "Coca Cola",
      "Naranja",
      "Gancia Americano",
      "Gancia Spritz"
    ],
    "price": {
      "final": 1691.78,
      "Fernet": 781.78,
      "Coca Cola": 223,
      "Gancia Americano": 381,
      "Gancia Spritz": 306
    }
  },
  {
    "name": "Cuba Libre",
    "description": "Llenar el vaso con hielo, agregar 50ml de Ron Blanco, 100ml de Coca Cola, decorar con una Rodaje de Limon",
    "ingredients": [
      "Coca Cola",
      "Ron Blanco",
      "Hielo"
    ],
    "price": {
      "final": 1495,
      "Coca Cola": 223,
      "Ron Blanco": 1272
    }
  },
  etc
]
```
## Traer el trago bajo el nombre seleccionado
### Request
`GET /drinks?d=Americano`
### Response
````
[
  {
    "name": "Americano",
    "description": "Un clásico trago con gancia que no puedes dejar de probar, su frescura lo convierte en el aliado perfecto para disfrutar a cualquier hora del día.",
    "ingredients": [
      "Soda",
      "Gancia Americano",
      "Gancia Spritz",
      "Hielo"
    ],
    "price": {
      "final": 886,
      "Soda": 199,
      "Gancia Americano": 381,
      "Gancia Spritz": 306
    }
  }
]
```
## Traer la lista de ingredientes disponibles para la consulta
### Request
`GET /ingredients/list`
### Response
````
[
  "Coca Cola",
  "Fernet",
  "Vodka",
  "Jugo de naranja",
  "Ron Blanco",
  "Hielo",
  "Sprite",
  "Gancia Americano",
  "Gancia Spritz",
  "Ginger Ale",
  "Azucar",
  "Menta",
  "Jugo de limon",
  "Soda",
  "Naranja",
  "Campari",
  "Vermouth Rosso",
  "Ginebra",
  "Limon",
  "Agua tónica"
]
```
## Metodos privados
Al clonar el proyecto para hacer uso de los metodos privados se debera tener en cuenta lo siguiente:
> Todos las rutas privadas necesitan del envio de un JWT token, para obternlo se debera crear `DEV: true` y luego hacer una llamada a `GET /token` para obtener un nuevo token.
## Modelos para la creacion de nuevos documentos:
### Drink
* name: String, Required
* description: String
* ingredients: Array, Required
### Ingredient
* name: String, Required
* listedPrice: Boolean (si es true se buscara el valor del item en mercado libre bajo `listedName` al hacer una nueva consulta)
* listedName String, busqueda para realizar a la api e mercado libre, ej: el ingrediente `Soda` tiene un listedName `soda sifon 1 unidad`
## Crear un nuevo ingrediente
### Request
`POST /ingredients`
### Response
````
{message: 'Ingrediente creado con exito'}
```
## Ver la información completa de un ingrediente
### Request
`GET /ingredients?i=Soda`
### Response
````
{
    "name": "Soda",
    "listedName": "soda sifon 1 unidad",
    "listedPrice": true
}
```
## Editar un ingrediente
### Request
`PATCH /ingredients?i=Soda`
### Response
````
{message: 'Ingrediente editado con exito'}
```
## Eliminar un ingrediente
### Request
`DELETE /ingredients?i=Soda`
### Response
````
{message: 'ingrediente eliminado'}
```
## Crear un nuevo trago
### Request
> Para crear un nuevo trago todos los ingredientes seleccionados deben estar presentes en la db.
`POST /drinks`
### Response
````
{message: 'Trago creado con exito'}
```
## Editar un trago
> Para eliminar uno o mas ingredientes en un trago se los debe enviar bajo el parametro `deleteI`
### Request
`PATCH /drinks?d=Americano`
### Response
````
{message: 'trago editado con exito'}
```
## Eliminar un trago
`delete /drinks?d=Americano`
### Response
````
{message: 'Trago eliminado'}
```