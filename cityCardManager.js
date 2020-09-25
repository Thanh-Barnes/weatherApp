const createCardHtml = (id, icon, name, temperature, description, comments, tempColor) => {
    
    const cardHtml = 
        `
        <div class="cityCard card mb-3 border border-dark" data-card-id=${id}>     
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${icon}" class="cardIcon card-img" alt="${description}">
                    <p class="cardDescripton">${description}</p>
                    <button type="button" class="align-left btn btn-danger btn-sm"><i class="delete-button fas fa-trash"></i></button>
                    <button type="button" class="align-left btn btn-warning btn-sm"><i class="fav-button fas fa-star"></i></button>
                    <p></p>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <br>
                        <h5 class="cardName">${name}</h5>
                        <p class="cardTemperature" id=${tempColor}>${temperature}°</p>
                        <p class="weatherComments">${comments}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        return cardHtml;
        };
        
class CityCardManager {
    constructor (currentId = 0) {
        this.cityCards = [];
        this.savedCards = [];
        this.currentId = currentId;
    };
    
    addCityCard(icon, name, temperature, description) {
        const cityCard = {
            id: this.currentId++,
            icon: icon,
            name: name,
            temperature: temperature,
            description: description,
            comments: ""
        };
        this.cityCards.push(cityCard);
    };
    
    deleteCityCard(cityId) {
        const savedCities = [];
    
        for(let i = 0; i < this.cityCards.length; i++) {
            const city = this.cityCards[i];
            if(city.id !== cityId) {
                savedCities.push(city);
            };
        };
        this.cityCards = savedCities;
        console.log(this.cityCards);
    };

    getCityById(cityId) {
        let foundCity = '';
    
        for (let i = 0; i < this.cityCards.length; i++) {
            const city = this.cityCards[i];
            if (city.id === cityId) {
                foundCity = city;
            };
        };
        return foundCity;
    };

    convertToCelcius(kelvinTemp) {
        const celciusTemp = (kelvinTemp-273.15);
        return celciusTemp;
    };

    weatherComments(celciusTemp) {
        
        if(celciusTemp <= 10) {
            return "It's freezing outside!";
        } else if (celciusTemp > 10 && celciusTemp <= 20) {
            return "It's chilly outside.";
        } else if (celciusTemp > 20 && celciusTemp <= 25) {
            return "Beautiful weather today.";
        } else if (celciusTemp > 25 && celciusTemp <= 35) {
            return "It's a hot day today.";
        } else {
            return "It's boiling outside."
        };
    };
        
    weatherColor(celciusTemp) {

        if(celciusTemp <= 10) {
            return "coldTempColor";
        } else if (celciusTemp > 10 && celciusTemp <= 20) {
            return "coolTempColor";
        } else if (celciusTemp > 20 && celciusTemp <= 25) {
            return "warmTempColor";
        } else if (celciusTemp > 25 && celciusTemp <= 35) {
            return "hotTempColor";
        } else {
            return "boilingTempColor";
        };
    };    
   
    render() {
        const cityHtmlList = [];
        
        for(let i = 0; i < this.cityCards.length; i++) {
                const card = this.cityCards[i];
                const tempRounded = Math.round(cityCardManager.convertToCelcius(card.temperature));
                const comments = cityCardManager.weatherComments(tempRounded);
                const tempColor = cityCardManager.weatherColor(tempRounded);
                const renderHtml = createCardHtml(card.id, card.icon, card.name, tempRounded, card.description, comments, tempColor);
                cityHtmlList.push(renderHtml);
        };  
        const cityCardsHtml = cityHtmlList.join('\n');
        const cityCardsList = document.querySelector('#weatherCard');
        cityCardsList.innerHTML = cityCardsHtml;
    };

    save() {
        const cityCardsJson = JSON.stringify(this.cityCards);
        localStorage.setItem('cities', cityCardsJson);
        // localStorage.removeItem('cities');

        const currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
    };

    load() {
        if(localStorage.getItem('cities')) {
            const cityCardsStr = localStorage.getItem('cities');
            this.cityCards = JSON.parse(cityCardsStr);            
        };
        if(localStorage.getItem('currentId')) {
            const currentIdStr = localStorage.getItem('currentId');
            this.currentId = JSON.parse(currentIdStr);
        };
    };
};

