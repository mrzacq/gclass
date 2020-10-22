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
firstname string 
lastname string
email string
phone integer

StudentTasks
id (PK)
StudentId integer (FK)
TaskId integer (FK)

Requirement Pair Project:
v 1. CRUD (CREATE, READ, UPDATE, DELETE)
v 2. Association Many to many 
v 3. Class (Static METHOD DI MODEL) & Instance Method
v 4. Helper
v 5. Hooks
 6. Middleware
7. SESSION / tentang login loginan
8. MVP - FITUR UNGGULAN YANG MEMBEDAKAN PROJECT KALIAN DGN PROJECT LAIN / TEKNOLOGI YG BLM PERNAH DIAJARIN
9. Deploy Heroku => https://medium.com/easyread/cara-deploy-express-dan-postrgres-ke-heroku-4b08e6bc1d64
