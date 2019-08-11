var obj = require("./db.js"); // accessing the object having functions
var user={"id":1, "name":'abc',"age":23 }; // JSON formate representation of data
obj.add(user); // calling the function
//obj.update(user);
//updateEmp(user);
//deleteEmp(1);