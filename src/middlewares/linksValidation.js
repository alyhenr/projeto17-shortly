export default (linksSchema) => (
    (req, res, next) => {
        const { url } = req.body;
        const validation = linksSchema({ url });

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        next();
    }
);