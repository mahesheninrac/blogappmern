const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["MASTER_ADMIN", "AUTHOR", "READER"],
        default: "READER"
    }
});