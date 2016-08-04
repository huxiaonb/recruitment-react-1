/**
 * Created by HUGO on 6/30/2016.
 */
'use strict';

var mongoose = require('mongoose');
var user = mongoose.model('Loginuser');


module.exports.findForLogin = function (req, res) {
    console.log(req.body);
    user.findOne({userid:req.body.userid,password:req.body.password},function(err,result){
        if(err){
            return res.status(400).json(err);
        }else{
            return res.status(200).json(result);
        }
    })
};
