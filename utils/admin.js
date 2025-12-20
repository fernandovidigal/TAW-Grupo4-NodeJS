const User = require('../models/User'); // Importa o modelo Mongoose
const bcrypt = require("bcrypt"); // Para encriptar a password

exports.createAdminAccount = async (req, res) => {
    // Verifica se o utilizador admin exite
    const admin = await User.findOne({
        username: "admin",
        isAdmin: true
    });

    if(admin) return;

    // Não existe conta de administrador, cria uma
    const password = await bcrypt.hash("admin12345", 10);

    const newAdmin = new User({
        username: "admin",
        email: "admin@email.pt",
        password,
        nome: "Administrador",
        telemovel: "910000000",
        nif: "123456789",
        morada: "Palácio do Administrador",
        fotografia: "https://res.cloudinary.com/dimglbsac/image/upload/v1766227934/admin_lmbqzd.jpg",
        isAdmin: true,
    });

    await newAdmin.save();
}