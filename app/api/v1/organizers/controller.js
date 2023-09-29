const { StatusCodes } = require("http-status-codes");
const { createOrganizer } = require("../../../services/mongoose/user");

const createCMSOrganizer = async (req, res, next) => {
    try {
        const result = await createOrganizer(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};
module.exports = {
    createCMSOrganizer,
};
