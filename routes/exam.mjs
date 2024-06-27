import express from 'express'
import { getExamId, getQuestions, saveGrade } from '../queries.mjs'

export const exam = express.Router()

exam.get('/', async(req, res) => {
  const results = await getQuestions()
  const results2 = await getExamId()

  res.render('exam.ejs', {
      questions: results,
      data: results2
  })
})

exam.post('/grade', async (req, res) => {
    const body = req.body; 
    const questions = await getQuestions(req.session.examId);
    
  
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (body[`answer${i}`] == questions[i].answer) {
        score++;
        

      }
    }
  
    const grade = (score / questions.length) * 100;
    req.session.grade = grade.toFixed(1);
    res.render('result.ejs', {
      grade: grade.toFixed(1)

    })
  });

  exam.post('/saveExam', async(req,res) => {
    
    const values = [req.session.data.studentId,  req.session.data.departmentId, req.session.examId, req.session.grade]
    await saveGrade(values)

    res.redirect('/dashboard/home')
  })




export default exam