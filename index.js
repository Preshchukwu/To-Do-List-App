let todoOverlay = document.getElementById("todo-overlay")
let closeIcon = document.getElementById("closeModalIcon")
let createButton = document.getElementById("createButton")
let secondButton = document.getElementById("secondButton")
let todoContent = document.getElementById("todoContent")
let todoForm = document.getElementById("todoForm")
let taskSection = document.getElementById("taskSection")
let timeOftodo = document.getElementById("timeOftodo")
let submitButton = document.getElementById("submitButton")
let pTag = document.getElementById("pTag")
let pTagg = document.getElementById("pTagg")

function revealModalOverlay(){
    todoOverlay.classList.remove("todo-overlay")
    todoOverlay.classList.add("todo-overlay-visible")
    todoContent.focus()
}

createButton.addEventListener("click", revealModalOverlay)
secondButton.addEventListener("click", revealModalOverlay)

function closeModalOverlay (){
    if(todoOverlay.classList.contains("todo-overlay-visible")){
        todoOverlay.classList.remove("todo-overlay-visible")
        todoOverlay.classList.add("todo-overlay")
    }
}

closeIcon.addEventListener("click", closeModalOverlay)


let myTodo = []

function printTodosOnUI (){
    taskSection.textContent = ""

    myTodo.forEach(function(allTasksInArray){
        let printTodoTask = allTasksInArray.theTodos
        let printTodoTime = allTasksInArray.theTime

        let todoDiv = document.createElement("div")
        todoDiv.classList.add("todoList")

        let workoutTextDiv = document.createElement("div")
        workoutTextDiv.classList.add("workout-text")

        let workoutText = document.createElement("p")
        workoutText.textContent = printTodoTask

        let timeAndInputDiv = document.createElement("div")
        timeAndInputDiv.classList.add("time-and-input-container")

        let timeDiv = document.createElement("div")
        timeDiv.classList.add("time-container")

        let timeText = document.createElement("p")
        timeText.textContent = printTodoTime

        let iconDiv = document.createElement("div")
        iconDiv.classList.add("icon-container")

        let editIcon = document.createElement("i")
        editIcon.classList.add("fa-solid", "fa-pen-to-square")
        // editIcon.setAttribute(`onclick`, `editTask('${printTodoTask}', ${printTodoTime})`)
        editIcon.addEventListener("click", function(){
            editTask(printTodoTask, printTodoTime)
        })

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute(`onclick`, `deleteTask('${printTodoTask}')`)

        iconDiv.append(editIcon, deleteIcon)
        timeDiv.append(timeText)
        timeAndInputDiv.append(timeDiv, iconDiv)
        workoutTextDiv.append(workoutText)
        todoDiv.append(workoutTextDiv, timeAndInputDiv)
        taskSection.append(todoDiv)

    })
}

function editTask(printTodoTask, printTodoTime){
    revealModalOverlay()

    

    todoContent.value = printTodoTask
    timeOftodo.value = printTodoTime

    todoForm.removeEventListener("submit", createTodo)
    todoForm.addEventListener("submit", function(event){
        event.preventDefault()
        let updatedTodoContent = todoContent.value
        let updatedTimeoftode = timeOftodo.value

        myTodo.forEach(function(todo){
            if(todo.theTime === printTodoTime){
                todo.theTodos = updatedTodoContent
                todo.theTime = updatedTimeoftode
            }
        })

        localStorage.setItem("myTodo", JSON.stringify(myTodo))
        fetchTask()
        todoForm.reset()
        closeModalOverlay()

        pTag.focus()

    })

    // myTodo.forEach(function(todo){
    //     if(todo.theTime === printTodoTime){
    //         todo.theTodos = updatedTodoContent
    //         todo.theTime = updatedTimeoftode
    //     }
    // })

    // localStorage.setItem("myTodo", JSON.stringify(myTodo))
    // fetchTask()
    // todoForm.reset()
    // closeModalOverlay()

    // pTag.focus()


}

function deleteTask(printTodoTask){
    myTodo.forEach(function(todoo, index){
        if(todoo.theTodos === printTodoTask){
            myTodo.splice(index, 1)
        }
    })

    localStorage.setItem("myTodo", JSON.stringify(myTodo))
    fetchTask()
}


function fetchTask (){
    if(localStorage.getItem("myTodo")){
        myTodo = JSON.parse(localStorage.getItem("myTodo"))
    }
    printTodosOnUI()
}
fetchTask()

todoForm.addEventListener("submit", createTodo)
function createTodo(event){
    event.preventDefault()

    let todos = todoContent.value
    let time = timeOftodo.value

    if(todoContent.value === ""){
        todoContent.style.border = "1px solid red"
    }

    if(timeOftodo.value === ""){
        timeOftodo.style.border = "1px solid red"
    }

    const mytodosList = {
        theTodos : todos,
        theTime : time
    }

    myTodo.push(mytodosList)
    localStorage.setItem("myTodo", JSON.stringify(myTodo))
    fetchTask()
    todoForm.reset()
    closeModalOverlay()
}