import { Fraction } from 'fractional';
import view from './view.js'

class recipeView extends view {
    _parentElement = document.querySelector('.results-page');
    _errMessage = `This recipe could not be found. Please try something else 💥💥💥💩`
    
    
    _renderHandler(handler) {
        window.addEventListener('hashchange', handler)
        window.addEventListener('load', handler)
    }

    renderHandlerServings(handler){
        this._parentElement.addEventListener('click', function(e){
            let btn = e.target.closest('#ins-dec')
            if(!btn) return;
            let updateTo = +btn.dataset.update;
            if(updateTo > 0)handler(updateTo);
        })
    }

    renderHandlerBookmark(holder){
        this._parentElement.addEventListener('click', function(e){
            let btn = e.target.closest('#heart')
            if(!btn) return;
            holder();
        })
    }


    _generateMarkup() {
        return ` <div>
       <img src="${this._data.image}" alt="" class="results-img">
       <div class="head-title">${this._data.title}</div>
   </div>

   <div class="dish-info">
       <div class="timing">
           <i class="ri-time-line"></i>
           <span>${this._data.cookingTime} MINUTES</span>
       </div>
       <div class="servings">
           <span>🧍<span class="servings-number">${this._data.servings}</span> SERVINGS</span>
           <i id="ins-dec" class="ri-subtract-line"  data-update = "${this._data.servings - 1}"></i>
           <i id="ins-dec" class="ri-add-line" data-update = "${this._data.servings + 1}"></i>
       </div>
       <div class="bookmark">
           <i id="heart" class="ri-heart-${this._data.bookmarked ? 'fill' : 'line'}"></i>
       </div>
   </div>

   <div class="ingredients">
   <div class="ingredients-list">
   ${this._data.ingredients.map(this._generateingredient).join('')}
       </div>
       <div class="add-shopping"><i class="ri-shopping-cart-2-line"></i><span>ADD TO SHOPPING LIST</span></div>
      </div>
     
      <div class="how-to-cook">
       <div class="title">
           HOW TO COOK IT
       </div>
       <p class="instruction">This recipe was carefully designed and tested by <span class="publisher">${this._data.publisher}</span>. <br> Please check out directions at their website.</p>
       <div class="direction-button"><a class="direction-link" target = "_blank" href="${this._data.sourceUrl}">DIRECTIONS >></a></div>
    </div>

`
    }

    

    _generateingredient(ing) {
        return ` 
         <div class="items">
             <i id="tick-ingredient" class="ri-checkbox-circle-line"></i> 
             <span class="quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</span>
             <span class="unit">${ing.unit}</span>
             <span class="ingridient-item">${ing.description}</span>
         </div>
       `
    }
}

export default new recipeView();
