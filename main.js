// random dog generator function
// Part 1: Random Dog Generator
const URL = 'https://dog.ceo/api/breeds/image/random';
const button = document.querySelector('#button');
const dogImage = document.querySelector('#image');

button.addEventListener('click', () => {
    fetch(URL)
        .then((data) => data.json())
        .then((response) => {
            dogImage.src = response.message;
            dogImage.classList.add('show');
        })
        .catch((error) => console.log(error));
});

// Part 2: Pokédex
const pokemonButton = document.querySelector('#pokemonButton');
const pokemonInput = document.querySelector('#pokemonInput');
const pokemonResult = document.querySelector('#pokemonResult');
const pokemonError = document.querySelector('#pokemonError');

pokemonButton.addEventListener('click', searchPokemon);

// Allow Enter key to trigger search
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

function searchPokemon() {
    const pokemonName = pokemonInput.value.toLowerCase().trim();
    
    if (!pokemonName) {
        return;
    }

    const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(pokemonURL)
        .then((data) => data.json())
        .then((response) => {
            // Hide error, show result
            pokemonError.style.display = 'none';
            pokemonResult.classList.add('show');

            // Set Pokemon data
            document.querySelector('#pokemonName').textContent = response.name;
            document.querySelector('#pokemonId').textContent = `#${response.id}`;
            document.querySelector('#pokemonSprite').src = response.sprites.front_default;
            
            // Set types with badges
            const typesDiv = document.querySelector('#pokemonTypes');
            typesDiv.innerHTML = '';
            response.types.forEach(typeInfo => {
                const badge = document.createElement('span');
                badge.className = `badge bg-secondary type-badge`;
                badge.textContent = typeInfo.type.name;
                typesDiv.appendChild(badge);
            });

            // Set height and weight (converted to readable units)
            document.querySelector('#pokemonHeight').textContent = `${response.height / 10} m`;
            document.querySelector('#pokemonWeight').textContent = `${response.weight / 10} kg`;

            // Set abilities
            const abilities = response.abilities.map(a => a.ability.name).join(', ');
            document.querySelector('#pokemonAbilities').textContent = abilities;
        })
        .catch((error) => {
            console.log(error);
            pokemonResult.classList.remove('show');
            pokemonError.style.display = 'block';
        });
}