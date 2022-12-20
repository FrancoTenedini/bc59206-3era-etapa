const search = document.querySelector("#busqueda")

search.addEventListener('focus', (e) => {
    e.target.classList = 'search-bar__form-search__active'
 }, true)

 search.addEventListener('blur', (e) => {
     e.target.classList = 'search-bar__form-search__des'
   }, true);