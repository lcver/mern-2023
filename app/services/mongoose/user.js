const Users = require("../../api/v1/user/model");
const Organizer = require("../../api/v1/organizer/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
    const { organizer, name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        throw new BadRequestError(
            "Password dan confirmation password tidak cocok"
        );
    }

    const result = await Organizer.create({ organizer });
};
