const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    time: { type: String },
    description: { type: String },
    task_status: { type: String }

})

module.exports = mongoose.model('Product', ProductSchema);