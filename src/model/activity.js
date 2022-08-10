const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, min: 0, required: true },
    calories: { type: Number, min: 0, required: true },
    note: { type: String, max: 100 },
})

const ActivityModel = mongoose.model('activity', activitySchema)

module.exports = ActivityModel