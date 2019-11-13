//Arrays to save the information to show in the filters
let ciudades = [];
let tipos = [];

//General selectors
let ciudadDropdown = document.getElementById('selectCiudad');
let tipoDropdown = document.getElementById('selectTipo');
let informacionBienes = document.getElementById('informacionBienes')
let informacionBienesGuardados = document.getElementById('informacionBienesGuardados')

//Fetch to the json given
fetch("../data-1.json")
    .then(res => res.json())
    .then(data => {

        data.forEach(bien => {

            //Creates the img and set the attributes
            let homeImg = document.createElement('img');
            homeImg.setAttribute('class', 'homeImg');
            homeImg.setAttribute('src', '../img/home.jpg');
            homeImg.setAttribute('alt', 'Home image');
            homeImg.setAttribute('height', '140');
            homeImg.setAttribute('width', '200');

            //Get the information of the property
            let id = bien.Id;
            let direccion = bien.Direccion;
            let telefono = bien.Telefono;
            let ciudad = bien.Ciudad;
            let codigoPostal = bien.Codigo_Postal;
            let tipo = bien.Tipo;
            let precio = bien.Precio;

            //Creates the general div of the information of the property.
            let informacionBien = document.createElement('div');
            informacionBien.setAttribute('class', 'informacionBien')
            informacionBien.appendChild(homeImg);

            //Creates all the p's to show the information of the property.
            let direccionBien = document.createElement('p');
            direccionBien.innerHTML = "Dirección: " + direccion;
            informacionBien.appendChild(direccionBien);

            let ciudadBien = document.createElement('p');
            ciudadBien.innerHTML = "Ciudad: " + ciudad;
            informacionBien.appendChild(ciudadBien);

            let telefonoBien = document.createElement('p');
            telefonoBien.innerHTML = "Telefono: " + telefono;
            informacionBien.appendChild(telefonoBien);

            let codigoPostalBien = document.createElement('p');
            codigoPostalBien.innerHTML = "Código postal: " + codigoPostal;
            informacionBien.appendChild(codigoPostalBien);

            let tipoBien = document.createElement('p');
            tipoBien.innerHTML = "Tipo: " + tipo;
            informacionBien.appendChild(tipoBien);

            let precioBien = document.createElement('p');
            precioBien.innerHTML = "Precio: " + precio;
            informacionBien.appendChild(precioBien);

            //Check if the city is already in the array of cities
            if (!ciudades.includes(ciudad)) {
                //If not creates the option
                let elementoAnadir = document.createElement('option');
                elementoAnadir.textContent = ciudad;
                elementoAnadir.value = ciudad;
                ciudadDropdown.appendChild(elementoAnadir);
                ciudades.push(ciudad);
            }

            //Check if the type is already in the array of types
            if (!tipos.includes(tipo)) {
                //If not creates the option
                let elementoAnadir = document.createElement('option');
                elementoAnadir.textContent = tipo;
                elementoAnadir.value = tipo;
                tipoDropdown.appendChild(elementoAnadir);
                tipos.push(tipo);
            }

            //Create the save button
            let guardarButton = document.createElement('button');
            guardarButton.innerHTML = "Guardar";
            guardarButton.setAttribute('onclick', 'guardarBien(' + id + ")")
            informacionBien.appendChild(guardarButton);

            //Create the divider
            let divider = document.createElement('div');
            divider.setAttribute('class', 'divider');
            informacionBien.appendChild(divider);

            //Append the current div to his father
            informacionBienes.appendChild(informacionBien);
        });
    });

//Save the property to favorites
function guardarBien(idToSave) {
    fetch("../data-1.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(bien => {

                let id = bien.Id;

                //Check if the id is the same of the property
                if (id === idToSave) {
                    let codigoPostal = bien.Codigo_Postal;
                    let ciudad = bien.Ciudad;
                    let tipo = bien.Tipo;
                    let precio = bien.Precio;
                    let direccion = bien.Direccion;
                    let telefono = bien.Telefono;

                    let homeImg = document.createElement('img');
                    homeImg.setAttribute('class', 'homeImg');
                    homeImg.setAttribute('src', '../img/home.jpg');
                    homeImg.setAttribute('alt', 'Home image');
                    homeImg.setAttribute('height', '140');
                    homeImg.setAttribute('width', '200');

                    let informacionBien = document.createElement('div');
                    informacionBien.setAttribute('class', 'informacionBien')
                    informacionBien.appendChild(homeImg);

                    let direccionBien = document.createElement('p');
                    direccionBien.innerHTML = "Dirección: " + direccion;
                    informacionBien.appendChild(direccionBien);

                    let ciudadBien = document.createElement('p');
                    ciudadBien.innerHTML = "Ciudad: " + ciudad;
                    informacionBien.appendChild(ciudadBien);

                    let telefonoBien = document.createElement('p');
                    telefonoBien.innerHTML = "Telefono: " + telefono;
                    informacionBien.appendChild(telefonoBien);

                    let codigoPostalBien = document.createElement('p');
                    codigoPostalBien.innerHTML = "Código postal: " + codigoPostal;
                    informacionBien.appendChild(codigoPostalBien);

                    let tipoBien = document.createElement('p');
                    tipoBien.innerHTML = "Tipo: " + tipo;
                    informacionBien.appendChild(tipoBien);

                    let precioBien = document.createElement('p');
                    precioBien.innerHTML = "Precio: " + precio;
                    informacionBien.appendChild(precioBien);

                    let guardarButton = document.createElement('button');
                    guardarButton.innerHTML = "Guardar";
                    guardarButton.setAttribute('onclick', 'guardarBien(' + id + ")")
                    informacionBien.appendChild(guardarButton);

                    let divider = document.createElement('div');
                    divider.setAttribute('class', 'divider');
                    informacionBien.appendChild(divider);

                    informacionBienesGuardados.appendChild(informacionBien);
                }
            });
        });
}

//Does the search applying the filters
function buscarConFiltros() {
    //Gets the information from the filters.
    let ciudadFilter = ciudadDropdown.options[ciudadDropdown.selectedIndex].value;
    let tipoFilter = tipoDropdown.options[tipoDropdown.selectedIndex].value;
    let precioFilter = document.getElementById('rangoPrecio').value;

    //Clean the information from the filter
    let precioFilterBottom = precioFilter.split(";")[0];
    let precioFilterTop = precioFilter.split(";")[1];

    while (informacionBienes.firstChild) {
        informacionBienes.removeChild(informacionBienes.firstChild)
    }

    fetch("../data-1.json")
        .then(res => res.json())
        .then(data => {

            data.forEach(bien => {

                //Get the information to compare
                let ciudad = bien.Ciudad;
                let tipo = bien.Tipo;
                let precio = bien.Precio;
                //Creates the int to compare againts the filters
                let precioToCompare = precio.slice(1).replace(',','')

                //Check all the conditions to decide if is gonna be shown or not
                if ((ciudadFilter === "" || ciudadFilter === ciudad) && (tipoFilter === "" || tipoFilter == tipo) && precioToCompare >= precioFilterBottom && precioToCompare <= precioFilterTop) {

                    let codigoPostal = bien.Codigo_Postal;
                    let id = bien.Id;
                    let direccion = bien.Direccion;
                    let telefono = bien.Telefono;

                    let homeImg = document.createElement('img');
                    homeImg.setAttribute('class', 'homeImg');
                    homeImg.setAttribute('src', '../img/home.jpg');
                    homeImg.setAttribute('alt', 'Home image');
                    homeImg.setAttribute('height', '140');
                    homeImg.setAttribute('width', '200');

                    let informacionBien = document.createElement('div');
                    informacionBien.setAttribute('class', 'informacionBien')
                    informacionBien.appendChild(homeImg);

                    let direccionBien = document.createElement('p');
                    direccionBien.innerHTML = "Dirección: " + direccion;
                    informacionBien.appendChild(direccionBien);

                    let ciudadBien = document.createElement('p');
                    ciudadBien.innerHTML = "Ciudad: " + ciudad;
                    informacionBien.appendChild(ciudadBien);

                    let telefonoBien = document.createElement('p');
                    telefonoBien.innerHTML = "Telefono: " + telefono;
                    informacionBien.appendChild(telefonoBien);

                    let codigoPostalBien = document.createElement('p');
                    codigoPostalBien.innerHTML = "Código postal: " + codigoPostal;
                    informacionBien.appendChild(codigoPostalBien);

                    let tipoBien = document.createElement('p');
                    tipoBien.innerHTML = "Tipo: " + tipo;
                    informacionBien.appendChild(tipoBien);

                    let precioBien = document.createElement('p');
                    precioBien.innerHTML = "Precio: " + precio;
                    informacionBien.appendChild(precioBien);

                    let guardarButton = document.createElement('button');
                    guardarButton.innerHTML = "Guardar";
                    guardarButton.setAttribute('onclick', 'guardarBien(' + id + ")")
                    informacionBien.appendChild(guardarButton);

                    let divider = document.createElement('div');
                    divider.setAttribute('class', 'divider');
                    informacionBien.appendChild(divider);

                    informacionBienes.appendChild(informacionBien);
                }
            });
        });
}
