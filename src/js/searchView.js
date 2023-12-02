class searchView {
    _parentEl = document.querySelector('.search');

    getQuery(){
        let query =  this._parentEl.querySelector('.search-bar').value;
        this._clear()
        return query;
    }

    _clear(){
        this._parentEl.querySelector('.search-bar').value = '';
    }

    searchHandler(holder){
        this._parentEl.addEventListener('submit', function(e){
            e.preventDefault();

            holder()
        })
    }
}

export default new searchView();