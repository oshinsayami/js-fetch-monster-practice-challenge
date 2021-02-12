document.addEventListener('DOMContentLoaded', () => {
    loadMonsters(url + limitPrefix + '50' + pagePrefix + 1);
    enableButtons();
    createForm();
  });
  
  const url = 'http://localhost:3000/monsters';
  const limitPrefix = '?_limit=';
  const pagePrefix = '&_page=';
  
  function createForm(){
    let form = document.getElementById('create-monster')
    form.innerHTML = `<form id="monster-form"><input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button></form>`;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      postMonster(encodeURI);
    })
  }
  
  function postMonster(){
    const submitUrl =  `http://localhost:3000/monsters`
  
    let formData = {
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value, 10),
      description: document.getElementById('description').value
    };
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
  
      body: JSON.stringify(formData)
    };
    fetch(submitUrl, configObj).then(resp => resp.json()).then(json => console.log(json))
  
  }
  
  function loadMonsters(completeUrl){
    const monsterContainer = document.getElementById('monster-container')
    
    fetch(completeUrl).then(result => result.json()).then(json => renderMonsters(json))
  
    function renderMonsters(json){
      for(const monster of json){
        createMonster(monster);
      }
    }
      
    function createMonster(monster){
        let div = document.createElement('div');
        div.innerHTML = `<h2>${monster.name}</h2><h4>Age: ${monster.age}</h4><p>Bio: ${monster.description}</p>`
        monsterContainer.appendChild(div);
    }
  
  }
  
  function enableButtons(){
    const forward = document.getElementById('forward');
    const back = document.getElementById('back');
    let pageNumber = 1
  
    forward.addEventListener('click', () => {
      document.getElementById('monster-container').innerHTML = '';
      ++pageNumber;
      const completeUrl = url + limitPrefix + '50' + pagePrefix + pageNumber;
      loadMonsters(completeUrl);
    })
  
    back.addEventListener('click', () => {
      document.getElementById('monster-container').innerHTML = '';
      if(pageNumber !== 1) --pageNumber;
      const completeUrl = url + limitPrefix + '50' + pagePrefix + pageNumber;
      loadMonsters(completeUrl);
    })
  }