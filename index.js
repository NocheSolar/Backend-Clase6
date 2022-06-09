const express = require ('express')
const app = express ()
const puerto = 8080;

app.listen(puerto, () =>{
    console.log (`El servidor se inicio en el puerto ${puerto}`)
})
