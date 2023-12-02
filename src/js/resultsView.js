import view from './view.js'

class resultsView extends view{
    _parentElement = document.querySelector('.search-results');
    _errMessage = `This recipe could not be found. Please try something else 💥💩`

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

export default new resultsView()