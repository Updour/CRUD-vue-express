const express = require('express');
const User = require('./user.models');

const router = express.Router();;


// get All Data
router.get('/user', async(req, res, next) => {
    const user = await User.find({}).catch((err)=>{  
        console.log(err);
        res.json({ text: 'internal error' })
    })
    if(user){ 
        res.json( user )
    }
    next();
})
// auth ID
router.get('/user/:_id', async( req, res, next ) => {
    let id = req.params._id
    let user =  await User.findOne({ _id : id }).catch(err => {
        console.log(err)
        res.json({ text : 'internal error' })
    })
    if (user) {
        res.json({user})
    }
    next()
})                                                                                                                                                                                                                        
       
// insert into database
router.post('/user', async(req, res) => {
	let body = req.body
    
    let agenid = await User.findOne({agenid : body.agenid}).catch((err) => {
        console.log(err)
        res.json({ text : ' internal error'})
    })
    if (agenid) {
        return res.json({ text : ' agenid is available '})
    }
    let founds = await User.create({
        agenid : body.agenid,
        name : body.name,
        address : body.address,
        nohp    : body.nohp,
        pin : body.pin,
        hrg_khs: body.hrg_khs
    }).catch((err) => { 
        res.json({ text: 'internal error'})
    })
    res.json(founds)
})
// put /edit data 
router.put('/user/:_id', function(req, res, next) {
    let body = req.body
    let id = req.params._id
    let user = {
        agenid : body.agenid,
        name : body.name,
        address : body.address,
        nohp    : body.nohp,
        pin : body.pin,
        hrg_khs: body.hrg_khs
    }
    User.updateOne({ _id: id }, user, function(err, User) {
        if (err) {
            console.log(err) 
            res.send({text : 'internal error'})  
        }else {
            console.log(User)
            res.send({text : 'Successfully user Update', User})
        }
    })
})
// delete
router.delete('/user/:_id', function(req, res) {
    console.log(req.params._id);
    let id = req.params._id;
    console.log(id)
    User.deleteOne({ _id : id }, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Successfully! Users has been Deleted.');   
    });
});
module.exports = router;
