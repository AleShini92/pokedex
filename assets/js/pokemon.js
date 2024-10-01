//https://github.com/fanzeyi/pokemon.json


import pokemon from "../js/pokedex.json" with { type: "json"};

//console.log(pokemon);

let pkmn = [...pokemon].slice(0,151);
let card = '';

pkmn.forEach(pkmn => {
    let pokedex = document.querySelector('#pokedex');
    card = `<div class="p-3 b-radius_1 pointer">
            <img class="" src="https://aleshini92.github.io/pokedex/assets/images/${formatID(pkmn.id)}.png">
            <h3>${pkmn.name.english}</h3>
        </div> `
    pokedex.insertAdjacentHTML('beforeend', card);
});

function formatID(id) {
    //console.log(id.toString().length);

    if(id.toString().length == 1) return `00${id}`;
    if(id.toString().length == 2) return `0${id}`;
    return id;
}

let searchBar = document.querySelector('#search-bar');
let pokedex = document.querySelector('#pokedex');

searchBar.addEventListener('keyup', (e) => {
    let query = e.target.value.toLowerCase();  // Converti in minuscolo per una ricerca case-insensitive
    card = '';  // Svuota la variabile 'card' per evitare che si accumuli contenuto vecchio
    let typeQuery = [];
    if (query.startsWith('type:')) {
        console.log('search for type');
        typeQuery = query.replace('type:', '').trim();  // Rimuovi 'type:' e gli eventuali spazi

        // Verifica la query
        console.log('Tipo cercato:', typeQuery);

        // Filtra i Pokémon per tipo
        let filterPkmnByType = pkmn.filter(pkmn => {
            // Stampa i tipi di ogni Pokémon per verificare che siano corretti
            console.log(`Pokémon: ${pkmn.name.english}, Tipi: ${pkmn.type}`);

            // Controlla se il tipo del Pokémon corrisponde a quello cercato (case-insensitive)
            return pkmn.type.some(type => type.toLowerCase() === typeQuery);
        });

        console.log('Pokémon filtrati:', filterPkmnByType);  // Verifica se il filtro restituisce qualcosa

        // Costruisci le card dei Pokémon filtrati
        filterPkmnByType.forEach(pkmn => {
            card += `
                <div class="pokemon-card">
                    <img class="pokemon-img" src="https://aleshini92.github.io/pokedex/assets/images/${formatID(pkmn.id)}.png" alt="${pkmn.name.english}">
                    <h3>${pkmn.name.english}</h3>
                </div>`;
        })
    } else {
        let filterPkmn = pkmn.filter(pkmn => {
            return pkmn.name.english.toLowerCase().startsWith(query);  // Confronta il nome in modo case-insensitive
        });

        filterPkmn.forEach(pkmn => {
            card += `
                <div class="pokemon_card">
                    <img class="pokemon_img" src="https://aleshini92.github.io/pokedex/assets/images/${formatID(pkmn.id)}.png"" alt="${pkmn.name.english}">
                    <h3>${pkmn.name.english}</h3>
                </div> `;
                console.log('Tipo cercato:', typeQuery);
        });

    }

    // Aggiorna il contenuto del DOM
    pokedex.innerHTML = card;
});