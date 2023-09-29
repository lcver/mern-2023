const { UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
    try {
        let token;

        // check header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            throw new UnauthenticatedError("Authentication invalid");
        }

        const payload = isTokenValid({ token });

        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId,
        };

        next();
    } catch (err) {
        next(err);
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthenticatedError("Unauthorized to access this route");
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizeRoles,
};
