const db = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const JWT_SECRET = process.env.jwt_secret




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

const loginUser = async(req,res) => {
    try{
        const { email, password } = req.body;
        console.log(req.body,"bodyyyyy")
        const query = 'select * from users where email = $1';
        const values = [email];
        const result = await db.query(query,values)

        if(result.rows.length === 0){
            return res.status(404).json({Message:'user not found'})
        }
        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            console.log('Password mismatch');
            return res.status(401).json({message:'Invalid credentials',})
        }

        const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email,
              image_url:user.image_url,
              isadmin: user.isadmin
            },
            JWT_SECRET,
            { expiresIn: '1d' }
          );
          
          res.status(200).json({
            message: 'Login successful',
            user: { ...user, token } 
          });
          
    }catch(error){
        console.log('login error',error)
        res.status(500).json({message:'server error',error})
    }
}

module.exports = {
    registerUser,
    loginUser
};
