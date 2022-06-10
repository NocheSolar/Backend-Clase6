const fs = require('fs');
const express = require ('express')
const app = express ()
const puerto = 8080;


class Contenedor {
    constructor(archivo) {
      this.archivo = archivo;
    }

    async save(object) {
        let products = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')

        if(!products) {
            object.id = 1
            const array = [object]
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array))
            return object.id
        } else {
            products = JSON.parse(products);
            object.id = products.length + 1
            products.push(object)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(products))
            return object.id
        }
    }

    async getAll(){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)

            console.log(products)
            return products
        } catch (error) {
            console.log(`Error2 ${error}`);
        }
    }

    async getById( id ){
        try {
            let products = await fs.promises.readFile( this.archivo, 'utf-8' )
            products = JSON.parse(products)
            let product = products.find(prod => prod.id == id)
            console.log(product)
            return product
        } catch (error) {
            console.log(`Error1 ${error}`);
        }
    }
    async deleteById(id){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)    
            products = products.filter(prod => prod.id !== id)

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto eliminado', products)
            return products
        } catch (error) {
            console.log(`Error3 ${error}`);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile( this.path, '[]' )
            console.log('Se ha eliminado todo');
        } catch (error) {
            console.log(`Error4 ${error}`);
        }
    }

}
const productsList = new Contenedor("./products.txt");

app.get('/', (req,res)=>{
    res.send("Home")
})

app.get('/productos',(req,res)=>{
    const productos = productsList.getAll();
    productos.then(productos => res.json(productos))
})

app.get ('/productoRandom', (req, res)=>{
    const productos = productsList.getAll();

    let randomProduct = Math.floor(Math.random()*productos.length)
    res.json(productos[randomProduct]);
})


app.listen(puerto, () =>{
    console.log (`El servidor se inicio en el puerto ${puerto}`)
})

