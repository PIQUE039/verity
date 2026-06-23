const jwt = require('jsonwebtoken');

const protect = (req, res, next) =>{
   let token;

   //Checking if token exist in the header
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      try{
         //get token from string 'Bearer <token>'
         token = req.headers.authorization.split(' ')[1];

         //verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         //add user id to the request object
         req.user = decoded.id;

         next(); //moving to the actual logic (the controller)
      }catch(error){
         return res.status(401).json({message:"Not authorized"});
      }
   }

   if(!token){
      res.status(401).json({message:"No token, authorization denied"});
   }
};

module.exports = {protect};