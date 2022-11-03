
let detail= (url)=>fetch(url).then((res)=>res.json()).then((data)=>{

      let stats=data.stats.map((statistic)=>{
        return `
        <p class="m-0"> ${statistic.stat.name}</p>
        <div class="progress mb-1">
          <div class="progress-bar" role="progressbar" style="width: ${statistic.base_stat}%;" aria-valuenow="${statistic.base_stat}" aria-valuemin="0" aria-valuemax="100">${statistic.base_stat}%</div>
        </div>
        `
      }).join('')

    let pokemon_detail=`
      <h1>Pokedex</h1>
      <div class="card ${data.types[0].type.name} mx-auto" style="width: 25rem;">
        <img src=${data.sprites.other.dream_world.front_default} class="card-img-top mx-auto ${data.types[0].type.name} mt-4"  alt="..." style="width: 15rem;">
        <div class="card-body">
          <h3 class="card-title">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
          <div class="d-grid gap-3">
          <div class="p-2 bg-light border">
          <h5>Stats</h5>
          ${stats}
          </div>
          <div class="p-2 bg-light border">
          <h5>Height</h5>
          ${data.height} meters
          </div>
          <div class="p-2 bg-light border">
          <h5>Weight</h5>
          ${data.weight} tons
          </div>
          </div>
          <a id="backButton" class="btn btn-primary m-2">Back</a>
        </div>
      </div>
    `

    document.getElementById("content").innerHTML=pokemon_detail;
    document.getElementById('backButton').addEventListener('click', (e) => {
      if(e.target) document.location.reload();
  })
  })
document.getElementById('pokemonList').addEventListener("click",function(e) {
  let url='https://pokeapi.co/api/v2/pokemon/';
    if (e.target && e.target.matches("li.pokemon")){
      url+=e.target.children[0].innerText.slice(1);
      detail(url);

    }else if(e.target && e.target.matches('div.detail')){
      url+=e.target.parentElement.children[0].innerText.slice(1);
      detail(url);
    }else if(e.target && e.target.matches('span.name')){
      url+=e.target.parentElement.children[0].innerText.slice(1);
      detail(url);
    }else if(e.target && e.target.matches('img')){
      url+=e.target.parentElement.parentElement.children[0].innerText.slice(1);
      detail(url);
    }
  
  });

