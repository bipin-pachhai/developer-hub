/*
**Schema.Types.ObjectId a typical, MongoDB 24-character hex string of a 12-byte binary number (e.g., 52dafa354bd71b30fa12c441)
**Schema.Types.Mixed: any type of data (i.e., flexible free type)



const ObjectId = mongoose.Schema.Types.ObjectId,
  Mixed = mongoose.Schema.Types.Mixed
const bookSchema = mongoose.Schema({
  name: String,
  created_at: Date,
  updated_at: {type: Date, default: Date.now},
  published: Boolean,
  authorId : { type: ObjectId, required: true },
    description: { type: String, default: null },
    active: {type: Boolean, default: false},
    keywords: { type: [ String ], default: [] }
    description: {
      body: String,
      image: Buffer
  },
  version: {type: Number, default: function() {return 1;}},
  notes: Mixed,
  contributors: [ObjectId]
})

/////https://github.com/bnoguchi/mongoose-types


*/
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	email: {type : String, required: true, unique: true},
	username: {type: String},
	password: {type: String, required: true},
	createdAt: { type: Date, default: Date.now},
	title: String,
	firstname: String,
	lastname: String,
	displayName: String,
	city: String,
	company: String,
	bio: String,
	picture:{
		data: Buffer,
		contentType: String
	}

});

// we never store real password in our database. We'll apply one-way hash using bcrypt
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10;
var progress = function(){};
//Hooks and methods must be added to the schemas before compiling them to models—in other words, before calling the mongoose.model() method.
//so, before saving user's password, we first generate salt with salt_factor required, hash it using bcrypt hash
userSchema.pre('save', function(next){
	var user = this;
	//if user has not modified password since , we simply return from this middleware
	// else we keep hashing the password
     if (!user.isModified("password")) {
       return done();
  }
 bcrypt.genSalt(SALT_FACTOR, (err , generatedSalt)=>{
 	if(err){
 		// if error occurs while generating salt we simply return with error 
 		//before entering the next stage
       return next(err);  		
 	}//
 	//here we hash the password and store it in database
 	bcrypt.hash(user.password, generatedSalt, (err, hashedPassword)=>{
 		if(err) {return next(err);}
 		user.password = hashedPassword;
 		next();
 	});
 });

});
// here we declare the method to match provided password with the password on database .
userSchema.methods.isAuthenticated = function(myPlaintextPassword){
	return(bcrypt.compareSync(myPlaintextPassword, this.password));

};


var User = mongoose.model('User', userSchema);
module.exports = User;
