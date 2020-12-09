document.getElementById("formTask").addEventListener('submit', saveTask);
// creamos la funcion para guardar los datos del dom
function saveTask(e) { 
    var titulo = document.getElementById("title").value;
    var descripcion = document.getElementById("description").value;
    const tarea = {
        titulo,
        descripcion
    };
    if (localStorage.getItem('tareas') === null) {
        var tareas = [];
        tareas.push(tarea);
        // Utilizamos el LocalStorage
        localStorage.setItem('tareas', JSON.stringify(tareas));
    } else { 
        var todas = []; 
        todas = JSON.parse(localStorage.getItem('tareas'));
        todas.push(tarea);
        localStorage.setItem('tareas',JSON.stringify(todas))
    };
    // Ejecutamos la funcion de guardar para que se agregue automaticamente al DOM
        getTask();
    // Limpiamos el formulario para volver a ingresar uno nuevo
        document.getElementById('formTask').reset();
    // Evitamos que la pagina se recargue
        e.preventDefault();
}

function getTask() { 
    let obtenerTareas = [];
    obtenerTareas = JSON.parse(localStorage.getItem('tareas'));
    let vistaTareas = document.getElementById('tasks');
    // Vaciamos lo que contenga en el HTML
    vistaTareas.innerHTML = "";
    // Listamos en el DOM lo dle localStorage
    for (let i = 0; i < obtenerTareas.length; i++) {
        let titulos = obtenerTareas[i].titulo;
        let descripciones = obtenerTareas[i].descripcion;
        vistaTareas.innerHTML += `<div class="card">
        <div class="card-body">
        <p>${titulos} - ${descripciones}</p>
        <a class="btn btn-danger" onclick="deleteTask('${titulos}')">Delete</a>
        </div>
        </div>`
    }
}

function deleteTask(title) { 
    var tarea = []; tarea= JSON.parse(localStorage.getItem('tareas'));
    console.log(tarea);
    for (let index = 0; index < tarea.length; index++) {
        if (tarea[index].titulo===title) {
            tarea.splice(index, 1);
            console.log(tarea);
        }
    }
    localStorage.setItem('tareas', JSON.stringify(tarea));
    getTask();
}