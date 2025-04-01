const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// ✅ 데이터베이스 설정 파일 읽기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

// ✅ MySQL 연결
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database
});
connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // ✅ 오타 수정

const multer = require('multer') ; 
const upload = multer({dest : './upload'}) ; 

// ✅ API 수정: query 콜백 함수 위치 수정
app.get('/api/list', (req, res) => {
    connection.query("select * from customer where use_yn=1 order by id desc  ", (err, rows, fields) => {
        if (err) {
            console.error("Database query error:", err);
            res.status(500).send("Database query error");
            return;
        }
        res.send(rows);
    });
});

// ✅ 서버 실행

app.use('/image' , express.static('./upload')) ; //폴더 공유  

app.post('api/customer' , upload.single('image'),(req,res)=> {

    let sql = '' ; 
    

    let image = '/image' + req.file.filename ;

    let method   =  req.body.method ;
    let name     =  req.body.name ;
    let birthday =  req.body.birthday ;
    let genter   =  req.body.genter ;
    let job      =  req.body.job ;

    let params = [ image, name , birthday, genter, job ] ; 
    
    if ( method == "add" )
    {
        sql =' insert into customer ( image, name , birthday, genter, job  ) values ( ? ,? ,? ,? ,? ) ;  ' ; 
        connection.query( sql , params , ( err, rows , fields) => {
            res.send(rows);
        } )
    }
} )

app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
