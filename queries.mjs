import { conn } from "./conn.mjs"
import { exam } from './routes/exam.mjs'

export async function getDepartment() {
  const sql = 'SELECT id, name FROM departments'
  const [result] = await conn.execute(sql)
  return result
}

export async function createStudent(data) {
  const sql = 'INSERT INTO students (fullName, studentId, departmentId, email, password) values(?,?,?,?,?)'
    await conn.execute(sql, data)
}

export async function createAdmin(data) {
  const sql = 'INSERT INTO admin (name, email, password) values(?,?,?)'
    await conn.execute(sql, data)
}

export async function createExam(data) {
  const sql = 'INSERT INTO exams (name, departmentId) values(?,?)'
    await conn.execute(sql, data)
}

export async function getExamId() {
  const sql = 'SELECT id, name FROM exams'
  const [result] = await conn.execute(sql)
  return result
}

export async function getQuestionsByExam(examId) {
  const values = [examId]
  const sql = 'SELECT id, question, optionA, optionB, optionC, optionD, answer FROM questions WHERE examId = ?'
  const [results] = await conn.execute(sql, values)
  return results
}

export async function createQuestions(data) {
  const sql = 'INSERT INTO questions (examId, question, optionA, optionB, optionC, optionD, answer) values(?,?,?,?,?,?,?)'
    await conn.execute(sql, data)
}

export async function getQuestions(examId) {
  const values = [examId]
  const sql = 'SELECT  answer FROM questions WHERE examId = ?'
  const [result] = await conn.execute(sql, values)
  return result
}


export async function editQuestion(id) {
  const sql = 'SELECT * FROM questions  WHERE id = ?'
  const values =[id]
  const [result] = await conn.execute(sql,values)

  return result[0]
}

export async function deleteQuestion(id) {
  const sql = 'DELETE FROM questions WHERE id = ?'
  const values = [id]
  await conn.execute(sql, values)
}

export async function registerStudent(data) {
  const sql = 'INSERT INTO students(fullName, studentId, password, email) VALUES (?, ?, ?, ?)'
  await conn.execute(sql)
}
exam.get('/', async (req, res) => {
  const results = await getQuestions()
  const results2 = await getExamId()

  res.render('exam', {
    questions: results,
    data: results2
  })
})

export async function saveGrade(data) {
  const sql = 'INSERT INTO gradereport (studentId, departmentId, examId, score) VALUES (?, ?, ?, ?)'
  console.log(data);
  await conn.execute(sql, data)
}