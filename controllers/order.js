const User = require("../models/user")
const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const mailgun = require("mailgun-js")
const DOMAIN = 'sandbox10ad0a8fe2524c4fa4290820764953d3.mailgun.org'
const mg = mailgun({apiKey:process.env.MAILGUN_API_KEY, domain: DOMAIN})


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'nanaobengmarnu@gmail.com',
            from: 'noreply@ewemocha.com',
            subject: `A new order is received`,
            html: `
            <p>Customer name:</p>
            <p>Total products: ${order.products.length}</p>
            <p>Total cost: ${order.amount}</p>
            <p>Login to dashboard to the order in detail.</p>
        `
        };
        //sgMail.send(emailData);
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        else{
            const data = {
                from: 'noreply@mocha.com',
                to: 'nanaobengmarnu@gmail.com',
                subject: 'Updated Order Status',
                html: `
                <p>Hi, ${req.body.name}</p>
                <br/>
                <p> The status of your order with transaction ID <b>${req.body.transaction}</b> has been changed to '${req.body.status}'</p>
                
               <br/>
               <br/>
               <p>Regards,</p>
               <p>Ewemocha</p>
        
                `
            }
            mg.messages().send(data,function (error,body){
                if(error){
                    
                    console.log(error.message)
                

                }
                
                  console.log( 'email has been sent')
             
            })
        }
        res.json(order);
    });
};
