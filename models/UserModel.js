var db = require('../config/dbConfig.js')

var user = db.sequelize.define('users', {
//attributes
id: {
	type:db.Sequelize.INTEGER ,
	primaryKey: true,
	autoIncrement:true,
	allowNull:false
},
username: {
	type:db.Sequelize.TEXT ,
	allowNull:false
},
password: {
	type:db.Sequelize.TEXT ,
	allowNull:false
},
address:{
	type:db.Sequelize.TEXT ,
	allowNull:false
}
},
{

freezeTableName: true,
tableName:'user_tables2',
paranoid:true

}
)
var image=db.sequelize.define('images',
{
		//attributes
		id:{
		type: db.Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement: true,
		allowNull:false
	},
	imageName:{
	type: db.Sequelize.STRING,
	allowNull:false
}
	
})

 user.sync({force:false})
 .then(function(){

 })
 .catch(function(err){

console.log(err)

 })

module.exports = {user, image};