/**
 * @author Varun Kumar <varunon9@gmail.com>
 */

const app = require('express')();
const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '8mb'
})); // support json encoded bodies

// environment variables
const PORT = process.env.PORT || 3309;
const HOST = process.env.HOST || '127.0.0.1';

// mysql credentials
const connectInfo = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || 13306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE || 'test'
};
console.log('connectInfo > ', connectInfo);
const connection = mysql.createConnection(connectInfo);

connection.connect((err) => {
	if (err) {
		console.error('error connecting mysql: ', err);
	} else {
		console.log('mysql connection successful');
		app.listen(PORT, HOST, (err) => {
			if (err) {
				console.error('Error starting  server', err);
			} else {
				console.log('server listening at port ' + PORT);
			}
		});
	}
});

// home page
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Hello world'
	});
});

// insert a student into database
app.post('/add-student', (req, res) => {
	const student = req.body;
	const query = 'INSERT INTO students values(?, ?)';

	connection.query(query, [student.rollNo, student.name], (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: 'Error occured'
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully added student'
			});
		}
	});
});

// fetch all students
app.post('/get-students', (req, res) => {
	const query = 'SELECT * FROM students';
    connection.query(query, (err, results, fields) => {
    	if (err) {
    		console.error(err);
    		res.json({
    			success: false,
    			message: 'Error occured'
    		});
    	} else {
    		res.json({
    			success: true,
    			result: results
    		});
    	}
    });
});
