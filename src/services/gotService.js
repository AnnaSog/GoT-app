export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api'; //_ означат, что это статичные данные и др. разработчикам не следует его трогать
    }
    
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`); //url - то, что польз. передает, напр.'/characters?page=5'

        if (!res.ok){ 
            throw new Error(`Could not fetch ${url} status: ${res.status}`);
        } //если статус результата будет не 200(ок), то в консоле отражится ошибка

        return await res.json();
    }

    async getAllCharacters () {
        const res = await this.getResource('/characters?page=5'); //?page=5 - дописан к осн.адр, для запроса к персонажам на стр.5
        return res.map(this._transformCharacter);
    }

    async getCharacter(id = this._apiId){ //данные конкретного персонажа
        const character = await this.getResource(`/characters/${id}`); //здесь мы получаем {}, ктр ниже подвержает трансформации
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }

    async getBook(id){ 
        const book = await this.getResource(`/books/${id}`); //здесь мы получаем {}, ктр ниже подвержает трансформации
        return this._transformBook(book);
    }

    async getAllhouses(){
        return this.getResource(`/houses/`);
    }

    async gethouse(id){ 
        return this.getResource(`/houses/${id}`);
    }

    isSet(data) {  
        if (data) { //если есть инфо о персонаже, то будет отражаться
            return data
        } else {
            return 'no data' //если нет, то это сообщение
        }
    }

    _transformCharacter = (char) => {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        } 
    }

    _transformHouses(house){
        return{
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons 
        }
    }

    _transformBook(book){
        return{
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }

}


