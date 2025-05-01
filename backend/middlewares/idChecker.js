function idChecker(req, res, next) {
    const id = req.params.id || req.body.id;
    if (!id) {
        return res.status(400).send("ID is required");
    }
    req.theID = id;
    next();
}

module.exports = idChecker;
