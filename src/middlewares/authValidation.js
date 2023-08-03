export default (authSchema, action) => (
    (req, res, next) => {
        const userInfo = req.body;
        const validation = authSchema(action, userInfo);

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        next();
    }
);