function initTodoList(data){
     console.log("initTodoList")
     todoList=data;
    // console.log("data",data);
    console.log("todoList",todoList);
    addTodo();
}

function backend(){
	 console.log("post");
	$.post('/todo',{ todoList })
}

function getTodoList(){
	console.log("get")
	$.get('/todo',initTodoList)
}