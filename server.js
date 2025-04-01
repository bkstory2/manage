const express = require('express');
const bodyParser = require('body-parser') ; 
const app = express();
const port = process.env.PORT || 5000 ; 

app.use(bodyParser.json() ) ; 
app.use(bodyParser.urlencoded({extends:true})) ; 

app.get('/api/list' , (req, res) => {
     res.send(
          [
               {
                 id: '11',
                 image: '/upload/11.jpg',
                 name: 'cc2',
                 birthday: '730202',
                 gender: 'M',
                 job: 'dev',
               },
               {
                 id: '22',
                 image: '/upload/22.jpg',
                 name: 'cc222',
                 birthday: '730202',
                 gender: 'M',
                 job: 'dev',
               },
               {
                 id: '33',
                 image: '/upload/33.jpg',
                 name: 'cc3332',
                 birthday: '730303',
                 gender: 'M',
                 job: 'dev',
               },
          ]
     )
})

app.listen(port , ()=>console.log(` running ....  ${port} `)) ; 