// Chargement du fichier de configuration
import 'dotenv/config'

// Importations générales du projet
import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { engine } from 'express-handlebars'
import { idValide, texteValide } from './middlewares/validation.js'
import { addTache, cocheTache, getTaches } from './model/tache.js'

// Création du serveur
const app = express();

// Initialisation des engins
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Ajout des middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static('public'));

// Programmation des routes
// Route pour la page d'accueil
app.get('/', async (request, response) => {
    const taches = await getTaches();
    
    response.status(200).render('home', {
        titre: 'Accueil | Liste de tâches',
        styles: ['/css/home.css'],
        scripts: ['/js/home.js'],
        taches: taches
    });
});

// Route pour la page à propos
app.get('/apropos', (request, response) => {
    response.status(200).render('apropos', {
        titre: 'À Propos | Liste de tâches'
    });
});

// Route retournant la liste des tâches à faire
app.get('/api/taches', async (request, response) => {
    const taches = await getTaches();
    response.status(200).json(taches);
});

// Route ajoutant une tâche à la liste des tâches à faire
app.post('/api/tache', texteValide, async (request, response) => {
    const id = await addTache(request.body.texte);
    response.status(201).json({ id: id });
});

// Route cochant ou décochant une tâche dans la liste des tâches à faire
app.patch('/api/tache', idValide, async (request, response) => {
    await cocheTache(request.body.id);
    response.status(200).end();
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.log('Serveur démarré:');
console.log('http://localhost:' + process.env.PORT);