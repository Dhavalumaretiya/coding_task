const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const validation = require("../controller/validation");

//=======================[Create User]==================================================================
const createUser = async function(req,res){
try{
    let bodyData = req.body;
    let {name,dob,emailId,password} = bodyData;

    //validation start
    if(Object.keys(bodyData).length===0){
        return res.status(400).send({status:false, message:"Please enter a details in a body"})
    };

    //validation for name
    if(!validation.isValid(name)){
        return res.status(400).send({status:false, message:"Please enter a name"})
    };
    
    let checkName = /^[a-zA-Z ]{2,30}$/.test(name);
    if (!checkName) {
        return res.status(400).send({ status: false, message: 'Name is required in only characters' })
    };
    
    //validation for date of birth date
    if(!validation.isValid(dob)){
        return res.status(400).send({status:false, message:"Please enter a dob"})
    };

    let checkDob = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(dob);
    if (!checkDob) {
        return res.status(400).send({ status: false, message: 'Enter a valid date formate like DD-MM-YYYY or DD/MM/YYYY' })
    };

    //validation for email id
    if(!validation.isValid(emailId)){
        return res.status(400).send({status:false, message:"Please enter a email id"})
    };

    let checkEmailId = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailId);
    if (!checkEmailId) {
        return res.status(400).send({ status: false, message: 'Please enter a valid Email id' })
    };

    let findEmail = await userModel.findOne({emailId});
    if(findEmail){
        return res.status(400).send({status:false, message:"This Email id is alread in use"})
    };

    //validation for password
    if(!validation.isValid(password)){
        return res.status(400).send({status:false, message:"Please enter a password"})
    };

    if (!(password.trim().length >= 8 && password.length <= 15)) {
        return res.status(400).send({ status: false, message: 'Password should have length in range 8 to 15' })
    };
    //validation end

    //Token created
    let token = jwt.sign({emailId,password}, "newYear_2023",{expiresIn:"48hr"});

    //User created
    let userCreate = await userModel.create(bodyData);
    
    return res.status(201).send({status:true, message:"User created successfully", Data:token});

}catch(err){
    return res.status(500).send({status:false, message:err.message});
}
};

//========================[Get user]=======================================================================
const getUser = async function(req,res){
try{
    let token = req.headers["X-Api-Key"];

    if(!token){
        token = req.headers["x-api-key"] 
    }

    if(!token) return res.status(403).send({status:false, message:"Access token missing from header"});
        
    //verify Token
    let verifyToken = jwt.verify(token,'newYear_2023');

    if(!verifyToken){
        return res.status(403).send({status:false,message:"Invalid authentication"})
    };

    let findEmail = verifyToken.emailId;
    let findPassword = verifyToken.password;
    
    let findData = await userModel.findOne({emailId:findEmail,password:findPassword});

    if(!findData)return res.status(404).send({status:false, message:"User not found"})

    return res.status(200).send({status:true, message:"success", Data:findData});
    
}catch(err){
    return res.status(500).send({status:false, message:err.message});
}
}; 

//========================[Get user by id]===================================================================
const getUserById = async function(req,res){
try{
    let userData = req.query.userId;

    if(!validation.vaildObjectId(userData)){
        return res.status(400).send({status:false, message:"Please enter vaild user id"})
    };

    let token = req.headers["X-Api-Key"];

    if(!token){
        token = req.headers["x-api-key"] 
    }

    if(!token) return res.status(403).send({status:false, message:"Access token missing from header"});
        
    //verify Token
    let verifyToken = jwt.verify(token,'newYear_2023');

    if(!verifyToken){
        return res.status(403).send({status:false,message:"Invalid authentication"})
    };

    let findEmail = verifyToken.emailId;
    let findPassword = verifyToken.password;

    let findData = await userModel.findById({_id:userData,emailId:findEmail,password:findPassword});

    if(!findData)return res.status(404).send({status:false, message:"User not found"})

    return res.status(200).send({status:true, message:"success", Data:findData});
         
}catch(err){
    return res.status(500).send({status:false, message:err.message});
}
}; 

//========================[Get all user]===================================================================

const getAllUser = async function(req,res){
try{
    let token = req.headers["X-Api-Key"];
    
    if(!token){
        token = req.headers["x-api-key"] 
    }
    
    if(!token) return res.status(403).send({status:false, message:"Access token missing from header"});
            
    //verify Token
    let verifyToken = jwt.verify(token,'newYear_2023');
    
    if(!verifyToken){
        return res.status(403).send({status:false,message:"Invalid authentication"})
    };
    
    let findData = await userModel.find();
    
    if(!findData)return res.status(404).send({status:false, message:"User not found"})
    
    return res.status(200).send({status:true, message:"success", Data:findData});
             
}catch(err){
    return res.status(500).send({status:false, message:err.message});
}
}; 
//========================[Delete user]===================================================================
const deleteUser = async function(req,res){
try{
    let userData = req.query.userId;

    if(!validation.vaildObjectId(userData)){
        return res.status(400).send({status:false, message:"Please enter vaild user id"})
    };

    let token = req.headers["X-Api-Key"];
    
    if(!token){
        token = req.headers["x-api-key"] 
    }
    
    if(!token) return res.status(403).send({status:false, message:"Access token missing from header"});
            
    //verify Token
    let verifyToken = jwt.verify(token,'newYear_2023');
    
    if(!verifyToken){
        return res.status(403).send({status:false,message:"Invalid authentication"})
    };
    
    let findEmail = verifyToken.emailId;
    let findPassword = verifyToken.password;
        
    let findData = await userModel.findOneAndDelete({_id:userData,emailId:findEmail,password:findPassword});
    
    if(!findData) return res.status(404).send({status:false, message:"User not found"});
    
    return res.status(200).send({status:true, message:"User delete successfully"});
        
}catch(err){
    return res.status(500).send({status:false, message:err.message});
}
}; 
//======================================================================================================
module.exports = {createUser,getUser,getUserById,getAllUser,deleteUser};