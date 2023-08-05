import LinksService from "../services/LinksService.js";

const dbName = "links";
const links = new LinksService(dbName);

export const shortenLink = async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
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
    const { shortUrl } = req.params;
    const [found, url] = await links.searchForUrl(shortUrl);

    if (found) {
        res.redirect(url)
    } else {
        res.sendStatus(404);
    }

};

export const deleteLink = async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const { id } = req.params;

    links.setToken(token);
    const dbResponse = await links.deleteLink(id);

    res.status(dbResponse.status).send(dbResponse.message);
};

export const getUserLinks = async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    links.setToken(token);
    const dbResponse = await links.getUserLinks();

    res.status(dbResponse.status).send(dbResponse.data || dbResponse.message);
};

export const rankLinks = async (req, res) => {
    const dbResponse = await links.getByViewsCount();
    res.status(dbResponse.status).send(dbResponse.data || dbResponse.message);
};