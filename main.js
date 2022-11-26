const { MongoClient } = require('mongodb');


const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'myProject';

async function main() {
    await client.connect();
    console.log('conectado correctamente');
    const db = client.db(dbName);
    const Biblioteca = db.collection('libros');



    const agregamosArray = await Biblioteca.insertMany([{ "Nombre": "El hobbit", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 1937 },
    { "Nombre": "The lord of the rings", "Autor": "J.R.R.Tolkien", "Editorial": "De bolsillo", "Año de edición": 1954 },
    { "Nombre": "Las aventures de Tom Bombadil", "Autor": "J.R.R.Tolkien", "Editorial": "Penguin Books", "Año de edición": 1934 },
    { "Nombre": "Los hijos de Húrin", "Autor": "J.R.R.Tolkien", "Editorial": "Planeta", "Año de edición": 2007 }])


    const buscartodo = await Biblioteca.find().toArray();
    console.log('4-1 =>', buscartodo);


    const Siglo21 = await Biblioteca.find({ "Año de edición": { $gte: 2000 } }).toArray();
    console.log('4-2 =>', Siglo21)


    const buscarEditorial = await Biblioteca.find({ "Editorial": "Planeta" }, { "Nombre": 1 }).toArray();
    console.log('4-3 =>', buscarEditorial)


    const buscarAño = await Biblioteca.find({ $and: [{ "Año de edición": { $gte: 1930 } }, { "Año de edición": { $lt: 1940 } }] }, { projection: { _id: 0 } }).toArray();
    console.log('4-4 =>', buscarAño)


    const agregarStock = await Biblioteca.updateMany({ "Nombre": "Los hijos de Húrin" }, { $set: { "stock": 37 } })

    const mostrarSet = await Biblioteca.find({ "Nombre": "Los hijos de Húrin" }).toArray();
    console.log('5-1 =>', mostrarSet);


    const agregarStockTodos = await Biblioteca.updateMany({ "Autor": "J.R.R.Tolkien" }, { $set: { "stock": 37 } })

    const mostrarTodo = await Biblioteca.find().toArray();
    console.log('5-2 =>', mostrarTodo);



    const eliminarUno = await Biblioteca.deleteOne({ "Nombre": "Las aventures de Tom Bombadil" })
    const verLoEliminado = await Biblioteca.find().toArray();
    console.log('6-1 =>', verLoEliminado)

    const eliminarMuchos = await Biblioteca.deleteMany({ "Año de edición": { $eq: 1937 } })
    const MuestraLoEliminado = await Biblioteca.find().toArray();
    console.log('6-2 =>', MuestraLoEliminado)


    const agregarNuevo = await Biblioteca.insertOne({ "Nombre": "Innador", "Autor": "J.R.R.Tolkien", "Editorial": "Gallito", "Año de edición": 2022, "Valoracion": 5, "Reseña": "Muy buen libro" })
    const verNuevo = await Biblioteca.find().toArray();
    console.log('7-1 =>', verNuevo)


    const agregarReseña = await Biblioteca.updateMany({ "Nombre": "Innador" }, { $set: { "Reseña1": "Gran libro" } })
    const agregarReseña_2 = await Biblioteca.updateMany({ "Nombre": "Innador" }, { $set: { "Reseña2": "Muy recomendable" } })
    const verReseñaAgregada = await Biblioteca.find().toArray();
    console.log('7-2 =>', verReseñaAgregada)


    const InsertarGenero = await Biblioteca.updateOne({ "Nombre": 'The lord of the rings' }, { $set: { 'Genero': 'Terror' } })
    const InsertarGenero2 = await Biblioteca.updateOne({ "Nombre": 'Los hijos de Húrin' }, { $set: { 'Genero': 'Accion' } })
    const InsetrarGenero4 = await Biblioteca.updateOne({ "Nombre": 'Innador' }, { $set: { 'Genero': 'Fantasia' } })
    const verInserts = await Biblioteca.find().toArray();
    console.log('7-3 =>', verInserts)

    await Biblioteca.drop()

    return 'done.';
}

main()
    .then(x => console.log(x))
    .catch(console.error)
    .finally(() => client.close());