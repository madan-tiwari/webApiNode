"use strict";
const test = require('express');
// console.log(test);
var bodyParser = require('body-parser');

var multer=require('multer');
var upload = multer({ dest: 'Images/' })
// var userModel = require('./models/UserModel.js')

var swaggerJSDoc= require('swagger-jsdoc') //actual documentation
var swaggerUI=require('swagger-ui-express') //for viewing the documentation

var swaggerDefinition={
	info:{
		title:'NodeJs',
		version:'0.0.1',
		description:'This is description part'
	},
	//this is optional
	securityDefinitions:{
		bearerAuth:{
			type:'apiKey' ,
			name:'authorization' ,
			scheme:'bearer' ,
			in:'header'
		}
	},
	host:'localhost:3000',
	basePath:'/'
}


var swaggerOptions={
	swaggerDefinition,
	apis:['./index.js']
}

var swaggerSepcs=swaggerJSDoc(swaggerOptions)




var userController = require('./controllers/User_Controller.js')

var AuthController = require('./controllers/AuthController.js')

// console.log(db.sequelize);


// var a =10;

// var promiseVal = new Promise(function(resolve,reject){

// setTimeout(function(){

// p
// if( a === 11){
//  resolve('okay, success')
// }
// else{
//  reject('failure')
// }

// },3000)

// })

// console.log(promiseVal);
// promiseVal.then(function(result){
// console.log(result);
// })
// .catch(function(err){
//  console.log(err);
// })
// .finally(function(){

//  console.log('in finally')
// })


var app1 = test()



app1.use(bodyParser.urlencoded({extended:true}))


app1.post('/profile', upload.single('avatar'), function (req, res, next) {
 	// res.file('avatar');
 	res.send('avatar');
})

app1.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
	// req.files is array of photos files
	// req.body will contain the text fields, if there were any
	console.log(req.files);
  })


app1.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSepcs))

/**
/**
 *  @swagger
 *  /registration:
 *   post:
 *    tags:
 *     - user
 *    description: Testing
 *    produces:
 *     - application/json
 *    consumes:
 *     - application/x-www-form-urlencoded
 *    parameters:
 *     - name: username
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is username to be entered
 *     - name: password
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is password to be entered
 *     - name: address
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is address to be entered
 *    responses:
 *     201:
 *      description: Successfully registered
 *	   500:
 *      description:fgfsg
 */
app1.post('/registration',userController.validation,userController.hashGen,userController.registerUser )

/**
 *  @swagger
 *  /login:
 *   post:
 *    tags:
 *     - login
 *    description: Testing login
 *    produces:
 *     - application/json
 *    consumes:
 *     - application/x-www-form-urlencoded
 *    parameters:
 *     - name: username
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is username to be entered
 *     - name: password
 *       in:  formData
 *       type: string
 *       required: true
 *       description: This is password to be entered
 *    responses:
 *     200:
 *      description: succussfully logged in
 *	   500:
 *      description:fgfsg   
 */
app1.post('/login',AuthController.validtor,AuthController.passwordCheck, AuthController.jwtTokenGen)

app1.get('/userlist', AuthController.verifyToken, userController.selectAll);
app1.get('/userselect/:id', AuthController.verifyToken, userController.selectOne);

/**
 *  @swagger
 *  /users/{id}:
 *   delete:
 *    tags:
 *     - DeleteUsers
 *    security:
 *     - bearerAutx`h: [] 
 *    description: Testing delete
 *    produces:
 *     - application/json
 *    parameters:
 *     - name: id
 *       in:  path
 *    responses:
 *     200:
 *      description: successfully deleted
 *     404:
 *      description: user not found
 *	   500:
 *      description:Internal server error
 */
app1.delete('/users/:id',AuthController.verifyToken,userController.deleteUser)
app1.put('/users/:id',AuthController.verifyToken, userController.updateUser)


// app1.post('/profile', upload.single('avatar'), ImageController {
//   // req.file is the avatar file
//   // req.body will hold the text fields, if there were any
// })



app1.use('/*', function(req,res){
  res.status(404)
  res.send('NOT FOUND')
})

app1.post('/hotellist',function(req,res,next){

// console.log(req.body);
res.status(200);


})

app1.get('/hotellist:/id',function(req,res,next){
// console.log(req.params);
// console.log(req.query);
req.testvar = {name:'madan'}
console.log('in first')
next();
}, 

function(req,res,next){
console.log(req.testvar)
next()
}, 

function(req,res){

res.set({
  'Content-Type': 'application/json',
  'abc':'123'
})
res.status(200);
data = {name:'asdasdasd'}
res.json(data)
res.status(200).send('sffdf')
})

// error handlig 1st param err
app1.use(function(err,req,res,next){

console.log(err.message);
res.json({
  status:500,
  message:err.message
})
res.send(err.message)


})



app1.listen(3023);