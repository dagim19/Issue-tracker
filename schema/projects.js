const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let project_schema = new Schema({
    issue_title: {
        type: String,
        required: true
    },
    issue_text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        default: ""
    },
    open: {
        type: Boolean,
        default: true
    },
    status_text: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

let Projects = mongoose.model("Project", project_schema);
module.exports = Projects;