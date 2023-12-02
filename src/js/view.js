export default class view {
    _data;
    render(data) {
        if(!data || (Array.isArray(data) && data.length === 0)){
            return this._renderError();
        }
        // console.log(this._generateMarkup())
        this._data = data;
        let markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderWithoutClear(data) {
        if(!data || (Array.isArray(data) && data.length === 0)){
            return this._renderError();
        }
        // console.log(this._generateMarkup())
        this._data = data;
        let markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('beforeend', markup);
    }

    // update(data){
    //     if(!data || (Array.isArray(data) && data.length === 0)){
    //         return this._renderError();
    //     }

    //     this._data = data;
    //     let markup = this._generateMarkup();
    //     const newDOM = document.createRange().createContextualFragment(markup);
    //     const newElements = Array.from(newDOM.querySelectorAll('*'))
    //     const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    //     newElements.forEach((newEl, i) => {
    //         const curEl = curElements[i];
    //         // console.log(curEl, curEl.isEqualNode(newEl))

    //         console.log(newEl.firstChild)
    //         // if(!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== ''){
    //         //     curEl.textContent = newEl.textContent;
    //         // }
    //     })
    //     console.log(newElements) 
    // }

    _clear() {
        if(Array.isArray(this._data) && this._data.some(ing => ing.description)) return;
        if(this._data === Number) return;
        this._parentElement.innerHTML = '';
    }

    _renderSpinner() {
        let spinMarkup = `<div class="spinner">
            <div class="spin"><i class="ri-loader-2-line"></i></div>
        </div>`
         
        console.log(spinMarkup)
        this._clear();
        this._parentElement.insertAdjacentHTML('beforeend', spinMarkup)
    }


    _renderError(errMessage = this._errMessage) {
        let markup = `<div class="error">
        <p>${errMessage}</p>
        </div>`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

}