import { db } from '../db/db.js'

/**
 * Retourne la liste des tâches à faire.
 * @returns La liste des tâches à faire.
 */
export async function getTaches() {
    const taches = await db.all(
        `SELECT * FROM tache;`
    )

    return taches;
}

/**
 * Ajoute une tache à faire dans la liste.
 * @param {string} texte Texte de la nouvelle tâche à faire.
 */
export async function addTache(texte) {
    const result = await db.run(
        `INSERT INTO tache(texte)
        VALUES(?);`,
        [texte]
    );

    return result.lastID;
}

/**
 * Coche ou décoche une tâche dans la liste de tâches à faire.
 * @param {number} id Identifiant de la tâche à cocher ou décocher dans la liste.
 */
export async function cocheTache(id) {
    await db.run(
        `UPDATE tache
        SET est_fait = NOT est_fait
        WHERE id_tache = ?;`,
        [id]
    );
}