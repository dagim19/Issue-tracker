'use strict';
const Projects = require("../schema/projects.js");
const bodyParser = require('body-parser');

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      // let project = req.params.project;
      try {
        let issues = await Projects.find({});
        res.status(200);
        res.type("json");
        res.json(issues);
      } catch (err) {
        res.sendStatus(500);
      }
    })

    .post(async function (req, res) {
      let project = req.params.project;
      let issue = new Projects(req.body);
      try {
        await issue.save();
        res.status(200);
        res.type("json");
        res.json(issue);
      } catch (err) {
        res.status(403);
        res.json({ error: 'required field(s) missing' });
      }
    })

    .put(async function (req, res) {
      let project = req.params.project;
      try {
        await Projects.findOneAndUpdate(req.body._id, {
          $set: req.body
        });
        if (!req.body._id) {
          res.status(403);
          res.type("json");
          res.json({
            error: 'missing _id'
          });
        }
        if (!req.body) {
          res.status(403);
          res.type("json");
          // res.json({
          //   error: 'no update field(s) send',
          //   _id: req.
          // })
        }
        res.status(200);
        res.type("json");
        res.json({
          result: 'successfully updated',
          _id: req.body._id
        });
      } catch (err) {
        res.status(403);
        res.type("json");
        res.json({
          error: 'could not update',
          _id: req.body._id
        })
      }
    })

    .delete(async function (req, res) {
      let project = req.params.project;
      let id = req.body._id;
      try {
        await Projects.findOneAndRemove({
          _id: id
        });
        res.status(200);
        res.type("json");
        res.json({
          result: 'successfully deleted',
          _id: id
        });
      } catch (err) {
        sendStatus(403);
      }
    });

};
