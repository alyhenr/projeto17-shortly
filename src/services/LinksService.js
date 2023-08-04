import { nanoid } from "nanoid";

import { db } from "../database/database.js";
import DbServices from "./BaseDBservices.js";

export default class LinksService extends DbServices {
    #token;
    constructor(dbName, token = null) {
        super(dbName);
        this.#token = token;
    }

    setToken(token) {
        this.#token = token;
    }

    /**
     *
     * @param {String} originalLink url sent by the user, to be shortened
     * @returns Status code (status) (401 with token was not found, 201 for success + the shortened link generated (shortUrl), 500 with there's a internal server error) and a message (message) with the details
     */
    async createNewLink(originalLink) {
        const shortenedLink = this.#shortenUrl();
        const query = `
            INSERT INTO ${this.dbName}
            ("createdAt", "userId", "sessionId", "originalLink", "shortenedLink", "views")
            SELECT NOW(), sessions."userId", sessions.id as "sessionId", $1, $2, 0
            FROM sessions
            JOIN users ON users.id = sessions."userId"
            WHERE sessions.token = $3
            RETURNING id;
        `;
        try {
            const response = await db.query(query, [originalLink, shortenedLink, this.#token]);
            if (response.rowCount === 0) {
                return {
                    status: 401, message: "Token is not valid!"
                };
            } else {
                return {
                    status: 201, message: "Shortened!", data: {
                        id: response.rows[0]["id"],
                        shortUrl: shortenedLink,
                    }
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, message: "Internal error when shortening new url, try again..."
            };
        }
    }

    #shortenUrl() {
        return nanoid();
    }

    /**
     *
     * @param {number} limit (optional) limit the number of the links to be returned
     * @param {number} offset (optional) ignores the links before the offset, starts counting from the offset (inclusive)
     * @returns an array of objects of the shortened links and details related to its creation
     */
    async getLinks(limit, offset) {
        let query = `
            SELECT * FROM ${this.dbName};
        `;

        const values = [];
        if (limit) {
            query += `
                LIMIT $1
            `;
            values.push(limit);
        }
        if (offset) {
            query += `
                OFFSET $2
            `;
            values.push(offset);
        }
        return (await db.query(query, values));
    }

    async getLinkById(id) {
        const query = `
            SELECT id, "shortenedLink" as "shortUrl", "originalLink" as url
            FROM ${this.dbName}
            WHERE id = $1;
        `;

        const link = await db.query(query, [id]);
        if (link.rowCount === 0) {
            return {
                status: 404, message: "Link not found."
            };
        } else {
            return {
                status: 200, data: link.rows[0]
            }
        }
    }
};
