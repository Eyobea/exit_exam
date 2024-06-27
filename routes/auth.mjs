import express from 'express';
import bcrypt from 'bcryptjs'
import { conn } from '../conn.mjs';
import { createAdmin, createStudent, getDepartment } from '../queries.mjs';

const auth = express.Router()

// show login form
auth.get('/login', async function (req, res) {
    return res.render('auth/login', { message: 'All fields are required' })
  })


  auth.post('/login', async function (req, res) {
    const sql = 'SELECT * FROM students WHERE email = ?'
    const values = [req.body.email]
    const [result] = await conn.execute(sql, values)
  
    if (result.length === 1) {
      const check = bcrypt.compareSync(req.body.password, result[0].password)
      if (check === true) {
        const role = 'student'
        req.session.data = {
          email: result[0].email,
          id: result[0].id,
          role: role,
          studentId: result[0].studentId,
          departmentId: result[0].departmentId,
          fullName: result[0].fullName
        }
        return res.redirect('/dashboard/home')
      }
  
      return res.send('Invalid password')    
    }
  
    return res.send('Invalid credentials')    
  })

  auth.get('/adminLogin', async function (req, res) {
    return res.render('auth/adminLogin', { message: 'All fields are required' })
  })

  auth.post('/adminLogin', async function (req, res) {
    const sql = 'SELECT * FROM admin WHERE email = ?'
    const values = [req.body.email]
    const [result] = await conn.execute(sql, values)
  
    if (result.length === 1) {
      const check = bcrypt.compareSync(req.body.password, result[0].password)
      if (check === true) {
        const role = 'admin'
        req.session.data = {
          email: result[0].email,
          id: result[0].id,
          role: role
        }
        return res.redirect('/admin/questions')
      }
  
      return res.send('Invalid password')    
    }
  
    return res.send('Invalid credentials')    
  })


  

// show register form
auth.get('/register', async function (req, res) {
    const results = await getDepartment()
    

    return res.render('auth/register.ejs', {
        data: results,
        
    })
  })

  
  // register activity for student
  auth.post('/register', async function (req, res) {
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(body.password, salt)
    const values = [body.fullName, body.studentId, body.departmentId, body.email, hash]
    await createStudent(values)
    return res.redirect('login')
  })  

  
  auth.get('/adminRegister', async function (req, res) {
    
    return res.render('auth/adminRegister.ejs')
  })

  // register activity for admin
  auth.post('/adminRegister', async function (req, res) {
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(body.password, salt)
    const values = [body.name,  body.email, hash]
    console.log(values);
    await createAdmin(values)
    return res.redirect('login')
  })  



export default auth;








