# gclass
clone google classroom

Teachers
id (PK)
fullname string 
email string
phone integer

Tasks
id (PK)
taskname string
deadline date
TeacherId integer

Students
id (PK)
firstname string (validate minimal 2 kata) waktu di views
lastname string
email string
phone integer

StudentTasks
id (PK)
StudentId integer (FK)
TaskId integer (FK)