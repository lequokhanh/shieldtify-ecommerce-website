exports.checkPermission = (...permission) => {
    return function (req, res, next) {
        // Check if user has the required permission
        if (!permission.includes(req.user.role)) {
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden',
            });
        }
        next();
    };
};
