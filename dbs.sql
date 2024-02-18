CREATE TABLE Students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F', 'X'),
  date_of_birth DATE NOT NULL,
  enrollment_date DATE NOT NULL
);

CREATE TABLE Years (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE Terms (
  id SERIAL PRIMARY KEY,
  year_id INTEGER REFERENCES Years(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE Guardians (
  id SERIAL PRIMARY KEY,
  type ENUM('Parent', 'Grandparent', 'Carer'),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE Student_Guardians (
  student_id INTEGER REFERENCES Students(id) NOT NULL,
  guardian_id INTEGER REFERENCES Guardians(id) NOT NULL,
  PRIMARY KEY (student_id, guardian_id)
);

CREATE TABLE Year_Levels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE Enrollments (
  student_id INTEGER REFERENCES Students(id) NOT NULL,
  year_level_id INTEGER REFERENCES Year_Levels(id) NOT NULL,
  year_id INTEGER REFERENCES Years(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE
);

CREATE TABLE Classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  term_id INTEGER REFERENCES Terms(id) NOT NULL,
  year_level_id INTEGER REFERENCES Year_Levels(id) NOT NULL,
  classroom_id INTEGER REFERENCES Classrooms(id) NOT NULL,
  teacher_id INTEGER REFERENCES Teachers(id) NOT NULL
);

CREATE TABLE Subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  department_id INTEGER REFERENCES Departments(id) NOT NULL
);

CREATE TABLE Departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Class_Subjects (
  class_id INTEGER REFERENCES Classes(id) NOT NULL,
  subject_id INTEGER REFERENCES Subjects(id) NOT NULL,
  PRIMARY KEY (class_id, subject_id)
);

CREATE TABLE Student_Classes (
  student_id INTEGER REFERENCES Students(id) NOT NULL,
  class_id INTEGER REFERENCES Classes(id) NOT NULL,
  PRIMARY KEY (student_id, class_id)
);

CREATE TABLE Teachers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F', 'X'),
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE Classrooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255),
  capacity INTEGER
);

CREATE TABLE Periods (
  id SERIAL PRIMARY KEY,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

CREATE TABLE Class_Periods (
  class_id INTEGER REFERENCES Classes(id) NOT NULL,
  period_id INTEGER REFERENCES Periods(id) NOT NULL,
  day ENUM('MON', 'TUE', 'WED', 'THU', 'FRI'),
  PRIMARY KEY (class_id, period_id, day)
);

CREATE TABLE Grades (
  student_id INTEGER REFERENCES Students(id) NOT NULL,
  class_id INTEGER REFERENCES Classes(id) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  PRIMARY KEY (student_id, class_id)
);

CREATE TABLE Letter_Grades (
  score_min INTEGER NOT NULL,
  score_max INTEGER NOT NULL,
  letter_grade CHAR(1) NOT NULL,
  PRIMARY KEY (score_min, score_max)
);

-- Add your specific grading scale data to Letter_Grades
