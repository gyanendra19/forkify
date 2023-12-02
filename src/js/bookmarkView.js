import view from './view.js'

class bookmarkView extends view{
    _parentElement = document.querySelector('.bookmark-list');
    _errMessage = `No recipes bookmarked yet 💩💩`



    addHandler(handler){
        window.addEventListener('load', handler)
    }


    _generateMarkup(){
        return this._data.map(this._generateMarkupPreview).join('')    
    }


     _generateMarkupPreview(results){
        return `<li class="preview">
        <a href="#${results.id}" class="preview-link">
        <figure class="preview-figure">
            <img class="preview-img" src="${results.image}" alt="">
        </figure>
        <div class="preview-data">
            <h4 class="preview-title">${results.title}</h4>
            <p class="preview-publisher">${results.publisher}</p>
        </div>
        </a>
    </li>

`
        }
    
}

export default new bookmarkView()