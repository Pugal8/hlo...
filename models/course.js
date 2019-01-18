var mongoose = require('mongoose');

// Course Schema
var CourseSchema = mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	instructor:{
		type: String
	},
	students: [{
		student_username: {type: String}
	}],
	lessons:[{
		lesson_number: {type: Number},
		lesson_title: {type: String},
		lesson_body: {type: String}
	}]
});

// Fetch All Courses
// CourseSchema.statics.findCourses = function(callback){
// 	Course.find()
//   .sort({ createdAt: "descending" })
//   .exec(callback);
// }
CourseSchema.statics.findCourses = () => {
	return Course.find().sort({ createdAt: 'descending' });
};


// Fetch Single Course
// CourseSchema.statics.findCourseById = function(id, callback){
// 	Course.findById(id, callback);
// }
CourseSchema.statics.findCourseById = (id) => {
	return Course.findById(id);
};

// Add Lesson
// CourseSchema.statics.addLesson = function(info, callback){
// 	courseId = info['courseId'];
// 	lesson_number = info['lesson_number'];
// 	lesson_title = info['lesson_title'];
// 	lesson_body = info['lesson_body'];
// 	console.log('********', courseId);
// 	Course.findByIdAndUpdate(
// 		courseId,
// 		{$push:{"lessons": {lesson_number: lesson_number, lesson_title: lesson_title, lesson_body:lesson_body}}},
// 		{safe: true, upsert: true}, // options
// 		callback
// 	);
// }
CourseSchema.statics.addLesson = (info) => {
	courseId = info['courseId'];
	lesson_number = info['lesson_number'];
	lesson_title = info['lesson_title'];
	lesson_body = info['lesson_body'];

	return Course.findByIdAndUpdate(courseId, {
		$push: {'lessons': {lesson_number: lesson_number, lesson_title: lesson_title, lesson_body:lesson_body}}
	}, { safe: true, upsert: true });
};

// Modify Course
// CourseSchema.statics.modifyCourse = function(info, callback){
// 	courseId = info['courseId'];
// 	title = info['newTitle'];
// 	description = info['newDescription'];
// 	console.log('********', info);
// 	Course.findByIdAndUpdate(
// 		courseId,
// 		{$set: {description: description, title: title} },
// 		{safe: true, upsert: true}, // options
// 		callback
// 	);
// }
CourseSchema.statics.modifyCourse = (info) => {
	courseId = info['courseId'];
	title = info['newTitle'];
	description = info['newDescription'];

	return Course.findByIdAndUpdate(courseId, {
		$set: {description: description, title: title}
	}, {safe: true, upsert: true});
};


var Course = module.exports = mongoose.model('Course', CourseSchema);
