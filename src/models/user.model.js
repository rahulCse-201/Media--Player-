import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        rquired: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        rquired: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        rquired: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,  // cloudanry url 
        rquired: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Videos"
        }
    ],
    password: {
        type: String,
        rquired: [true, "Password is required"]
    },
    refereshToken: {
        type: String
    },
  },
  {
        timestamps: true
    }
)


//  encrypt password when save functionality run  , it have also more functionality  , inside this if password modified than will run this code  otherwise nothing do 
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next()
})



//  create own method isPasswordCorrect , than compare password to authenticate 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}


// generate access token by a own created mthod generateAccessToken
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullNmae : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}



userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}






export const User = mongoose.model("User", userSchema)