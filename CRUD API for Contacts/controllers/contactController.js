
const Contact = require("../models/Contact");

// Create a contact
const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone
        });

        res.status(201).json({
            message: "Contact created successfully",
            contact
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get all contacts
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json({
            count: contacts.length,
            contacts
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get one contact
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({ contact });
    } catch (error) {
        res.status(400).json({
            message: "Invalid contact ID"
        });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact updated successfully",
            contact
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(400).json({
            message: "Update failed",
            error: error.message
        });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid contact ID"
        });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
};
