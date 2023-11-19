//CREAMOS LA CLASE CLIENTE PARA ESTRUCTURAR LOS DATOS RECIBIDOS EN UN JSON

class Client {
    constructor(id, firstname, lastname, phone, email, male) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.male = male;
    }
}

//DATOS DE LOS CLIENTES

let clients = [
    {
        "id": 0,
        "firstname": "Leire",
        "lastname": "Eastgate",
        "phone": 676497178,
        "email": "Leireeastgate@gmail.com",
        "male": false
    },
    {
        "id": 1,
        "firstname": "Mike",
        "lastname": "Eastgate",
        "phone": 656837148,
        "email": "Mikeeastgate@gmail.com",
        "male": true
    },
    {
        "id": 2,
        "firstname": "Roberto",
        "lastname": "Orts",
        "phone": 696837890,
        "email": "RobertoOrts@gmail.com",
        "male": true
    },
    {
        "id": 3,
        "firstname": "Nanci",
        "lastname": "Rocamora",
        "phone": 612847897,
        "email": "Nancirocamora@gmail.com",
        "male": false
    },
    {
        "id": 4,
        "firstname": "Pedro",
        "lastname": "Gil",
        "phone": 672890692,
        "email": "Pedrogil@gmail.com",
        "male": true
    }
];

//CREAMOS UN ARRAY DONDE VOLCAREMOS LOS OBJETOS CREADOS

let printable = [];

// MÉTODO PARA CREAR UN CLIENTE Y VOLCARLO DENTRO DEL ARRAY
let createClient = (c) => {
    printable.push(new Client(c.id, c.firstname, c.lastname, c.phone, c.email, c.male))
}

//FUNCIÓN PARA CREAR TODOS LOS CLIENTES Y VOLCARLOS EN PRINTABLE
function addPrintable(){
    for (let i = 0; i < clients.length; i++) {
        createClient(clients[i])
    }
}
addPrintable();

//MÉTODO PARA CREAR LAS FILAS DE CLIENTES CON SUS DATOS
let loadClient = (c) => {
    //ASIGNAMOS CLASES E ID'S PARA EMPLEARLAS MÁS TARDE PARA ELIMINAR ELEMENTOS DEL DOM
    let tableRow = document.createElement("tr");
    tableRow.id = 'client-' + c.id;
    tableRow.classList.add("client");

    let xCell = document.createElement("td");
    xCell.textContent = 'x';
    xCell.classList.add('delete');
    xCell.id = 'delete-' + c.id;

    let modifyCell = document.createElement("td");
    modifyCell.textContent = 'Editar';
    modifyCell.classList.add('modify');
    modifyCell.id = 'modify-' + c.id;

    let firstNameCell = document.createElement("td");
    firstNameCell.textContent = c.firstname;

    let lastNameCell = document.createElement("td");
    lastNameCell.textContent = c.lastname;

    let phoneCell = document.createElement("td");
    phoneCell.textContent = c.phone;

    let emailCell = document.createElement("td");
    emailCell.textContent = c.email;

    let genderCell = document.createElement("td");
    genderCell.textContent = c.male ? 'Hombre' : 'Mujer';

    tableRow.appendChild(xCell);
    tableRow.appendChild(modifyCell);
    tableRow.appendChild(firstNameCell);
    tableRow.appendChild(lastNameCell);
    tableRow.appendChild(phoneCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(genderCell);

    return tableRow;
}

let clientsTable = document.getElementById("clientsTable");
//MÉTODO PARA IMPRIMIR LOS CLIENTES EN EL DOM
function printClients(){
    for (let i = 0; i < printable.length; i++) {
        clientsTable.querySelector('tbody').appendChild(loadClient(printable[i]));
    }
}

printClients();

//EVENTO PARA BORRAR DATOS 
document.addEventListener('click', (event) => {
    const target = event.target;

    // Verificamos si el clic fue en un elemento con la clase "delete"
    if (target.classList.contains('delete')) {
        // Extraemos la ID del cliente desde el ID del botón delete
        let clientId = target.id.replace('delete-', '');

        // Buscamos el elemento cliente en el DOM y lo eliminamos
        let client = document.getElementById("client-" + clientId);
        if (client) {
            client.remove();

            // Buscamos el índice del cliente en el array PRINTABLE
            let index = printable.findIndex(c => c.id == clientId);

            // Eliminamos el cliente del array PRINTABLE
            if (index !== -1) {
                printable.splice(index, 1);
            }
        }
    }
});

//EVENTO PARA DESPLEGAR EL MODAL
document.addEventListener('click', (event) => {
    const target = event.target;

    // Verificamos si el clic fue en un elemento con la clase "modify"
    if (target.classList.contains('modify')) {
        // Extraemos la ID del cliente desde el ID del botón modify
        let clientId = target.id.replace('modify-', '');
        let client;

        //Encontramos la id del cliente buscando en el json su telefono y comparandolo con el de printable
        for (let i = 0; i < printable.length; i++) {
            if (clients[clientId].phone == printable[i].phone) {
                client = printable[i];
            }
        }

        let gender = "";

        if (client.male == true) {
            gender = "hombre";
        } else {
            gender = "Mujer";
        }

        let modal = `
            <div id="modal${client.id}" class="modal">
                <form>
                    <label for="name">Nombre:</label>
                    <input id="name" value="${client.firstname}" type="text">
            
                    <label for="lastname">Apellido:</label>
                    <input id="lastname" value="${client.lastname}" type="text">
            
                    <label for="phone">Teléfono:</label>
                    <input id="phone" value="${client.phone}" type="text">
            
                    <label for="email">Correo electrónico:</label>
                    <input id="email" value="${client.email}" type="email">
            
                    <label for="gender">Género:</label>
                    <input id="gender" value="${gender}" type="text">

                    <div id="save" class="${client.id}">Guardar</div>
                    <div id="cancel">Cancelar</div>

                </form>
            </div>
        `;

        //incorporamos el form al DOM
        const container = document.getElementById("container-modal");
        container.innerHTML = modal;
    }
});

//EVENTO PARA ELIMINAR EL MODAL UNA VEZ PULSADO EL BOTON CANCEL
const container = document.getElementById("container-modal");

container.addEventListener("click", (event) => {
    const target = event.target;

    // Verifica si el clic fue en el botón de cancelar ("cancel")
    if (target.id === "cancel") {
        const modaldelete = document.querySelector(".modal");
        
        // Verifica si se encontró el elemento modal
        if (modaldelete) {
            modaldelete.remove();
        }
    }
});

//EVENTO PARA MODIFICAR LOS DATOS UNA VEZ PULSADO EL BTN GUARDAR
container.addEventListener("click", (event) => {
    const target = event.target;

    // Verifica si el clic fue en el botón de guardar ("save")
    if (target.id === "save") {
        // Accede al elemento con el ID "save" y obtén su clase
        const saveButton = document.getElementById("save");
        const clientId = saveButton.className;

        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const genderUnvalid = document.getElementById("gender").value; 
        let gender = "";

        if (genderUnvalid.toLowerCase() === "hombre") {
            gender = true;
        }
        if (genderUnvalid.toLowerCase() === "mujer") {
            gender = false;
        }    
        
        clients[clientId].firstname = name;
        clients[clientId].lastname = lastname;
        clients[clientId].phone = phone;
        clients[clientId].email = email;
        clients[clientId].male = gender;

        const elementosAEliminar = document.getElementsByClassName("client");

        Array.from(elementosAEliminar).forEach(elemento => {
            elemento.remove();
        });

        printable = [];
        addPrintable();
        printClients();

        const modals = document.getElementsByClassName("modal");
        Array.from(modals).forEach(modal => {
            modal.remove();
        });
    }
});

//EVENTO PARA MANEJAR EL FILTRO DE LA APP

let filter = document.getElementById("filter");

filter.addEventListener("input", () => {
    let search = filter.value.toLowerCase();

    if (search.length >= 3) {

        let visible = [];

        // ITERAMOS SOBRE EL ARRAY PRINTABLE Y SI SE ENCUENTRAN COINCIDENCIAS SE CAMBIA LA VISIBILIDAD A TRUE Y SINO QUEDA EN FALSE
        for (let i = 0; i < printable.length; i++) {
            visible[i] = printable[i].firstname.toLowerCase().includes(search) || printable[i].lastname.toLowerCase().includes(search);
        }

        let clients = document.querySelectorAll(".client");
        
        //ESTABLECE LA PROPIEDAD DISPLAY NONE O DEFAULT SEGUN LA VISIBILIDAD QUE LE PASAMOS POR EL ARRAY DE BOOLEANOS VISIBLE
        clients.forEach((client, i) => {
            client.style.display = visible[i] ? "" : "none";
        });
        
    }else{
        //CUANDO EL FILTRO SE DESACTIVA PONEMOS TODOS LOS CLIENTES VISIBLES PARA NO DEJAR LA TABLA EN BLANCO
        document.querySelectorAll(".client").forEach(client => client.style.display = "");
    } 
});


