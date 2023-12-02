import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js'
import recipeView from './recipeView.js'
import searchView from './searchView.js';
import resultsView from './resultsView.js';
import paginationView from './paginationView.js';
import bookmarkView from './bookmarkView.js';
import newRecipe from './newRecipe.js';
import shoppingView from './shoppingView.js';

let resultsPage = document.querySelector('.results-page');



let controlRecipe = async function () {
    try {
        let id = window.location.hash.slice(1)
        if (!id) return;

        // ingredients render
        await model.loadRecipe(id);
        const { recipe } = model.state;

        // recipe render
        recipeView.render(recipe);
        console.log(model.state.recipe)

        // recipeView._renderSpinner();
    } catch (err) {
        console.log(err);
        recipeView._renderError();
    }

}



let controlSearchResuls = async function () {
   try {let query = searchView.getQuery()
    if (!query) return;

    // loading search results
    await model.loadSearchResults(query)

    // rendering search results
    resultsView.render(model.getSearchResultsPage(1))

    // rendering pages
    paginationView.render(model.state.search);
}catch(err){
    resultsView._renderError();
}

}

let controlPagination = function(goToPage){
    // rendering new search results
    resultsView.render(model.getSearchResultsPage(goToPage))

    // rendering new pages
    paginationView.render(model.state.search);
}

let controlServings = function(updateTo){
    model.updateServings(updateTo);

    recipeView.render(model.state.recipe);
    // recipeView.update(model.state.recipe);
}

let controlBookmarks = function(){
    if(!model.state.bookmark) bookmarkView._renderError();

    if(!model.state.recipe.bookmarked) model.bookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);


    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmark)

}

let controlLocalBookmark = function(){
    bookmarkView.render(model.state.bookmark)
}

let controlAddNewRecipe = function(){
    newRecipe.openWindow();
    newRecipe.closeWindow();
}

let controlNewRecipe = async function(newRecipes){
    try{
        // getting the new recipe from api
        await model.uploadRecipe(newRecipes);

        // rendering recipe on the page
        recipeView.render(model.state.recipe);

        // opening and closing of the modal window
        newRecipe.chooseModal();

        // rendering recipe in the bookmark
        bookmarkView.render(model.state.bookmark)
}catch(err){
    console.error(`💥💥 ${err}`)
    recipeView._renderError(err.message)
}
}

const controlShoppingList = function(){
    shoppingView.renderWithoutClear(model.state.recipe.ingredients);
    console.log(model.state.recipe.ingredients)
}

const controlAdditionalIngredients = function(num){
    newRecipe.renderWithoutClear(num)
}


const init = function () {
    recipeView._renderHandler(controlRecipe);
    recipeView.renderHandlerServings(controlServings)
    searchView.searchHandler(controlSearchResuls);
    paginationView._renderHandlerClick(controlPagination);
    recipeView.renderHandlerBookmark(controlBookmarks);
    bookmarkView.addHandler(controlLocalBookmark);
    newRecipe._addHandlerUpload(controlNewRecipe);
    shoppingView.renderHandlerShopping(controlShoppingList);
    newRecipe._renderAddIngredients(controlAdditionalIngredients);
    controlAddNewRecipe()
}

init();

