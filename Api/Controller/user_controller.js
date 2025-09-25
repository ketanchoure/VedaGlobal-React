
const { encryptPassword, decryptPassword, generateToken } = require("../middleware/auth");
const User = require("../Model/User");


// Only superadmins can create other admins or superadmins


exports.createadmin = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!['admin', 'superadmin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const encryptedPassword = encryptPassword(password);

    try {
        const user = await User.create({
            name,
            email,
            password: encryptedPassword,
            role
        });

        res.status(201).json({ message: `${role} created` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const decryptedPassword = decryptPassword(user.password);
        if (decryptedPassword !== password) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user:{role: user.role,
            email: user.email,
            name: user.name}});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = encryptPassword(updates.password);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Get all users
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Get user by ID
exports.findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

