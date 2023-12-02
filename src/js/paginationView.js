import view from './view.js'


class paginationView extends view{
    _parentElement = document.querySelector('.pagination');

    _renderHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            let btn = e.target.closest('.common');
            if(!btn) return;
            
            let goToPage = +btn.dataset.goto;
            console.log(goToPage)
            handler(goToPage);
        })
    }

    _rightButton(currPage){
        return `<button data-goto = "${currPage + 1}" class="right-arrow common"><span class="page">Page ${currPage + 1}</span><i class="ri-arrow-right-line"></i></button>` 
    }

    _leftButton(currPage){
        return ` <button data-goto = "${currPage - 1}" class="left-arrow common"><i class="ri-arrow-left-line"></i><span class="page">Page ${currPage -1}</span></button>`
    }
    
    _generateMarkup(){
        let currPage = this._data.page;
        let numPages = Math.ceil(this._data.results.length / this._data.maxItem);
        console.log(numPages)
        // if it is page 1 and there are other pages
        if(currPage === 1 && numPages > 1) {
            this._parentElement.classList.add('first-page-right')
            return this._rightButton(currPage)
        }


        // if it is last page 
        if(currPage === numPages && numPages > 1) {
            return this._leftButton(currPage)
        }
        
        
        //if it is some other page
        if(currPage < numPages) {
            this._parentElement.classList.remove('first-page-right')
          return this._leftButton(currPage) + this._rightButton(currPage)
        };


        // if it is page 1 and no other pages are there
         return ''
    }
}

export default new paginationView();