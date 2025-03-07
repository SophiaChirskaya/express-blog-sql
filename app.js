const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routers/posts');
const cors = require("cors")

// Importo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");

// Importo il middleware di gestione errore not found
const notFound = require("./middlewares/notFound");


// Definizione d'uso di una cartella per i file statici
app.use(express.static('public'));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173'}));

// Definizone di rotta home
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

// Utilizziamo le rotta delle pizze definendo la parte iniziale delle rotte
app.use("/posts", postsRouter)

// Utilizzo il middleware di gestione errore server
app.use(errorsHandler);

// Utilizzo il middleware di gestione errore 404 not found
app.use(notFound);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
});