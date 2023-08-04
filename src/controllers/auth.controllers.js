import UserService from "../services/UserService.js";

const dbName = "users";
const user = new UserService(dbName);

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const insertUser = await user.createUser({ name, email, password });

    return res.status(insertUser.status).send(insertUser.message);
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const authentication = await user.authenticateUser({ email, password });

    res.status(authentication.status).send(authentication.status === 200 ?
        { token: authentication.data.token } : authentication.message);
};