const formEL = document.getElementById("form-EL")
const seedcolorEL = document.getElementById("seedcolor")
const selectEl = document.getElementById("select-EL")

window.onload = function() {
document.getElementById("scheme").click();
}

function renderColor(colorArray) {
    document.getElementById("color-bar").innerHTML = null;
    document.getElementById("color-hex").innerHTML = null;
    colorArray.forEach((color) => {
        document.getElementById("color-bar").innerHTML += `
        <div class="color-scheme" 
            style="background:${color.hex.value}" 
            onclick="copyText('${color.hex.value}')" >
        </div>`
        
        document.getElementById("color-hex").innerHTML += `
        <div class="color-name" 
            onclick="copyText('${color.hex.value}')" >
            ${color.hex.value}
        </div>`
    })
}

formEL.addEventListener("submit", function(e){
    e.preventDefault()
    const color = seedcolorEL.value.replace("#", "")
    const mode = selectEl.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
        renderColor(data.colors)
    })
})

function copyText(hex) {
    navigator.clipboard.writeText(hex)
        .catch(err => {
            const input = document.createElement("input")
            input.value = hex
            input.readOnly = true
            document.body.append(input)
            input.select()
            document.execCommand("copy")
        })
        .finally(() => {
            alert(`${hex} copied to clipboard`)
        })   
}
