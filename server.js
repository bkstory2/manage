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
    
    let method = req.body.method; // method를 최상단에서 선언
    console.log("Received method:", method);

    if (method === "delete") {
        let id = req.body.id;
        let params = [id];

        let sql = 'UPDATE customer SET use_yn=0 WHERE id = ?';
        
        console.log("실행되는 delete SQL (바인딩 전) =>", sql);
        console.log("SQL 파라미터 =>", params);

        connection.query(sql, params, (err, rows, fields) => {
            if (err) {
                console.error("❌ Database delete error:", err);
                return res.status(500).send("Database delete error");
            }

            console.log("✅ SQL 실행 완료");
            res.send(rows);
        });

        return; // 여기서 끝내야 add 로직이 실행되지 않음
    }

    if (method === "add") {
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        // 현재 시간 생성 (yyyymmddhhmmss)
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

        // 원본 파일명과 새 파일명 생성
        const originalName = path.basename(req.file.originalname);
        const newFilename = `${timestamp}_${originalName}`;
        const newPath = path.join('./upload', newFilename);
        const imageUrl = `/image/${newFilename}`;

        fs.rename(req.file.path, newPath, (err) => {
            if (err) {
                console.error("File rename error:", err);
                return res.status(500).send({ error: "File rename error" });
            }

            let name = req.body.name;
            let birthday = req.body.birthday;
            let gender = req.body.gender;
            let job = req.body.job;

            let params = [imageUrl, name, birthday, gender, job];

            console.log("=================== image  => ", imageUrl);
            console.log("=================== name  => ", name);
            console.log("=================== birthday  => ", birthday);
            console.log("=================== gender  => ", gender);
            console.log("=================== job  => ", job);

            let sql = 'INSERT INTO customer (image, name, birthday, gender, job) VALUES (?, ?, ?, ?, ?)';
            
            console.log("실행되는 SQL (바인딩 전) =>", sql);
            console.log("SQL 파라미터 =>", params);

            connection.query(sql, params, (err, rows, fields) => {
                if (err) {
                    console.error("❌ Database insert error:", err);
                    return res.status(500).send("Database insert error");
                }

                console.log("✅ SQL 실행 완료");
                res.send(rows);
            });
        });
    }
});



app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
