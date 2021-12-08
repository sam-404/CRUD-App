
var express = require('express');
var app = express();
var mysql = require('mysql');
var db = require('./db_con');
var cors = require('cors');
var bodyParser = require('body-parser');

// parse requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

//simple route or default route
app.get("/", (req, res) => {
    res.json({ message:"Hello World!"});
});

app.listen('3000', () => {
    console.log("Server started on port 3000");
});

module.exports = app;

//getting all student data
app.get('/students', (req, res)=>{
    let sql = 'select * from student';
    db.query(sql, (err, result) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

//getting data for a singular ID
app.get('/students/:id', (req, res) =>{
    let mID = req.params.id;
    let sql = 'select * from student where std_id = ?';
    db.query(sql, [mID], (err, result) => {
        if(err){
            (console.log(err));
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'data not found'
            });
        }
    });
});

//create student data
app.post('/students', (req, res)=>{
    console.log(req.body, 'createdata');

    let std_id = req.body.std_id;
    let std_name = req.body.std_name;
    let std_father_name = req.body.std_father_name;
    let std_prog = req.body.std_program;
    let email = req.body.email;
    let cnic = req.body.cnic;
    let phone_no = req.body.phone_no;
    let age = req.body.age;
    let dob = req.body.dob;
    let room_no = req.body.room_no;
    let bld_name = req.body.building_name;


    let sql = 'insert into student(std_id, std_name, std_father_name, std_program, email, cnic, phone_no, age, dob, room_no, building_name) values(?,?,?,?,?,?,?,?,?,?,?)'; 

    db.query(sql, [std_id, std_name, std_father_name, std_prog, email, cnic, phone_no, age, dob, room_no, bld_name], (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result')
       res.send({
           message:'data inserted',
       });
    });
});

// update student data
app.put('/students/:std_id', (req, res)=>{
    console.log(req.body, 'updatedata');
    
    let std_id = req.params.std_id;
    let std_name = req.body.std_name;
    let std_father_name = req.body.std_father_name;
    let std_prog = req.body.std_program;
    let email = req.body.email;
    let cnic = req.body.cnic;
    let phone_no = req.body.phone_no;
    let age = req.body.age;
    let dob = req.body.dob;
    let room_no = req.body.room_no;
    let bld_name = req.body.building_name;

    let sql = 'update student set std_name = ?, std_father_name = ?, std_program = ?, email = ?, cnic = ?, phone_no = ?, age = ?, dob = ?, room_no = ?, building_name = ? where std_id = ?';

    db.query(sql, [std_name, std_father_name, std_prog, email, cnic, phone_no, age, dob, room_no, bld_name, std_id], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data updated',
       });
    });

});

//delete student data
app.delete('/students/:std_id', (req, res)=>{
    console.log(req.body, 'deletedata');

    let std_id = req.params.std_id;

    let sql = 'delete from student where std_id = ?';
    db.query(sql, [std_id], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data deleted'
       });

    });

});

//getting all rooms data
app.get('/rooms', (req, res)=>{
    let sql = 'select * from room';
    db.query(sql, (err, result) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

//getting data for a singular ID
app.get('/rooms/:room_no', (req, res) =>{
    let mID = req.params.room_no;
    let sql = 'select * from room where room_no = ?';
    db.query(sql, [mID], (err, result) => {
        if(err){
            (console.log(err));
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'data not found'
            });
        }
    });
});

//create room data
app.post('/rooms', (req, res)=>{
    console.log(req.body, 'createdata');

    let room_no = req.body.room_no;
    let room_type = req.body.room_type;
    let fur_id = req.body.furniture_id
    
    let sql = 'insert into room(room_no, room_type, furniture_id) values(?,?,?)'; 

    db.query(sql, [room_no, room_type, fur_id], (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result')
       res.send({
           message:'data inserted',
       });
    });
});

// update room data
app.put('/rooms/:room_no', (req, res)=>{
    console.log(req.body, 'updatedata');
    
    let room_no = req.params.room_no;
    let room_type = req.body.room_type;
    let fur_id = req.body.furniture_id

    let sql = 'update room set room_type= ?, furniture_id = ? where room_no = ?';

    db.query(sql, [room_type, fur_id, room_no], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data updated',
       });
    });

});

//delete room data
app.delete('/rooms/:room_no', (req, res)=>{
    console.log(req.body, 'deletedata');

    let id = req.params.room_no;

    let sql = 'delete from room where room_no = ?';
    db.query(sql, [id], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data deleted'
       });

    });

});

//getting all employees data
app.get('/employees', (req, res)=>{
    let sql = 'select * from mess_employees';
    db.query(sql, (err, result) =>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

//getting data for a singular ID
app.get('/employees/:emp_id', (req, res) =>{
    let mID = req.params.emp_id;
    let sql = 'select * from mess_employees where emp_id = ?';
    db.query(sql, [mID], (err, result) => {
        if(err){
            (console.log(err));
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'data not found'
            });
        }
    });
});


//create employee data
app.post('/employees', (req, res)=>{
    console.log(req.body, 'createdata');

    let emp_id = req.body.emp_id;
    let emp_name = req.body.emp_name;
    let emp_phno = req.body.emp_phone_no;
    let emp_cnic = req.body.emp_cnic;
    let emp_salary = req.body.emp_salary;
    let bld_name = req.body.building_name;
    
    
    let sql = 'insert into mess_employees(emp_id, emp_name, emp_phone_no, emp_cnic, emp_salary, building_name) values(?,?,?,?,?,?)'; 

    db.query(sql, [emp_id, emp_name, emp_phno, emp_cnic, emp_salary, bld_name], (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result')
       res.send({
           message:'data inserted',
       });
    });
});

// update room data
app.put('/employees/:emp_id', (req, res)=>{
    console.log(req.body, 'updatedata');
    
    let emp_id = req.params.emp_id;
    let emp_name = req.body.emp_name;
    let emp_phno = req.body.emp_phone_no;
    let emp_cnic = req.body.emp_cnic;
    let emp_salary = req.body.emp_salary;
    let bld_name = req.body.building_name;

    let sql = 'update mess_employees set emp_name = ?, emp_phone_no = ?, emp_cnic = ?, emp_salary = ?, building_name = ? where emp_id = ?';

    db.query(sql, [emp_name, emp_phno, emp_cnic, emp_salary, bld_name, emp_id], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data updated',
       });
    });

});

//delete employees data
app.delete('/employees/:emp_id', (req, res)=>{
    console.log(req.body, 'deletedata');

    let id = req.params.emp_id;

    let sql = 'delete from mess_employees where emp_id = ?';
    db.query(sql, [id], (err, result)=>{
        if(err){console.log(err);}
        res.send({
           message:'data deleted'
       });

    });

});
