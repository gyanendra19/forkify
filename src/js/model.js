import { API_URL } from "./config";
import { getJSON, sendJSON } from './helpers.js';
import { MAX_ITEM, KEY} from "./config";

export const state = {
    recipe: {},
    search: {
        query: '',
        page: 1,
        maxItem: MAX_ITEM,
        results: []
    },
    bookmark: []
}

let newRecipeObject = function(data){
    let { recipe } = data.data;
        return {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image: recipe.image_url,
            sourceUrl: recipe.source_url,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            cookingTime: recipe.cooking_time,
            ...(recipe.key && {key: recipe.key})
        }
}



export const loadRecipe = async function (id) {
    try {
        let data = await getJSON(`${API_URL}/${id}`);
        state.recipe = newRecipeObject(data)
        
        console.log(data.data)

        if(state.bookmark.some(bookmark => bookmark.id === id)){
            state.recipe.bookmarked = true
        }else{
            state.recipe.bookmarked = false;
        }

    } catch (err) {
        console.error(`${err} 💥💥💥`)
        throw err
    }

}


export const loadSearchResults = async function(query){
    try{
        let data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
            })


    }catch(err){
        console.error(`${err} 💥💥💥`)
        throw err
    }
}

export const getSearchResultsPage = function(page = state.results.page){
    state.search.page = page;
    let start = (page - 1) * state.search.maxItem;
    let end = page * state.search.maxItem;

    return state.search.results.slice(start,end)
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    })

     state.recipe.servings = newServings;
}

const persistBookmark = function(){
    localStorage.setItem('bookmark', JSON.stringify(state.bookmark))
}


export const bookmark = function(recipe){
    state.bookmark.push(recipe);
    
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    
    persistBookmark()
}

export const deleteBookmark = function(id){
    const index = state.bookmark.findIndex(el => el.id === id)
    state.bookmark.splice(index, 1);

    if(id === state.recipe.id) state.recipe.bookmarked = false;
    
    persistBookmark()
}

const init = function(){
    let storage = localStorage.getItem('bookmark');
    if(storage) state.bookmark = JSON.parse(storage)
}

init();

export const uploadRecipe = async function(newRecipe){
    try{const ingredients = Object.entries(newRecipe)
    .filter(ing => ing[0].startsWith('Ingredient') && ing[1] !== '')
    .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if(ingArr.length !== 3) throw new Error('Incorrect Format')
        const  [quantity, unit, description] = ingArr;
        return {quantity: quantity ? +quantity: null, unit, description}
        })

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            image_url: newRecipe.image,
            source_url: newRecipe.sourceUrl,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.prepTime,
            ingredients,
        }

        console.log(recipe)

        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = newRecipeObject(data)
        bookmark(state.recipe)

}catch(err){
    throw err;
}
}



const clearBookmarks = function(){
    localStorage.clear('bookmark')
}
// clearBookmarks()
