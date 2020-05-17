let button = document.getElementById('button');
let name = document.getElementById('name')
let campo1 = document.getElementById('campo1')
let campo2 = document.getElementById('campo2')
let campo3 = document.getElementById('campo3')



function getInfo() {
    let selection = document.getElementById('selector').value;
    let number = 0;
    switch (selection) {
        case 'people':
            number = 82;
            break;
        case 'planets':
            number = 60;
            break;
    }
    updateWithLoading();
    let randomNumber = Math.floor((Math.random() * number) + 1);

    let apiUrl = `https://swapi.dev/api/${selection}/` + randomNumber;

    axios.get(apiUrl).then(function (response) {
        updateInfo(response.data);
    }).catch(e => {
        updateInfoError()
    });
}

function updateInfo(data) {
    let selection = document.getElementById('selector').value;
    let films = data.films;
    let pelis = 'Películas en las que aparece: '
    if (films.length > 0) {
        console.log('ALERTA ' + films.length)
        films.forEach(element => {
            axios.get(element)
                .then(function (response) {
                    let peliAuxiliar = '"' + response.data.title + '"';

                    pelis += peliAuxiliar + '     ';
                    campo3.innerText = pelis
                })
                .catch(err => console.log('NO FUNCIONA'));
        })
        console.log(pelis)
    };



    name.innerText = 'Nombre: ' + data.name;
    if (selection == 'people') {
        campo1.innerText = 'Altura: ' + data.height + ' cms';
        campo2.innerText = 'Peso: ' + data.mass + ' kgs';

        if (campo2.innerText == 'Peso: unknown kgs') {
            campo2.innerText = '';
        }
    }


    if (selection == 'planets') {
        campo1.innerText = 'Población: ' + data.population + '  habitantes';
        let films = data.films;


        if (campo1.innerText == 'Población: unknown habitantes') {
            campo1.innerText = ''
        }
        if (name.innerText == 'Nombre: unknown') {
            name.innerText = 'La fuerza poderosa en ti es. De nuevo intentarlo debes';
        }
    }
}

function updateWithLoading() {
    name.innerHTML = '<i class="fas fa-spinner"></i>'
    campo1.innerText = '';
    campo2.innerText = '';
    campo3.innerText = '';
}

function updateInfoError() {
    name.innerText = 'La fuerza poderosa en ti es. De nuevo intentarlo debes';
}

button.addEventListener('click', getInfo)
