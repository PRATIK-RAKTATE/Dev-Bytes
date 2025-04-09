import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    role: {
        type: String,
        required: true,
        enum: ['student', 'staff', 'assistant'],
        default: 'student'
    },

    childId: {
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'role',
    },

    refreshToken: {
        type: String,
        select: false
    },

    passwordChangedAt: Date,

    active: {
        type: Boolean,
        default: true
    },

    
}, { timestamps: true });

// password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
    next();
});


// instance method
userSchema.methods = {
     isPasswordCorrect: async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
     },

     changePasswordAfter: function(JWTTimestamp) {
        if (this.passwordChangedAt) {
            const changeTimeStamp = parseInt(
                this.passwordChangedAt.getTime() / 1000,
                10
            );
            return JWTTimestamp < changeTimeStamp;
        }
        return false;
     }
};

export const User = mongoose.model('User', userSchema);