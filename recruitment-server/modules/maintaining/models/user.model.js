/**
 * Created by HUGO on 6/30/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoginuserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    userid: {
        type: String,
        lowercase: true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    updated: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Loginuser', LoginuserSchema);
