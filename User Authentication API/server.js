
const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary storage for registered users
const users = [];
let nextUserId = 1;

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "User Authentication API is running"
    });
});

// Signup route
app.post("/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email, and password are required"
            });
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                error: "Please enter a valid email address"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check for duplicate email
        const existingUser = users.find(
            user => user.email === normalizedEmail
        );

        if (existingUser) {
            return res.status(409).json({
                error: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            id: nextUserId++,
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        };

        users.push(newUser);

        // Never return the password or hash
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});


app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const user = users.find(
            user => user.email === normalizedEmail
        );

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // Compare password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
