import { texteEstValide } from './validation.js'

// Variables
const listeTache = document.getElementById('liste-tache');
const formTache = document.getElementById('form-tache');
const texteTache = document.getElementById('texte-tache');
const checkboxes = document.querySelectorAll('#liste-tache input[type=checkbox]');
const erreur = document.getElementById('erreur');

// Fonctionnalités
/**
 * Ajoute une tâche dans l'interface graphique
 * @param {number} id Identifiant de la tâche dans la liste sur le serveur.
 * @param {string} texte Texte de la tâche à ajouter.
 * @param {boolean} estFait Valeur indiquant si la tâche est coché ou non.
 */
function addTacheClient(id, texte, estFait) {
    const li = document.createElement('li');

    const label = document.createElement('label');
    li.append(label);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = estFait;
    checkbox.addEventListener('change', cocheTacheServeur);
    checkbox.dataset.id = id;
    label.append(checkbox);

    const texteTache = document.createTextNode(texte);
    label.append(texteTache);

    listeTache.append(li);
}

/**
 * Ajoute une tâche dans la liste sur le serveur et dans l'interface 
 * graphique.
 * @param {SubmitEvent} event Évènement de soumission du formulaire.
 */
async function addTacheServeur(event) {
    event.preventDefault();

    // Préparation des données
    const data = {
        texte: texteTache.value
    }

    // Réinitialise les messages d'erreurs
    erreur.innerText = '';

    // Validation
    if(!texteEstValide(data.texte)) {
        erreur.innerText = 'Veuillez entrer un texte entre 1 et 250 caractères.';
        return;
    }

    // Envoyer la requête HTTP
    const reponse = await fetch('/api/tache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // Traitement de la réponse
    if(reponse.ok) {
        // Chercher les données de la réponse
        const dataReponse = await reponse.json();

        addTacheClient(dataReponse.id, data.texte, false);
        texteTache.value = '';
        texteTache.focus();
    }
}

/**
 * Change l'état d'une tâche dans la liste sur le serveur.
 * @param {Event} event Évènement de changement d'état de la case à cocher.
 */
function cocheTacheServeur(event) {
    // Préparation des données
    const data = {
        id: parseInt(event.currentTarget.dataset.id)
    };

    // Envoyer la requête HTTP
    fetch('/api/tache', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// À exécuter au démarrage
formTache.addEventListener('submit', addTacheServeur);
for(const checkbox of checkboxes) {
    checkbox.addEventListener('change', cocheTacheServeur);
}