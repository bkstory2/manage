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
const upload = multer({dest : './upload'}) ;   //기본 폴더 

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

const path = require('path');

app.post('/api/customer', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    // 현재 시간 생성 (yyyymmddhhmmss)
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

    // 원본 파일명 (확장자 포함)
    const originalName = path.basename(req.file.originalname);

    // 새로운 파일명 생성
    const newFilename = `${timestamp}_${originalName}`;

    // 저장 경로 수정
    const newPath = path.join('./upload', newFilename);
    const imageUrl = `/image/${newFilename}`;

    // 파일명 변경
    fs.rename(req.file.path, newPath, (err) => {
        if (err) {
            console.error("File rename error:", err);
            return res.status(500).send({ error: "File rename error" });
        }

        let method = req.body.method;
        let name = req.body.name;
        let birthday = req.body.birthday;
        let gender = req.body.gender;
        let job = req.body.job;

        let params = [imageUrl, name, birthday, gender, job];

        console.log("===================method  => ", method);
        console.log("===================image  => ", imageUrl);
        console.log("===================name  => ", name);
        console.log("===================birthday  => ", birthday);
        console.log("===================gender  => ", gender);
        console.log("===================job  => ", job);

        if (method === "add") {
            let sql = 'INSERT INTO customer (image, name, birthday, gender, job) VALUES (?, ?, ?, ?, ?)';
            connection.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.error("Database insert error:", err);
                    return res.status(500).send("Database insert error");
                }
                res.send(rows);
            });
        } else {
            res.status(400).send({ error: "Invalid method" });
        }
    });
});

app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
