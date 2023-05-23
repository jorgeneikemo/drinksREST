# About
REST api created with expressjs. An api for getting different cocktails. Can query by name or ingredients. Can also get by :id. 

# Installation
```
Clone repository
```
```
npm install
```

# Usage

```
To get all cocktails: /cocktails
```

```
To get cocktail by id: /cocktails/id
```

```
To get cocktail by ingredients: e.g. /cocktails?ingredients=gin
```

```
To get cocktail by name: e.g. /cocktails?name=margarita
```

```
To add a cocktail : post to /cocktails
e.g.

{
    "name": "Radler",
    "ingredients": [
    "Beer",
    "Lerum lemon and lime juice",
    "Club soda"
    ],
    "description": "A refreshing drink."
}
```
