const main = document.createElement("main");
document.body.append(main)

let article = window.location.search;
article = article.replace(/(.*)?a=(.*)/g, "$2");

function Error()
{
    console.log(`404: ${ article } not found!`);
}

async function GetArticle()
{
    const res = await fetch(`/articles/${ article }.json`);
    if(res.status == 404) return Error();
    
    const content = await res.json();
    ParseArticleMisc(content);
}

let contentElement;
function ParseArticleMisc(content)
{
    const coverPath = `img/${ content.cover }`;
    const coverElement = document.createElement("img");
    coverElement.src = coverPath;
    coverElement.classList.add("cover");
    main.append(coverElement);

    const titleText = content.title;
    const titleElement = document.createElement("h1");
    titleElement.innerHTML = titleText;
    main.append(titleElement);

    const dateText = `${ content.published } : ${ content.edited }`;
    const dateElement = document.createElement("h3");
    dateElement.innerHTML = dateText;
    main.append(dateElement);

    contentElement = document.createElement("section");
    main.append(contentElement);
    ParseContent(content.content);
}

function ParseContent(content)
{
    for(let i = 0; i < content.length; i++)
    {
        ParsePart(content[i]);
    }
}

function ParsePart(part)
{
    switch(part.type)
    {
        case "text":
            ParseText(part.content);
            break;
        case "code":
            ParseCode(part.content);
    }
}

function ParseText(content)
{
    const textElement = document.createElement("p");
    textElement.innerHTML = content;
    contentElement.append(textElement);
}

function ParseCode(content)
{
    let code = content;

    const codeDivElement = document.createElement("div");
    codeDivElement.classList.add("code");

    const codeTextElement = document.createElement("p");
    
    const preElement = document.createElement("pre");
    preElement.innerHTML = content;

    codeTextElement.append(preElement);
    codeDivElement.append(codeTextElement);
    contentElement.append(codeDivElement);
}

GetArticle();