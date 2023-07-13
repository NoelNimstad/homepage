let squareWidth = 40;
let width;
let height;

function wait(ms)
{
    return new Promise((resolve, reject) => 
    {
        setTimeout(() => 
        {
            resolve();
        }, ms)
    })
}

const squaresDiv = document.getElementById('squares');
let squares = [];

function genSquares()
{
    width = Math.floor(window.innerWidth / squareWidth);
    height = Math.floor(window.innerHeight / squareWidth);

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        for(let i = 0; i < width * height; i++)
        {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `calc(100vw / ${ width })`;
            square.style.height = `calc(100vh / ${ height })`;
            squaresDiv.append(square);
            squares.push(square);
        }
    } else 
    {
        for(let i = 0; i < width * height; i++)
        {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `calc(100vw / ${ width })`;
            square.style.height = `calc(100vh / ${ height })`;
            squaresDiv.append(square);
            squares.push(square);

            square.addEventListener('mouseenter', async() => 
            {
                square.style.backgroundColor = `#${ ((1 << 24) * Math.random() | 0).toString(16) }`;
                await wait(300);
                square.style.backgroundColor = "#000";
            });
        }
    }
}

genSquares();

window.onresize = () => 
{
    const squaresDOM = document.querySelectorAll('.square');
    for(let square of squaresDOM)
    {
        square.remove();
    }

    genSquares();
}

const menu_items = document.getElementsByClassName('menu-item');
for(let menu_item of menu_items)
{
    menu_item.addEventListener('mouseover', () => 
    {
        menu_item.style.backgroundColor = `${ menu_item.dataset.colour }`;
        menu_item.style.borderBottom = `${ menu_item.dataset.colour } 1px solid`;
    });
    
    menu_item.addEventListener('mouseleave', () => 
    {
        menu_item.style = "";
    });
}

async function ColourSquare()
{
    const square = squares[Math.floor(Math.random() * squares.length)];
    square.style.backgroundColor = `#${ ((1 << 24) * Math.random() | 0).toString(16) }`;
    await wait(300);
    square.style.backgroundColor = "#000";
}

async function RandomSquareEffect()
{
    ColourSquare();
    await wait(700);
    RandomSquareEffect();
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    (async() => 
    {
        RandomSquareEffect();
        await wait(300);
        RandomSquareEffect();
    })();
}

const menu_button = document.getElementById('menu-button');
const menu_panel = document.getElementById('menu-panel');

menu_button.addEventListener('click', () => 
{
    menu_button.classList.toggle('active');
    menu_panel.classList.toggle('active');
});