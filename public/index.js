//  let todoList=JSON.parse(localStorage.getItem('todos'));
// if(!todoList){
// 	todoList=[];
// }
//addTodo();

// var textArea=$('.form-control');
// textArea.addEventListener('click',function(){
// 	$('.headerIcons').css("font-size",textArea.css('height'));
// });
let todoList=[];
getTodoList();

function CreateTodoObject(content){
	this.content=content;
	this.checked=false;
}

document.querySelector('textarea').addEventListener('keypress',function(){
      if(event.keyCode=='13'){
      	 newTodo();
      }
      	
});

function newTodo(){
     let textArea=document.querySelector('textarea');
     todoContent=textArea.value;    
     if(todoContent==''||todoContent==null)
           return ;
     textArea.value="";
     let todo=new CreateTodoObject(todoContent);
     todoList.push(todo);	
     addTodo();
}


function addTodo(){
    let main=document.querySelector('main');
    main.innerHTML=""; 
	let ul=document.createElement('ul');
	ul.classList.add("list-group");
    todoList.forEach(function(todo,index){
    	let li=document.createElement('li');
    	li.innerHTML=
    	"<div class='textHolder'><input type='checkbox'><p>"+todo.content+"</p></div>"+"<i class='fas fa-long-arrow-alt-up'></i><i class='fas fa-long-arrow-alt-down'></i>"
    	li.classList.add("list-group-item");
    	li.classList.add("todoContainer");
    	ul.appendChild(li); 	
	    main.appendChild(ul);
});
     var checkBoxes=document.getElementsByTagName('input');
    for(var i=0;i<checkBoxes.length;i++){
	    checkBoxes[i].addEventListener('click',checkBoxFunc.bind(this,i));
	}
    checkBoxStatus();

    let priorityUp=document.querySelectorAll('.fa-long-arrow-alt-up');
	let priorityDown=document.querySelectorAll('.fa-long-arrow-alt-down');
    
    for(var i=0;i<priorityUp.length;i++){
	    priorityUp[i].addEventListener('click',positionChanger.bind(this,i,i-1));
	}

	for(var i=0;i<priorityDown.length;i++){
	    priorityDown[i].addEventListener('click',positionChanger.bind(this,i,i+1));
	}
   
  // localStorage.setItem('todos',JSON.stringify(todoList));
	iconRemover();
  backend();
}

   
     function iconRemover(){
     	let iconUp=document.querySelector('.fa-long-arrow-alt-up');
      if(iconUp)
      iconUp.style.display="none";
      let iconDown=document.querySelectorAll('.fa-long-arrow-alt-down')[todoList.length-1];
      if(iconDown)
        iconDown.style.opacity="0"
     }

	function positionChanger(index1,index2){
		if(index1==0&&index2==-1||index1==todoList.length-1&&index2==todoList.length)
			return;
		let temp=todoList[index1];
		todoList[index1]=todoList[index2];
		todoList[index2]=temp;
		addTodo();
		return;
	}

  function checkBoxStatus(){
        todoList.forEach(function(todo,index){
        	let currentInput=document.getElementsByTagName('input')[index];
        	let currentTodo=document.querySelectorAll('p')[index];      
              if(JSON.parse(todo.checked)){
                   currentTodo.classList.add("done");    
                   currentInput.checked=true; 
              }
              else{
                   currentTodo.classList.remove("done");    
                   currentInput.checked=false; 
              }
        });
        // localStorage.setItem('todos',JSON.stringify(todoList));
        backend();
        return;
  }

function checkBoxFunc(i){
	todoList[i].checked=!JSON.parse(todoList[i].checked);
	checkBoxStatus();
    return;
}


let trash=document.querySelector('.fa-trash-alt');
trash.addEventListener('click',function(){
	for(let i=0;i<todoList.length;){
		if(JSON.parse(todoList[i].checked))
			todoList.splice(i,1);
		else
			i++;
	}
	 addTodo();
});


let sort=document.querySelector('.fa-sort-numeric-down');
sort.addEventListener('click',function(){
	let count=0;
	for(let i=0;i+count<todoList.length;){
		if(JSON.parse(todoList[i].checked)){
			var item=todoList.splice(i,1);
			todoList.push(item[0]);
			count++;
		}
		else
			i++;
	}
	 addTodo();
});
























