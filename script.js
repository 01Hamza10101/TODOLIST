const input = document.getElementById('input');
const AddBtn = document.getElementById('AddBtn');
const Tasks = document.getElementById('tasks');
const TaskComplt = document.getElementById('TaskComplt');

let taskdiv;

let errorTimeout;
let editi;

let TaskCount = "0";
let TasksLocal = JSON.parse(localStorage.getItem('Task'))
let TaskArray = TasksLocal || [];
let editobj = "null";


//TaskComplt.innerHTML = TaskCount;

AddBtn.addEventListener('click', function addTask() {
  if (input.value === '') {
    error();
  }else if(editobj !== "null"){
    TaskArray[editi].text = input.value;
    editobj = "null";
    console.log(editobj);
    console.log(editi);
    input.value = '';

  TaskDsply();
  SaveTask();
  }else {
    let Taskobj = { "text":input.value,  "check":false};
    
  TaskArray.push(Taskobj);
  input.value = '';
  TaskDsply();
  SaveTask();
  }
}
);

function TaskDsply(){
    Tasks.innerHTML = '';
    TaskCount = '0';
TaskArray.forEach(function Taskdisplay(TaskArray,i){
  let div = document.createElement('div');
 taskdiv = div;
 
 let TaskValue = TaskArray.text;
    let taskCont = `
    <div class="task">
    <input type="checkbox" name="" id="checkbox" onchange="CheckBox(${i})" />
    <p class="TaskP">${TaskValue}</p>
    <div class="Taedit">
    <i class=" fi fi-rr-pen-circle" onclick="TaskEdit(${i})"></i>
    <i class=" fi fi-rr-trash"onclick="TaskDelete(${i})"></i>
    </div>
    </div>`;
  
  
    div.classList.add('task');
    div.innerHTML = taskCont;
    
   if (TaskArray.check == true){
    div.querySelector('#checkbox'). checked = true;
    }else {TaskCount++;}
    
    Tasks.appendChild(div);
    TaskComplt.textContent = TaskCount;
})};
TaskDsply();

function CheckBox(i){
  TaskArray[i].check = !TaskArray[i].check
  SaveTask();
  TaskDsply()
};


function TaskDelete(i){
  TaskArray.splice(i,1);
  console.log(TaskArray);
  
  SaveTask();
  TaskDsply();
};

function TaskEdit(i){
  input.value = TaskArray[i].text;
  editi = i;
  editobj = 1;
  
  const allTaskDivs = document.querySelectorAll('.task');
  allTaskDivs.forEach(div => {
    div.style.background = '';
  });
  
  
  const editButton = event.target;
  const taskDiv = editButton.closest('.task');
  taskDiv.style.background = 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(219,197,251,1) 25%, rgba(209,187,241,1) 51%, rgba(230,219,246,1) 78%, rgba(255,255,255,1) 100%)';

};



function error() {
  clearTimeout(errorTimeout);

  document.getElementById('error').style.display = '';
  document.getElementById('error').style.display = 'flex';
  document.getElementById('error').style.justifyContent = 'center';

  errorTimeout = setTimeout(() => {
    document.getElementById('error').style.display = 'none';
  }, 1500);
}


function SaveTask(){
  localStorage.setItem('Task',JSON.stringify(TaskArray));
}