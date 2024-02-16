var btnAdd = document.getElementById("btntodo");
var txtTodo = document.getElementById("txttodo");

var data = [];

data = JSON.parse( localStorage.getItem("myTodo"));


function addTodo() {
    
    todoObj = {
        "id": data.length +1,
        "description": txtTodo.value.toString(),
        "todoStatus": "pending"
    }
    data.push(todoObj);
    localStorage.setItem("myTodo", JSON.stringify(data));
    if (data.length > 0)
        addList();

        txtTodo.value = "";

}

function addList() {
    var tbody = document.getElementById("tableBody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }


    data.forEach(element => {
        var newRow = document.createElement("tr");
        var id = document.createElement("td");
        var descr = document.createElement("td");
        var status = document.createElement("td");
        var close = document.createElement("td");
        var btnstatus = document.createElement("input");
        var btnclose = document.createElement("input");

        id.textContent = element.id;
        descr.textContent = element.description;
        
        btnstatus.setAttribute("type","button");
        btnstatus.setAttribute("value",element.todoStatus);
        btnstatus.setAttribute("id","btnstatus");
        btnstatus.setAttribute("class","btnstatus");
        btnstatus.setAttribute("onclick","markStatus(this)");

        btnclose.setAttribute("type","button");
        btnclose.setAttribute("value","Delete");
        btnclose.setAttribute("id","btnclose");
        btnclose.setAttribute("class","btnclose");
        btnclose.setAttribute("onclick","deleteTodo(this)");


        status.appendChild (btnstatus);
        close.appendChild (btnclose);

        newRow.appendChild(id);
        newRow.appendChild(descr);
        newRow.appendChild(status);
        newRow.appendChild(close);
    
        newRow.setAttribute("id",element.id);
        tbody.appendChild(newRow);
     });

}

function deleteTodo(ele){
    var tbody = document.getElementById("tableBody");
    var element = ele.parentElement;

    var trIndex = data.findIndex(elm => elm.id ==element.parentElement.id );

    data.splice(trIndex,1);
    tbody.removeChild(element.parentElement);

    localStorage.removeItem("myTodo");
    localStorage.setItem("myTodo", JSON.stringify(data));
}

function markStatus(ele){
    var tbody = document.getElementById("tableBody");
    var element = ele.parentElement;

    var trIndex = data.findIndex(elm => elm.id ==element.parentElement.id );
    data[trIndex].todoStatus = "Completed";
    console.log(data);
    localStorage.removeItem("myTodo");
    localStorage.setItem("myTodo", JSON.stringify(data));
    addList();
}

addList();