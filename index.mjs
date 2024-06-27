import express from 'express'
import dashboard from './routes/dashboard.mjs'
import admin from './routes/admin.mjs'
import exam from './routes/exam.mjs'
import session from 'express-session'
import auth from './routes/auth.mjs'
import { checkAuth } from './middlewares.mjs'
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(session({
  secret: 'R@nd0mT3xt', resave: false,
  saveUninitialized: true, cookie: { secure: false, maxAge: 60 * 60 * 1000 },
}))


 app.use(checkAuth)
app.use('/dashboard', dashboard)
app.use('/admin', admin)
app.use('/exam', exam)
app.use('/auth', auth)


const port = 4100

app.listen(port, () => {
    console.log('server running on port 4100');
})