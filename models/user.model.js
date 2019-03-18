const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 4

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8
  }
},{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret.password,
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

userSchema.pre('save', function (next) {
  const user = this
  if(!user.isModified('password')){
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next()
          })
      })
      .catch(next)
  }
}) 

userSchema.methods.checkPassword = function (password){
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User;
