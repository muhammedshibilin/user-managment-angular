const db = require('../utils/db');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        console.log('Entering registerUser controller');
        const { name, email, password } = req.body;
        const imagePath = req.file ? req.file.path : null;
        
        console.log('Received data:', { name, email, imagePath });

        const hashedPassword = await bcrypt.hash(password, 10);
     

        const query = 'INSERT INTO users (name, email, password, image_url) VALUES ($1, $2, $3, $4) RETURNING id';
        const values = [name, email, hashedPassword, imagePath];

        console.log('Executing query:', query);
        console.log('Query values:', values);

        const result = await db.query(query, values);

        console.log('Query result:', result);

        if (result.rows && result.rows.length > 0) {
            console.log('hiiii sucessss',result.rows[0].id )
            res.status(200).json({ message: 'User registration successful', userId: result.rows[0].id });
        } else {
            console.log('fialed broooo')
            throw new Error('No rows returned from insert query');
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
}

module.exports = {
    registerUser
};