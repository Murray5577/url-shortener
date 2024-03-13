const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.redirect('/shorturl')
})

app.get('/shorturl',(req,res)=>{
    res.render('index')
})

app.get('/shorten',(req,res)=>{
    res.render('short')
})

//不一定要
app.get('/shorturl/:id', (req, res) => {
    const id = req.params.id
    res.send(`read shorturl: ${id}`)
})

app.listen(port,()=>{
    console.log(`express server is running on http://localhost:${port}`)
})

