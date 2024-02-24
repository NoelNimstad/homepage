const wrapper = document.getElementById("left");
let interval;

function generateTiles()
{   
    const width = Math.round(window.innerWidth / (window.innerWidth < 1150 ? 50 : 100));
    const height = Math.round(window.innerHeight / 50);

    document.body.style.setProperty("--rows", height);
    document.body.style.setProperty("--columns", width);

    wrapper.innerHTML = "";
    tiles = [];
    for(let i = 0; i < width * height; i++)
    {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        wrapper.append(tile);
        tiles.push(tile);
        
        tile.addEventListener("mouseover", () => 
        {
            tile.style.border = `solid 15px #${ ((1 << 24) * Math.random() | 0).toString(16) }`;
            setTimeout(() => 
            {
                tile.style.border = "solid 0px transparent";
            }, 200);
        });
    };  

    if(!matchMedia("(pointer:fine)").matches) 
    {
        clearInterval(interval);
        interval = setInterval(() => 
        {
            let index = Math.floor(Math.random() * tiles.length);
            tiles[index].style.border = `solid 15px #${ ((1 << 24) * Math.random() | 0).toString(16) }`;
            setTimeout(() => 
            {
                tiles[index].style.border = "solid 0px transparent";
            }, 200);
        }, 125);
    }      

    if(width > 10)
    {
        tiles[width * (height - 1)].classList.add("white");     // ノニ
        tiles[width * (height - 1) + 1].classList.add("white");
        tiles[width * (height - 2) + 2].classList.add("white");
        tiles[width * (height - 3) + 3].classList.add("white");
        tiles[width * (height - 4) + 4].classList.add("white");
        tiles[width * (height - 5) + 4].classList.add("white");
        tiles[width * (height - 1) + 6].classList.add("white");
        tiles[width * (height - 1) + 7].classList.add("white");
        tiles[width * (height - 1) + 8].classList.add("white");
        tiles[width * (height - 1) + 9].classList.add("white");
        tiles[width * (height - 1) + 10].classList.add("white");
        tiles[width * (height - 5) + 8].classList.add("white");
        tiles[width * (height - 5) + 7].classList.add("white");
        tiles[width * (height - 5) + 9].classList.add("white");
    } else 
    {
        tiles[width * (height - 1)].classList.add("white");     // ノ
        tiles[width * (height - 1) + 1].classList.add("white"); // ニ
        tiles[width * (height - 1) + 2].classList.add("white");
        tiles[width * (height - 1) + 3].classList.add("white");
        tiles[width * (height - 1) + 4].classList.add("white");
        tiles[width * (height - 5) + 2].classList.add("white");
        tiles[width * (height - 5) + 1].classList.add("white");
        tiles[width * (height - 5) + 3].classList.add("white");
        tiles[width * (height - 7)].classList.add("white");
        tiles[width * (height - 7) + 1].classList.add("white");
        tiles[width * (height - 8) + 2].classList.add("white");
        tiles[width * (height - 9) + 3].classList.add("white");
        tiles[width * (height - 10) + 4].classList.add("white");
        tiles[width * (height - 11) + 4].classList.add("white");
    }
};

generateTiles();
window.addEventListener("resize", () => generateTiles());