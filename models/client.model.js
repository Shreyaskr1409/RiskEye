import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        username: {
            type:      String,
            required:  true,
            lowercase: true,
            trim:      true,
            index:     true,
            unique:    true
        },
        fullname: {
            type:      String,
            required:  true,
            index:     true
        },
        email: {
            type:      String,
            required:  true,
            trim:      true,
            unique:    true,
            lowercase: true
        },
        password: {
            type:      String,
            required:  [true, "Password is Required"]
        },
        apiKey: {
            type: String,
            required: [true, "Api Key is Required"]
        }
    }
)

clientSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

clientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

clientSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

clientSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const Client = new mongoose.model("Client", clientSchema)