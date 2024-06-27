import express from 'express'
import {  getExamId, getQuestionsByExam } from '../queries.mjs'
import { conn } from '../conn.mjs'
import { checkAuth } from '../middlewares.mjs'

const dashboard = express.Router()

dashboard.get('/home', async (req, res) => {

    const results2 = await getExamId()
    const questions = []
    return res.render('dashboard.ejs', {
        data: results2,
        questions: questions

    })
})

dashboard.post('/home/:id', async (req, res) => {
    const examId = req.params.id
    console.log(examId);
    req.session.examId = examId
    const questions = await getQuestionsByExam(examId)
    console.log(req.session.data.studentId);

    res.render('exam.ejs', {
        questions: questions,
        
    })

    
})

dashboard.get('/profile', async (req, res) => {
  
    
    const data = [
        { FullName: 'John Doe',
         gmail: 'xsharif2551@gmail.com'
            },
       
    ];
   

    res.render('profile.ejs', {
       data: data
    })
})

dashboard.get('/Logout', (req, res) => {
    req.session.destroy()

    return res.redirect('login')
  })

















export default dashboard