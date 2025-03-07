const posts = require('../data/posts');

function index(req, res) {
    // res.send('Lista dei posts');
    // res.json(posts);
    // Errore Fake
    // kqkqkqkq;
    
    let filteredPosts = posts;
    if(req.query.tag) {
        filteredPosts = posts.filter(
            post => post.tags.includes(req.query.tag)
        );
    }
    res.json(filteredPosts);

    }

function show(req, res) {
    // res.send('Dettagli dei blog' + req.params.id);

    // Recupero dell'id dall'URL e l'ho trasformo in numero
    const id = parseInt(req.params.id)

    // Cerco il post via id
    const post = posts.find(post => post.id ===id);

    // Controllo
    if(!post) {
        res.status(404);
        return res.json({
            errror: "Not found",
            message: "Post non trovato"
        })
    }

    // Restituisco il post richiesto
    res.json(post);
    

}

function store(req, res) {
    // console.log(req.body);
    // res.send('Creazione nuovo blog');

    // Creo nuovo id incrementando di uno l'ultimo id

    const newId = posts[posts.length - 1].id + 1;

    // Creo nuovo oggetto post

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Aggiungo il nuovo post
    posts.push(newPost);
    // Controllo
    console.log(posts);
    // Restituisco lo status corretto e il post creato

    res.status(201);
    res.json(newPost);
    

}

function update(req, res) {
    // res.send('Modifica integrale del blog' + req.params.id);

            // Recupero dell'id dall'URL e l'ho trasformo in numero
            const id = parseInt(req.params.id);
            // Cerco il post via id
            const post = posts.find(post => post.id ===id);
            // Controllo
        if(!post) {
            res.status(404);
            return res.json({
                errror: "Not found",
                message: "Post non trovato"
            })
        }
        // Appporto le modifiche al post trovato
        post.title = req.body.title;
        post.content = req.body.content,
        post.image = req.body.image,
        post.tags = req.body.tags

        // Ritorno il post modificato e stampo il blog

        res.json(post);
        console.log(posts);


}

function destroy(req, res) {
    // res.send('Eliminazione del blog' + req.params.id);

        // Recupero dell'id dall'URL e l'ho trasformo in numero
        const id = parseInt(req.params.id)

        // Cerco il post via id
        const post = posts.find(post => post.id ===id);
    
        // Controllo
        if(!post) {
            res.status(404);
            return res.json({
                errror: "Not found",
                message: "Post non trovato"
            })
        }

        // Cancello il post trovato
        posts.splice(posts.indexOf(post), 1);

        // Check di aggiornamento dati
        console.log(posts);

        // Ritorno la risposta affermativa di avvenuta cancellazione
        res.sendStatus(204);
        
}

module.exports = { index, show, store, update, destroy }