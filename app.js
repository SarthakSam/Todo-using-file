const express = require('express');
const app = express();

const csv=require('csvtojson');



app.get('/',function(req,res){
	 // console.log(req.query)
     res.send("hello")
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/home',express.static(__dirname + '/public'))

app.get('/todo',function(req,res){
     console.log("in get ")
     csv()
  .fromFile('./todo.csv')
  .then((jsonObj)=>{
      res.send(jsonObj);
     // console.log("inget1",jsonObj);
  })
})

app.post('/todo',function(req,res){
	var csvWriter = require('csv-write-stream');
    var fs =require('fs')
	var writer = csvWriter({ headers: ["content" , "checked"]})
	writer.pipe(fs.createWriteStream('todo.csv'));

	let array=req.body.todoList
	console.log("in post",array);
	if(array){
	for (key of array) {
       let content= key["content"];
       let checked= key["checked"];
       console.log("postcontent",content);
       console.log("postchecked",checked);
       writer.write({ content , checked });
        // console.log(todos,check);
    }
    writer.end();
}
    res.send("");
})


app.listen('3000',() => console.log("server listening to port 3000"))


