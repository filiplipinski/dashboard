const request = require('supertest');
const {registerUser, loginUser, authenticate} = require('./userController');


const app = require('../../server');

let req;
let res;
let next;

beforeEach(()=>{
  req = {};
  res = {
    json: jest.fn(),
    status: jest.fn()
  };
  next = jest.fn();
})

describe('Login route tests', ()=>{
  it('should inform that login and password is required', async () => {
    const response = await request(app).post('/api/user/login');
  
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("\"Login and password required\"");
    // expect(response.header['content-type']).toEqual("application/json; charset=utf-8");
  });

  // it('should log in', async () => {
  //   req.body = {
  //     userName: 'fake username',
  //     password: 'fake password'
  //   }
  //   loginUser(req,res);

  //   // expect(res.json).toHaveBeenCalledTimes(1);
  //   // expect(res.json).tohaveBeenCalledWith('err')

  // });
});