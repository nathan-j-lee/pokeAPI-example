document.getElementById("submit").addEventListener("click", function () {
    const name = document.getElementById("pokemon-name").value;
    console.log(name);
    getPokemon(name.toLowerCase());
}, false);

const pokemon_URL = "https://pokeapi.co/api/v2/pokemon/";
var chart;
async function getPokemon(pokemonName) {
    new_URL = pokemon_URL + pokemonName;
    document.getElementById("name").textContent = "";
    try {
        const response = await fetch(new_URL);
        const data = await response.json();
        //console.log(data);
        const { name, stats, types } = data;
        var typeString = types[0].type.name;
        if (types.length > 1) typeString += ", " + types[1].type.name
        document.getElementById("name").textContent = name;
        document.getElementById("types").textContent = typeString;
        //console.log(stats);
        //console.log(stats[0].base_stat);
        const ctx = document.getElementById('statChart');
        if (chart) chart.destroy();
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["hp", "attack", "defense", "special-attack", "special-defense", "speed"],
                datasets: [{
                    label: 'Stat Totals',
                    data: [stats[0].base_stat, stats[1].base_stat, stats[2].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(128, 0, 128, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(128, 0, 128)'
                    ],
                    borderWidth: 2
                }],
                autoSkip: false
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 255
                    }
                }
            }
        });
    } catch (error) {
        document.getElementById("name").textContent = "Invalid name";
        console.error(`Invalid name error: ${error.message}`);
    }

}