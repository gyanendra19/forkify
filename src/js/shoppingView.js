import view from './view.js'

class shoppingView extends view{
    _parentElement = document.querySelector('.shopping-list');
    btnShoppingParent = document.querySelector('.results-page')


    renderHandlerShopping(handler){
        this.btnShoppingParent.addEventListener('click', function(e){
            let btn = e.target.closest('.add-shopping'); 
            if(!btn) return;     
            handler();
        })

    }


    _generateMarkup(){
        return this._data.map(this._generateMarkupPreview).join('')    
    }


     _generateMarkupPreview(results){
                return `<div class="shopping-item">
                <div class="item-number">
                    <input value= "${results.quantity === null ? 1 : results.quantity}" type="number" name="" id="">
                    <p class="item-unit">${results.unit === '' ? 'pcs' : results.unit }</p>
                </div>
                <h4 class="main-item">${results.description}</h4>
            </div>
        </div>`
        }
    
}

export default new shoppingView()