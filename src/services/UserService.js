import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { db } from "../database/database.js";
import DbServices from "./BaseDBservices.js";

export default class UserService extends DbServices {
    constructor(dbName) {
        super(dbName);
    }

    async createUser({ name: username, email, password }) {
        const hash = bcrypt.hashSync(password, 10);

        const query = `
            INSERT INTO ${this.dbName}
            (username, email, password, lastlogin, "createdAt")
            VALUES ($1, $2, $3, NULL, NOW())
        `;
        try {
            await db.query(query, [username, email, hash]);
            return { message: "User created", status: 201, data: { username, email, hash } };
        } catch (error) {
            return error.detail?.includes("already exists") ? {
                status: 409,
                message: error.detail,
            } : { status: 500, message: "Failed creating new user! Check if tha data was properly validated." }
        }
    };

    /**
     *
     * @param {String} email user's email
     * @param {String} password user's password
     * @returns
     */
    async authenticateUser({ email, password }) {
        const user = (await this.getConditionally("email", email)).rows[0];

        if (user.length === 0) return {
            status: 401, message: "Email not found."
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = this.#generateToken();
            //Update last login of the user:
            await db.query(`
                UPDATE users SET lastlogin = NOW() WHERE email=$1;
            `, [email]);

            // Start new session:
            return this.#createSession({ userId: user.id, token });
        } else {
            return {
                status: 401, message: "Password is wrong!"
            }
        }
    };

    async #createSession({ userId, token }) {
        const query = `
            INSERT INTO sessions
            ("userId", token, "createdAt")
            VALUES ($1, $2, NOW())
        `;

        try {
            await db.query(query, [userId, token]);
            return {
                status: 200, data: { userId, token }
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500, message: "Internal error when starting the session, credentials are ok, try again in a while..."
            };
        }
    };

    #generateToken() {
        return uuid();
    };

};
