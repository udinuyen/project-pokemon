const root = document.querySelector('#root');

let pokemonListElement = document.createElement('div');
pokemonListElement.classList.add('row');
root.appendChild(pokemonListElement);

let pokemonList = [];
let xhrPokemonList = new XMLHttpRequest();
xhrPokemonList.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');

xhrPokemonList.responseType = 'json';
xhrPokemonList.onload = function () {
    if (xhrPokemonList.status != 200) {
        console.error(` Error ${xhrPokemonList.statusText} - + 1 ${xhrPokemonList.status}`)
    } else {
        pokemonList = xhrPokemonList.response;
        pokemonList.results.forEach(function (pokemon) {
            const pokemonCardElement = document.createElement('div');
            pokemonCardElement.classList.add("card")
            pokemonCardElement.classList.add("col-4")

            const pokemonCardBodyElement = document.createElement('div');
            pokemonCardBodyElement.classList.add('card-body');

            const pokemonCardBodyTitleElement = document.createElement('h5');
            pokemonCardBodyTitleElement.classList.add('card-title');
            pokemonCardBodyTitleElement.classList.add('text-center');
            pokemonCardBodyTitleElement.innerHTML = pokemon.name;

            pokemonCardBodyElement.appendChild(pokemonCardBodyTitleElement);


            // const pokemonurl = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

            let pokemonDetail = null;
            let xhrPokemonDetail = new XMLHttpRequest();
            xhrPokemonDetail.open('GET', pokemon.url);
            xhrPokemonDetail.responseType = 'json';

            xhrPokemonDetail.onload = function () {
                if (xhrPokemonDetail.status != 200) {
                    console.error(
                        `Error $(xhrPokemonDetail.status) - $(xhrPokemonDetail.statusText)`
                    )
                } else {
                    pokemonDetail = xhrPokemonDetail.response;
                    const pokemonImageElement = document.createElement('img');
                    pokemonImageElement.classList.add('card-img-top');

                    if (Object.keys(pokemonDetail).includes('sprites')) {
                        pokemonImageElement.src = pokemonDetail.sprites.back_default;

                    }
                    pokemonCardElement.appendChild(pokemonImageElement);
                    pokemonCardElement.appendChild(pokemonCardBodyElement);
                    pokemonListElement.appendChild(pokemonCardElement);

                }
            }
            xhrPokemonDetail.send();

            // pokemonCardBodyElement.appendChild(pokemonCardBodyTitleElement);
            // pokemonCardElement.appendChild(pokemonCardBodyElement);
            // pokemonListElement.appendChild(pokemonCardElement);




        });
    }
}
xhrPokemonList.send();