const Users = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");

const createOrganizer = async (req) => {
    const { organizer, name, email, password, role, confirmPassword } =
        req.body;
    if (password !== confirmPassword) {
        throw new BadRequestError(
            "Password dan confirmation password tidak cocok"
        );
    }

    const result = await Organizer.create({ organizer });

    const user = await Users.create({
        name,
        email,
        password,
        role,
        organizer: result._id,
    });

    delete user._doc.password;

    return user;
};

module.exports = { createOrganizer };
