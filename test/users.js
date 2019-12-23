var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
var should = chai.should;

var server = require('../index.js')

describe('Users', function(){

    describe('Post user registration test', function(){

        it('it should register a single user,provided username is unique and password is entered', function(done){
            chai.request(server)
            .post('/registration')
            .set('content-type','application/x-www-form-urlencoded')
            .send({
                username:'xyz',
                password:'xyz',
                address: 'xyz'

            })
            .end(function(err,res){
                res.should.have.status(200);
                res.body.should.have.property('message').eql('you have been successfully registered')
            })
        })
        
    })
})