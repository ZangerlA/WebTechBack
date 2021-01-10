const db = require("../models");

async function setNewMediaScore(req,res,next) {
    try{
        const reviewPoints  = await db.Review.findAll({attributes:['reviewPoints']})
        let average = 0;
        for (let reviewPoint of reviewPoints){
            average += reviewPoint.dataValues.reviewPoints;
        }
        average = Math.round((average/Object.keys(reviewPoints).length)*10)/10
        console.log(average)
        await db.Medium.update({
                mediaScore: average    //Set db-field [fieldvalue] to content of newInfo
            },
            { where: {
                    id: req.body.MediumId
                }
            })
    }catch (error) {
        res.status(500).send({error: error, message: 'Error calculating and setting new MediaScore'});
    }
}

module.exports = setNewMediaScore;