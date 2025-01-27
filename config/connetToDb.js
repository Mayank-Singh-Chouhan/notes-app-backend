const { default: mongoose } = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectToDB;