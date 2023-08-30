const charContainer = document.querySelector("#charContainer");
const selectedContainer = document.querySelector("#selected");
let charactersInfo = [];

async function getChars(){
    const data = await fetch("https://swapi.dev/api/people");
    const chars = await data.json();
    charactersInfo = chars.results;
}

async function render(){
    await getChars();
    const names = charactersInfo.map((obj) => {
        let hashName = getHashName(obj.name);
        return `<div class="name"><a href="${hashName}">${obj.name}</a></diV>`;
    }).join("");
    charContainer.innerHTML = names;
    console.log(charactersInfo)
}


function getHashName(str){
    let hashName = "";
    const firstAndLast = str.split(" ");
    firstAndLast.forEach((str) => {
        hashName += str;
    })
    return `#${hashName}`;
}

function displayCharInfo(hash){
    charactersInfo.forEach((obj) => {
        let hashName = getHashName(obj.name);
        if(hashName === hash){
            const html = `
            <h1>${obj.name}</h1>
            <div>
            <h2>Gender: ${obj.gender}</h2>
            <h2>Birth Year: ${obj.birth_year}</h2>
            <h2>Eye Color: ${obj.eye_color}</h2>
            <h2>Hair Color: ${obj.hair_color}</h2>
            <h2>Skin color: ${obj.skin_color}</h2>
            <h2>Height: ${obj.height}</h2>
            <h2>Mass: ${obj.mass}</h2>
            </div>
            `
            selectedContainer.innerHTML = html;
        }
    })
}

window.addEventListener("hashchange", (event) => {
    const hash = window.location.hash;
    displayCharInfo(hash);
})

render();