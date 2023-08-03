import { query } from "express";
import { db } from "../database/database.js"

export default class DbServices {
    constructor(dbName) {
        this.dbName = dbName;
    }

    getDbName() {
        return this.dbName;
    }

    async getAllRows() {
        const query = `
            SELECT * FROM $1;
        `;
        try {
            return await db.query(query, [this.dbName]);
        } catch (error) {
            throw new Error("Database doesn't exist or the connection was lost!", error);
        }
    }

    /**
     * Gets the data in the specific rows, passed as arguments, searchs for as many arguments as the user passes to it,
     * if not found, throws an error and return the rows that were not found in the data base object.
     */
    async getRows(rows = [...arguments]) {
        const numberOfRows = rows.length;
        const query = `
            SELECT ${rows.map((_, i) => `$${i + 1}`).join(", ")}
            FROM $${numberOfRows};
        `;
        try {
            return await db.query(query, [rows, this.dbName]);
        } catch (error) {
            throw new Error("Database doesn't exist or the connection was lost!", error);
        }
    }
};
