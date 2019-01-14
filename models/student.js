var mongoose = require('mongoose');
var Course = require('./course');

// Student Schema
var StudentSchema = mongoose.Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	username: {
		type: String
	},
	email: {
		type: String
	},
	courses:[{
		course_id: {type: mongoose.Schema.Types.ObjectId},
		course_title: {type:String}
	}]
});

StudentSchema.statics.findStudentByUsername = function(username, callback){
	var query = {username: username};
	Student.findOne(query, callback);
}

// Register Student for Class
StudentSchema.statics.register = function(info, callback) {
	console.log('INSIDE STUDFENT REGISTER, InFO array', info);
  student_username = info['student_username'];
  course_id = info['course_id'];
  course_title = info['course_title'];

	Course.findOneAndUpdate({_id: course_id},
		{$push: {"students": {student_username: student_username}}},
		{safe: true, upsert: true},
		function(err) {
			if (err) throw err;
			var query = {username: student_username};
	    Student.findOneAndUpdate(
	      query,
	      {$push: {"courses": {course_id: course_id, course_title: course_title}}},
	      {safe: true, upsert: true},
	      callback
	    );
		}
	);
}

StudentSchema.statics.findCourses = function(user, callback) {
	console.log(user);
	Student.findOne({username: user.username}, function(err, student) {
		if (err) throw err;
		var coursesArr = student.courses;
		console.log('inside studentSchema findCourses!!!!!!!');
		callback(null, coursesArr);
	});
}

// Se findCourses viene usato da qualche altra parte, ho bisogno di questo metodo in students router.get dashboard
StudentSchema.statics.findCoursesFull = function(user, callback) {
	Course.find({"students.student_username": user.username}, function(err, courses) {
		if (err) throw err;
		callback(null, courses);
	});
}


var Student = module.exports = mongoose.model('Student', StudentSchema);