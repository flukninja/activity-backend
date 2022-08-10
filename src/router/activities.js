const express = require('express')
const ActivityModel = require('../model/activity')
const router = express.Router()

router.get('/', async(req, res) => {
    const activities = await(ActivityModel.find())
    res.send(activities.map((act) => act.toJSON()))
})

router.get('/:activityId', async (req, res) => {
    console.log("GET data from", req.params)
    const activity = await ActivityModel.findById(req.params.activityId)
    if (!activity) {
        res.status(404).end()
    }
    res.json(activity.toJSON())
})

router.post('/', async (req, res) => {
    console.log('Body')
    console.log(req.body)
    const activity = new ActivityModel(req.body)
    const validateResult = activity.validateSync()
    if (validateResult) {
        return res.status(400).send('Bad request')
    }
    await activity.save()
    res.send(activity.toJSON())
})

router.patch('/:activityId', async (req, res) => {
    // res.send('update')
    const uid = req.params.activityId
    const activity = await ActivityModel.updateOne({"_id": uid}, {$set:(req.body)}) 
    if (!activity) {
        res.status(404).end()
    }
    console.log(`updated data in id ${uid} !!`)
    res.status(200).send('activity updated')
    // res.json(activity.toJSON())
})

router.delete('/:activityId', async (req, res) => {
    const uid = req.params.activityId
    const activity = await ActivityModel.deleteOne({"_id": uid}) 
    if (!activity) {
        res.status(404).send('Activity not exists')
    }
    res.status(200).send(`activity id: ${uid} is deleted`)
})

module.exports = router