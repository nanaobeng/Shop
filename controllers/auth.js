const User = require('../models/user')
const jwt = require('jsonwebtoken');
const _ = require('lodash')
const expressJwt = require("express-jwt")
const {errorHandler} = require('../helpers/dbErrorHandler')
const mailgun = require("mailgun-js")
const DOMAIN = 'sandbox10ad0a8fe2524c4fa4290820764953d3.mailgun.org'
const mg = mailgun({apiKey:process.env.MAILGUN_API_KEY, domain: DOMAIN})



exports.createadmin = (req,res) => {
    //console.log("req.body", req.body)
    const user = new User(req.body)
    user.save( (err,user)  => {

        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })

    })

};

exports.signup = (req,res) => {
    //console.log("req.body", req.body)
    const user = new User(req.body)
    user.save( (err,user)  => {

        if(err){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })

    })

};


exports.signin = (req,res) =>{


    const {email,password} = req.body

    User.findOne({email}, (error,user) => {
        if(!user){
            return res.status(400).json({
                error: "Invalid Credentials"
            });
        }
            if(!user.authenticate(password)){
                return res.status(401).json({
                    error: "Invalid Credentials"
                })
            }


            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
            res.cookie('t',token,{expire: new Date() + 9999})

            const {_id, name , email , role } = user 
            return res.json ({ token, user: {_id,email,name,role}})

    })
}



exports.signout = (req,res) => {
    res.clearCookie('t')
    res.json({message: "Signout Success"})
};



exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty : "auth"
});


exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user){
        return res.status(403).json({

            error: "Access denied"

        })
    }
    next();
}


exports.isAdmin = (req,res,next) => {
    if (req.profile.role === 0){
        return res.status(403).json({
            error : "Admin resource! Access denied"
        });
    }
    next();
}


exports.forgotPassword = (req,res) => {
    const {email} = req.body
    User.findOne({email}, (err,user) => {
        if(err || !user){
            return res.status(400).json({
                error : " User does not exists"
            });
        }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'20m'});
    const data = {
        from: 'noreply@mocha.com',
        to: email,
        subject: 'Reset Password',
        html: `
        <p>Hi,</p>
        <br/>
        <p>Please click the link below and copy the temporary token to succesfully reset your password.</p>
        <p>Token : ${token}</p>
        <p>Reset link : <a href="${process.env.CLIENT_URL}/reset-password/"> Click Here</a></p>
       <br/>
       <br/>
       <p>Regards,</p>
       <p>Ewemocha</p>

        `
    };

    return user.updateOne({resetLink: token}, function(err,success){
        if(err){
            return res.status(400).json({
                error:"reset password link error"
            })
        }
        else {
            mg.messages().send(data,function (error,body){
                if(error){
                    return res.json({
                        error: error.message
                    })
                }
                return res.json({
                    message: 'email has been sent'
                })
            })
        }
    })
    })
}


exports.resetPassword = (req,res) => {
    const {resetLink, newPass} = req.body;
    if(resetLink){
        jwt.verify(resetLink,process.env.JWT_SECRET, function(error,decodedData){
            if(error){
                return res.status(401).json({
                    error: "Token is currently unavailable"
                })
            }
            User.findOne({resetLink}, (err,user) => {
                if(err || !user){
                    return res.status(400).json({
                        error : "Token does not exist or has expired"
                    })
                }
                const obj = {
                    password: newPass,
                    resetLink : ''
                }

                user = _.extend(user,obj);
                user.save((err,result) => {
                    if(err){
                        return res.status(400).json({
                            error : "Reset password link error"
                        })
                    }
                    else {
                        return res.status(200).json({
                            message: "Your Password has successfully been changed"
                        })
                    }
                })
            })
        })
    }
    else{
        return res.status(401).json({ error: "Authentication error "})
    }

}