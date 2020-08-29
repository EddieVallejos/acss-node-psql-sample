'use strict';

const client = require(__dirname + '/../lib/psql');

exports.getMembers = (req, res) => {
  const queryString = `SELECT * from members`;
  client.query(queryString, [])
    .then(result => {
      res.status(200).send(result.rows);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
}

exports.getMembersByStudentNumber = (req, res) => {
  const { student_number } = req.query;

  if (!student_number) {
    res.status(400).send({ message: 'No student number supplied!' });
  }

  const queryString = 'SELECT * from members WHERE student_number = $1';
  client.query(queryString, [student_number])
    .then(result => {
      res.status(200).send(result.rows[0]);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
}

exports.getMembersWithTeam = (req, res) => {
  const queryString = 'SELECT * from members m INNER JOIN members_teams mt ON m.id = mt.member_id INNER JOIN teams t ON t.id = mt.team_id';
  client.query(queryString, [])
    .then(result => {
      res.status(200).send(result.rows);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
}

exports.addMemberToTeam = (req, res) => {
  const { member_id, team_name } = req.body;

  if (!(member_id && team_name)) {
    res.status(400).send({ message: 'Insufficient parameters supplied!' });
  }

  const getTeamQueryString = 'SELECT * from teams WHERE name = $1';
  const insertToTeamQueryString = 'INSERT INTO members_teams VALUES ($1, $2)';

  client.query(getTeamQueryString, [team_name])
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).send({ message: 'No team name found' });
      }

      const team_id = result.rows[0].id;

      client.query(insertToTeamQueryString, [member_id, team_id])
        .then(() => {
          res.status(200).send({ message: 'Member added to the team successfully' });
        })
        .catch(() => {
          res.status(500).send({ message: 'Failed to add member to the team' });
        })
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
}