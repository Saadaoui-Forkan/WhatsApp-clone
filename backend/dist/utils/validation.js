export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data = req[source];
        const result = schema.safeParse(data);
        if (!result.success) {
            res.status(400).json({
                message: result.error.issues.map((err) => `${err.path}: ${err.message}`),
            });
            return;
        }
        req[source] = result.data;
        next();
    };
};
