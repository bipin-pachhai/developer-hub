var express = require('express');
var User = require('../models/users');
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


var router = express.Router();

router.use((req, res, next) =>{
	res.locals.currentUser = req.user;
	next();
});


 router.get('/', (req, res, next)=>{
 	User.find().sort({ createdAt: "descending"}).exec((err, users)=>
 	{
 		if(err){return next({err: "Could not fetch information!!"});}
 		res.status(201).json(users);
 	});

 });


router.post('/signup',[
	body("email").isEmail(),
	body('password').isLength({min: 1})

],( req, res, next)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({ error: errors.array()[0].msg});
	}
	var username = req.body.username;
	var password = req.body.password;
	var email  = req.body.email;
	var confirmpassword = req.body.confirmpassword;
	var title = req.body.title;
	var firstname = req.body.firstname;
	var lastname  = req.body.lastname;
	var city = req.body.city;
	var company = req.body.company;
	var bio = req.body.bio;
	
	if(password !== confirmpassword){
		return next({err: "Password didnot match"});
	  }

	User.findOne({email: email}, (err, user)=>{
			//if some error occurs while finding the user
			if(err){
				return next(err);
			}
			// if user already exists
			if(user){
				return next({err: "An User has already been registered under this email. Please Sign Up with a unique email address." });
   
			}
		  var newUser = new User({
			  email: email,
		   	  username: username,
			  password: password,
			  title: title,
			  firstname: firstname,
       		  lastname: lastname,
       		  city: city,
              company: company,
              bio: bio

		  });
		  newUser.save((err, user) => {
			if (err) {
			  return res.status(400).json({
				err: "NOT able to save user in DB"
			  });
			}        
			 //create token
			 const token = jwt.sign({ _id: user._id }, process.env.SECRET);
			 //put token in cookie
			 res.cookie("token", token, { expire: new Date() + 9999 });
		 
			 //send response to front end
			 const { _id, username, email } = user;
			 return res.status(201).json({ token, user: { _id, username, email }});
		  });
	});
});



router.post('/login',
    [
		body("email").isEmail(),
		body("password").isLength({min: 1})
	
	],
	(req, res, next) => {
		const errors = validationResult(req);
		const { email, password } = req.body;
	  
		if (!errors.isEmpty()) {
		  return res.status(422).json({
			error: errors.array()[0].msg
		  });
		}
	  
		User.findOne({ email }, (err, user) => {
		  if (err || !user) {
			return res.status(400).json({
			  error: "USER email does not exist!"
			});
		  }
	  
		 if (!user.isAuthenticated(password)) {
			return res.json({
			  error: "Email and password do not match"
			});
		  }
		  
	  
		  //create token
		  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		  //put token in cookie
		  res.cookie("token", token, { expire: new Date() + 9999 });
	  
		  //send response to front end
		  const { _id, username, email } = user;
		  return res.status(201).json({ token, user: { _id, username, email }});
		});
		}
 
);
	



							   

router.get('/users/:username', (req , res, next) =>{
	User.findOne({username: req.params.username}, (err, user)=>{
		if(err) {return next(err);}
		if(!user){
			return next(404);
		}
		// we pass the user object as the name user if found to render on profile.ejs
		res.render('profile', {user: user});
	});
	});
	
//when landed to the edit link
// const {ensureAuthenticated} = require('../config/auth');

// router.get('/chat/:username', require('../config/auth').ensureAuthenticated, (req, res)=>{

// 	/* Chat.find({}).then(chat => {
//       res.json(chat);
//     });
//     */
// 	res.render('chat', {username: req.params.username});
//     });

// //Send previous chats save on the database
// router.get('/chats', require('../config/auth').ensureAuthenticated, (req, res)=>{
// 	Chat.find({}).then(chat => {
//       res.json(chat);
//   });
//   });

router.get('/logout',(req, res) => {
	res.clearCookie("token");
	res.json({
	  message: "User signout successfully"
	});  
});



module.exports = router;