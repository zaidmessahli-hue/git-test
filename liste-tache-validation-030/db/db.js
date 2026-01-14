import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { existsSync } from 'node:fs'

const IS_NEW = !existsSync(process.env.DB_FILE);

const db = await open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

if(IS_NEW) {
    await db.exec(
        `PRAGMA foreign_keys = ON;

        CREATE TABLE tache(
            id_tache INTEGER PRIMARY KEY,
            texte TEXT NOT NULL,
            est_fait INTEGER NOT NULL DEFAULT 0
        );
        
        INSERT INTO tache(texte, est_fait)
        VALUES('Suivre le cours', 1);
        INSERT INTO tache(texte, est_fait)
        VALUES('Faire le laboratoire', 0);`
    )
}

export { db }
