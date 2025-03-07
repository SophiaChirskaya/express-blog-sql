const connection = require('../data/db');

function index(req, res) {
    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err,results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}
function show(req, res) {

    const id = parseInt(req.params.id)
    const sql ='SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({ error: 'Database query failed' });
        if(results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    })
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
    
    const id = parseInt(req.params.id)
    const sql ='DELETE FROM posts WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if(err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204);
    });
        
}

module.exports = { index, show, store, update, destroy }