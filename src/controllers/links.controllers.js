import LinksService from "../services/LinksService.js";

const dbName = "links";
const links = new LinksService(dbName);

export const shortenLink = async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    links.setToken(token);
    const { url } = req.body;
    const response = await links.createNewLink(url);

    res.status(response.status).send(
        response.status === 201 ?
            response.data : response.message);
};

export const getLink = async (req, res) => {
    const { id } = req.params;
    const link = await links.getLinkById(id);

    res.status(link.status).send(link.status === 200
        ? link.data : link.message);
};

export const openLink = async (req, res) => {
};

export const deleteLink = async (req, res) => {
};

export const getUserLinks = async (req, res) => {
};

export const rankLinks = async (req, res) => {
    const result = await links.getLinks();
    res.send(result);
};