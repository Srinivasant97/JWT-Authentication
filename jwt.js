
const express = require('express')

const app=express()

require('dotenv').config()
const jwt = require('jsonwebtoken')
app.use(express.json())

const posts=[
    {
        username : "Kyle",
        title : "type 1"
    },
    {
        username: "jim",
        title:"type 2"
    }
]

app.get('/posts',autenticateToken,(req,res)=>{
    res.json(posts.filter(pos=> pos.username===req.user.user))
})

app.post('/login',(req,res)=>{
    username=req.body.username
    const user = {user : username}
    const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10s'})
    res.json({accessToken: accessToken})
})

function autenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token ==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user=user
        next()
    })

}
app.listen(3000)

