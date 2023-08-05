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

    async isTokenValid() {
        return (await db.query(`
            SELECT 1 FROM sessions WHERE token = $1;
        `, [this.#token])).rowCount > 0;
    }

    async isLinkValid(id) {
        return (await db.query(`
            SELECT 1 FROM ${this.dbName} WHERE id=$1;
        `, [id])).rowCount > 0;
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
                status: 500, message: "Internal error when shortening your new url, try again..."
            };
        }
    }

    #shortenUrl() {
        return nanoid();
    }

    async searchForUrl(shortUrl) {
        const query = `
            UPDATE ${this.dbName}
            SET views = views + 1
            WHERE "shortenedLink"=$1
            RETURNING "originalLink"
        `;

        const originalLink = await db.query(query, [shortUrl]);
        if (originalLink.rowCount === 0) {
            return [false, undefined];
        } else {
            return [true, originalLink.rows[0]["originalLink"]];
        }
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

    async deleteLink(id) {
        if (!(await this.isTokenValid())) {
            return {
                status: 401, message: "Token is not valid!"
            };
        }

        if (!(await this.isLinkValid(id))) {
            return {
                status: 404, message: "Link not found."
            };
        }

        const query = `
            DELETE FROM ${this.dbName} as t1
            USING sessions as t2
            WHERE t1.id = $1
            AND t2."userId" = t1."userId"
            AND t2.token = '${this.#token}'
            RETURNING EXISTS(
                SELECT 1 FROM ${this.dbName} WHERE id=$1
            );
        `;
        const response = await db.query(query, [id]);

        if (response.rowCount === 0) {
            console.log(response);
            return {
                status: 401, message: "Url belongs to another user!"
            };
        } else {
            return {
                status: 204
            };
        }
    }

    async getUserLinks() {
        if (await this.isTokenValid()) {
            const query = `
                SELECT users.id, users.username as name, SUM(links.views)
                AS "visitCount", JSON_AGG(JSON_BUILD_OBJECT(
                    'id', links.id, 'shortUrl', links."shortenedLink", 'url', links."originalLink", 'visitCount', links.views
                )) AS "shortenedUrls"
                FROM users
                JOIN sessions ON sessions.token = '${this.#token}'
                JOIN links ON links."userId" = sessions."userId"
                WHERE users.id = sessions."userId"
                GROUP BY users.id, users.username;
            `;

            try {
                const dbResponse = await db.query(query);
                return {
                    status: 200, data: dbResponse.rows[0],
                }
            } catch (error) {
                console.log(error);
                return {
                    status: 500, message: "Internal error, try again in a while..."
                };
            }
        } else {
            return {
                status: 401, message: "Token is not valid!"
            };
        }
    }

    /**
     *
     * @param {Number} limit (optional) limits the number of objects returned (default = 10)
     * @returns An array of objects with the user's data (id and name) and their number of links and total of views
     */
    async getByViewsCount(limit = 10) {
        const query = `
            SELECT users.id, users.username AS name, COUNT(links) as "linksCount", SUM(links.views) AS "visitCount"
            FROM users
            JOIN links ON links."userId" = users.id
            GROUP BY users.id, users.username
            ORDER BY "visitCount" DESC
            LIMIT $1;
        `;


        try {
            const dbResponse = await db.query(query, [limit]);
            return {
                status: 200, data: dbResponse.rows
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500, message: "Internal error, try again in a while..."
            };
        }
    }
};
