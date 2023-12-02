import view from './view.js'
import { ING_NUM } from './config.js';

class newRecipe extends view{
    _parentElement = document.querySelector('.only-ingredients')
    _openModal = document.querySelector('.edit-recipe');
    _overlay = document.querySelector('.overlay');
    _recipeWindow = document.querySelector('.recipe-window');
    _closeModal = document.querySelector('.close-modal');
    _addIngredient = document.querySelector('.add-ingredient');


    chooseModal(){
        console.log('1')
        this._overlay.classList.toggle('hidden')
        this._recipeWindow.classList.toggle('hidden')
    }


    openWindow(){
        this._openModal.addEventListener('click', this.chooseModal.bind(this))
    }

    closeWindow(){
        this._closeModal.addEventListener('click', this.chooseModal.bind(this))
        this._overlay.addEventListener('click', this.chooseModal.bind(this))
    }

    _addHandlerUpload(handler){
        this._recipeWindow.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr)
            console.log(data)
            handler(data)
        })
    }



    _renderAddIngredients(handler){
        let num = ING_NUM;
        this._addIngredient.addEventListener('click', function(){
            let newNum = ++num;
             num = newNum
            handler(num)
        })
    }
    
    
      _generateMarkup(){
        return this._generateMarkupPreview();    
    }


     _generateMarkupPreview(){
        return `<label for="" class="recipe-label">Ingredient ${this._data}</label>
        <input value=" " required name="Ingredient ${this._data}" type="text" class="recipe-input">`
        }
}

export default new newRecipe()