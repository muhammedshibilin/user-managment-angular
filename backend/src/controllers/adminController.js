const db = require('../utils/db');
const { cloudinary } = require('../utils/cloudinary.js');

const getUsers = async (req, res) => {
    try {
        const query = 'SELECT id, name, email, image_url FROM users';
        const result = await db.query(query);
        const users = result.rows; 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    let imageUrl = req.body.oldImageUrl;

    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_images',
            });
            imageUrl = result.secure_url;
        }

        const query = 'UPDATE users SET name = $1, email = $2, image_url = $3 WHERE id = $4 RETURNING *';
        const values = [name, email, imageUrl, id];

        const result = await db.query(query, values);
        const updatedUser = result.rows[0]; 
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};


const deleteUser = async(req,res) => {
    const userId = req.params.id;
console.log("userssssss delelteeingng ",userId)
    try {
        const deleteQuery = 'DELETE FROM users WHERE id = $1';
        await db.query(deleteQuery, [userId]);

        res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}


const createUser = async (req, res) => {
    const { name, email } = req.body;
    let imageUrl = null;

    try {
       
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_images',
            });
            imageUrl = result.secure_url;
        }

        const query = 'INSERT INTO users (name, email, image_url) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, imageUrl];

        const result = await db.query(query, values);
        const newUser = result.rows[0]; 
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
    createUser
};
