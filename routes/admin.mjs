import express from 'express'
import { createExam, createQuestions, deleteQuestion, editQuestion, getDepartment, getExamId, getQuestions, getQuestionsByExam } from '../queries.mjs'
import { conn } from '../conn.mjs'
const admin = express.Router()


admin.get('/', async (req, res) => {
    const results = await getDepartment()

    res.render('create.ejs', {
        data: results
    })
})

admin.post('/create', async (req, res) => {
    const body = req.body

    const values = [body.name, body.departmentId]

    await createExam(values)

    res.redirect('questions')
})

admin.get('/adminDashboard', async (req, res) => {
    return res.render('adminDashboard')
})

admin.get('/questions', async (req, res) => {
    const results = await getExamId()

    res.render('questions.ejs', {
        data: results
    })
})

admin.post('/questions', async (req, res) => {
    const body = req.body

    for (let i = 1; i <= 10; i++) {
        const question1 = {
            examId: body.examId,
            question: body['questions[' + i + '][question]'],
            optionA: body['questions[' + i + '][optionA]'],
            optionB: body['questions[' + i + '][optionB]'],
            optionC: body['questions[' + i + '][optionC]'],
            optionD: body['questions[' + i + '][optionD]'],
            answer: body['questions[' + i + '][answer]']

        };
        const values = [
            question1.examId,
            question1.question,
            question1.optionA,
            question1.optionB,
            question1.optionC,
            question1.optionD,
            question1.answer]

        await createQuestions(values)
    }


    res.redirect('/admin/questions')
})

admin.get('/list', async (req, res) => {
    const questions = []
    const examIds = await getExamId()

    res.render('list.ejs', {
        questions: questions,
        data: examIds
    })
})

admin.post('/list', async (req, res) => {
    const examId = req.body.examId
    const questions = await getQuestionsByExam(examId)
    const examIds = await getExamId()

    res.render('list.ejs', {
        questions: questions,
        data: examIds
    })
})

admin.get('/update/:id', async (req, res) => {
    const examId = await getExamId()
    const results = await editQuestion(req.params.id)

    res.render('update.ejs', {
        data: results,
        options: examId
    })

    admin.post('/update/:id', async (req, res) => {
        const body = req.body
        const values = [body.question, body.examId, body.optionA, body.optionB, body.optionC, body.optionD, body.answer, req.params.id]
        const sql = 'UPDATE questions SET question = ?, examId = ?, optionA = ?, optionB = ?, optionC = ?, optionD = ?, answer = ?  WHERE id = ?'
        await conn.execute(sql, values)
        return res.redirect('/admin/list')
    })

})

admin.get('/delete/:id', async function (req, res) {
    await deleteQuestion(req.params.id)

    return res.redirect('/admin/list')
})


admin.get('/Logout', (req, res) => {
    req.session.destroy()

    return res.redirect('login')
  })



export default admin