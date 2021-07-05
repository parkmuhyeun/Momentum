const search = document.querySelector("#searchingPart");
const searchForm = search.querySelector("#searchForm");
const searchInput = searchForm.querySelector("input");


function handleSubmit(event){                                               //Submit 발생시
    event.preventDefault();
    const content = searchInput.value;
    searchInput.value ="";
    window.location.href = `https://www.google.com/search?q=${content}`;    //Google검색 url
}

searchForm.addEventListener("submit",handleSubmit);