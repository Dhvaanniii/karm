
const jwt=require("jsonwebtoken");
const User = require("../models/user.schema");
const Guard = require("../models/SecurityGuard.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");

exports.auth = async (req, res, next) => {
    try {
      
      const token = req.cookies['society-auth'] || req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        console.log('401 Error: No token provided');
        console.log('Cookies:', req.cookies);
        console.log('Authorization header:', req.headers.authorization);
        return res.status(401).json({ success: false, message: 'Authorization denied, no token provided' });
      }
  
      console.log('Token received:', token.substring(0, 20) + '...');
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded successfully, userId:', decoded.userId);

     
      let user = await User.findById(decoded.userId);

   
    if (!user) {
      user = await Guard.findById(decoded.userId);
    }
    if (!user) {
      user = await Owner.findById(decoded.userId);
    }
    if (!user) {
      user = await Tenante.findById(decoded.userId);
    }

    
    if (!user) {
      console.log('User not found in database, userId:', decoded.userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  
      
      req.user = user;
      console.log('Authentication successful for:', user._id);
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      console.error("Error type:", error.name);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired, please login again' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
  

  exports.IsAdmin = (req, res, next) => {
      
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
    }
  
    
    if (req.user.role === "admin") {
      next();
    } else {
     
      
      return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
    }
  };
  exports.IsResident = (req, res, next) => {
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
      }
    
      
      if (req.user.role === "resident") {
        next();
      } else {
        console.log(error);
        
        return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
      }
    };

    
    exports.IsSecurity = (req, res, next) => {
      
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
      }
    
      
      if (req.user.role === "security") {
        next();
      } else {
        return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
      }
    };

    exports.IsAdminOrSecurity = (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized, no user found" });
      }
      if (req.user.role === "admin" || req.user.role === "security") {
        next();
      } else {
        return res.status(403).json({ success: false, message: "You are not authorized to access this resource" });
      }
    };
