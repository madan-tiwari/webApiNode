var user = require('../models/UserModel.js')

var bcrypt = require('bcrypt');


function hashGen(req,res,next){
saltRounds = 10; 
//console.log('in has gen');
bcrypt.hash(req.body.password,saltRounds)
.then(function(hash){
  console.log(hash);
  req.userHash = hash;
next();
})
.catch(function(err){
  next('has gen error')
})

}


function validation (req,res,next){
// console.log(req.body.username);

user.findOne({
  where:{username:req.body.username}
})
.then(function(result){
// console.log(result);
if(result === null){
// res.send('user not found so registeed')
next()
}
else{
// console.log('user was already registered');
res.json({status:409, message:'You are already registered'})

}
})
.catch(function(err){
next(err)
})
}


function selectAll(req,res)
{
user.findAll()
.then(function(result)
{
  if(result=== null)
  {
    res.send("No data found")
    
  }else{
    res.json(result)
  }
}).catch(function(err)
{
  next(err)
})
}


function registerUser (req,res,next){
user.create({
username:req.body.username,
password:req.userHash,
address:req.body.address

})
.then(function(result){

// console.log(result);
res.status(201)
res.json({
  satus:201,
  message:"You have regitered"
})
})
.catch(function(err){
//console.log(err)
next(err);
})

}


function selectOne(req,res,next)
{
  user.findOne({
  where:{id:req.params.id}
}).then(function(result)
{
  if(result === null)
  {
    res.json("User not found at " + req.params.id)
  }else{
    res.json(result)
  }
}).catch(function(err)
{
  next(err)
})
}

function deleteUser(req,res,next){

  if(req.params.id===null || undefined){
    res.json({
      status:500,
      message: 'Id needed'
    })
  }

user.destroy({
  where: {
    id:req.params.id
  }
})
.then(function(result){
  if(result === 0 ){
    res.json({status:404,message:'user not found'})
  }
  else{

  }
  //console.log(result);
  res.status(200)
  res.json({status:200, message:'successfully deleted'})

})
.catch(function(err){
next(err);
})

}

function updateUser(req,res,next){
  user.update({
    username:req.body.username,
    address:req.body.address
  },{
    where:{
      id:req.params.id
    }
  })
  .then(function(result){
    if(result===0)
    {
      res.json({
        status:404,
        message:'User not found and not updated'
      })
    }else{
      res.json(result + "updated")
    }
  }). catch(function(err)
  {
    next(err);
  })
}

module.exports = {
  registerUser,
  validation,
  hashGen,
  deleteUser,
  updateUser,
  selectAll,
  selectOne
}