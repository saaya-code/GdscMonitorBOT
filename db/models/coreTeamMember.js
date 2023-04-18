const mongoose = require('mongoose');
const { Schema } = mongoose;


const coreTeamMemberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum:["TM", "EER", "MKT","TECH"],
        required: true,
    },
    isLead: {
        type: Boolean,
        required: true,
        default: false,
    },
    committeMettingsAttended: {
        type: Number,
        required: true,
        default: 0,
    },
    coreTeamMeatingAttended: {
        type: Number,
        required: true,
        default: 0,
    }
});

CoreTeamMember = mongoose.model('CoreTeamMember', coreTeamMemberSchema);

module.exports = CoreTeamMember;