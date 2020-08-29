CREATE TABLE members (
  "id" serial NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "student_number" text NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE teams (
  "id" serial NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE members_teams (
  "member_id" int REFERENCES "members" (id) NOT NULL,
  "team_id" int REFERENCES "teams" (id) NOT NULL,
  PRIMARY KEY ("member_id", "team_id")
);

INSERT INTO members ("first_name", "last_name", "student_number") VALUES ('Eddie', 'Vallejos', '2014-12xx1'), ('Paula', 'Tan', '2014-20xx4');
INSERT INTO teams ("name", "description") VALUES ('Academic Affairs Team', 'Taga-turo, Best Team'), ('Records and Documentation Team', 'Taga-minutes, Second Best Team');
