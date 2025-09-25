const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "sdkjklr823@%234";
const JWT_SECRET = "ed#$630KIkpoijhgfds";

exports.encryptPassword = (password) => {
    return crypto.AES.encrypt(password, SECRET_KEY).toString();
};

exports.decryptPassword = (encryptedPassword) => {
    const bytes = crypto.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(crypto.enc.Utf8);
};

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h'  }
    );
};


exports.verifyadmin = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token, auth denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

       
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Invalid token" });
    }
};

// middleware/authorizeRole.js
exports.authorizeRole=(roles)=> {


    return (req, res, next) => {
        
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
};
  