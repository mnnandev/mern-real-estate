import mongoose, { mongo } from 'mongoose'
const userSchema = mongoose.Schema({
    username: {
        type:String,
        require:true,
        unique:true,
    },
    email: {
        type:String,
        require:true,
        unique:true,
    },
    password: {
        type:String,
        require:true,
    },
     
},{timestamps:true})
const User = mongoose.model.user || mongoose.model('user',userSchema)
export default User;