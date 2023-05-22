import { Router } from "express";
import userSchema from "../models/userSchema.js";
import { hashPassword } from "../utils/hashPassword.js";


const router = Router()

async function registerUser(req, res) {
    // posted data validity
    const {name, password, email, address} = req.body
    if(!name || !password || !email || !address){
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }

    // check if db contain user
    const userExists = await userSchema.exists({
        email
    })

    if(userExists){
        return res.status(400).json({
            success: false,
            message: "User with email already exists"
        })
    }


    // hash password and store to database
    const user = userSchema({
        name, password: await hashPassword(password), email, address
    })
    await user.save()
 
    // return success response
    return res.json(
        {
            success: true,
            message: "User created successfully."
        }
    )
}

router.post("/register", registerUser)

/**
 * GET api for fetching all users
 */
async function getAllUsers(req, res) {
    const users = await userSchema.find();
    res.json(users);
    res.end();
}
router.get('/userInfo', getAllUsers);

/**
 * GET api for fetching a user by id 
 */
async function getUserById(req, res) {
    const user = await userSchema.findOne({
        _id: req.params.id
    });
    res.json(user);
    res.end();
}
router.get('/userInfo/:id', getUserById);

/**
 * POST api for creating a new user
 */
async function addUser(req, res) {
    const { name, age } = req.body;
    const user = await userSchema.create({
        name,
        age
    });
    return res.json(user);
}
router.post('/users', addUser);

/**
 * PUT api for updating a user by id
 */
async function updateUser(req, res) {
    const { name, age } = req.body;
    const user = await userSchema.findOneAndUpdate({
        _id: req.params.id
    }, {
        name,
        age
    }, {
        new: true
    });
    return res.json(user);
}
router.put('/updateUsers/:id', updateUser);

/**
 * DELETE api for deleting a user by id
 */
async function deleteUser(req, res) {
    const user = await userSchema.findOneAndDelete({ _id: req.params.id });
    return res.json(user);
}
router.delete('/deleteUser/:id', deleteUser);

export default router