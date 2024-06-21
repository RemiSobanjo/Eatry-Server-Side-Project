const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const decrypt = async (password, hashedPass) => {
    
    const passwordMatches = await bcrypt.compare(password, hashedPass);
    return passwordMatches
}

module.exports = {hashPassword, decrypt};
