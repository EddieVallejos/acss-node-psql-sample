'use strict'

const express = require('express'),
      router = express.Router();

const {
  getMembers,
  getMembersByStudentNumber,
  getMembersWithTeam,
  addMemberToTeam
} = require('../../controllers/membersController');

// GET /v1/members routes
router.get('/getACSSMembers', (req, res) => {
  getMembers(req, res);
});

router.get('/getACSSMemberByStudentNumber', (req, res) => {
  getMembersByStudentNumber(req, res);
});

router.get('/getACSSMembersWithTeam', (req, res) => {
  getMembersWithTeam(req, res);
});

// POST /v1/members routes
router.post('/addMemberToTeam', (req, res) => {
  addMemberToTeam(req, res);
})


module.exports = router;