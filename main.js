const cityCardManager = new CityCardManager(0);

cityCardManager.load();
cityCardManager.render();

// submit button function
const submitBtn = document.querySelector('#submitBtn');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //validation
    const cityNameInput = document.querySelector('#cityNameInput');
    const letters = (/^[a-z][a-z\s]*$/);
    console.log(cityNameInput.value)
    
    if(cityNameInput.value.match(letters)) {
        cityNameInput.classList.add('is-valid');
        cityNameInput.classList.remove('is-invalid');
        fetchWeatherData() 
    } else {
        cityNameInput.classList.add('is-invalid');
        cityNameInput.classList.remove('is-valid');
        alert("Please use letters to enter City Name");
    };

    // fetch data and catch error
    function fetchWeatherData() {

        // INSERT API KEY HERE
        const apiKey = 'api key here'; 
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput.value + '&appid=' + apiKey) 
            .then(response => response.json())
            .then(response => {
                if(response.cod === "404") {
                    alert("Please enter valid City Name")
                } else {
                    console.log(response);
                    
                    const weatherIcon = response.weather[0].icon;
                    const cardIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                    const cardName = response.name;
                    const cardTemperature = response.main.temp;
                    const cardDescription = response.weather[0].description;
                    
                    cityCardManager.addCityCard (cardIcon, cardName, cardTemperature, cardDescription);
                    cityCardManager.render();
                    // cityCardManager.save();
                        
                    const newCityInput = document.querySelector('#cityNameInput')
                    newCityInput.value = '';              
                };
            }); 
    };
        
    // quote generator
    const quotes = [
        "Push yourself, because no one else is going to do it for you.",
        "Somestimes later becomes never. Do it now.",
        "Great things never come from comfort zones",
        "Dream it. Wish it. Do it.",
        "Success doesn't just find you. You have to go out and get it",
        "The harder you work for something, the greater you’ll feel when you achieve it.",
        "Dream bigger. Do bigger.",
        "Don’t stop when you’re tired. Stop when you’re done.",
        "Wake up with determination. Go to bed with satisfaction.",
        "Do something today that your future self will thank you for.",
        "Little things make big days.",
        "Don’t wait for opportunity. Create it."
    ];
    function newQuote(quotes) {
        const randomNumber = Math.floor(Math.random() * (quotes.length));
        const quoteBox = document.querySelector('.quoteBox');
        quoteBox.innerHTML = quotes[randomNumber];
    };
    newQuote(quotes);
});
    
const cityCardsList = document.querySelector('#weatherCard');
console.log(cityCardsList)

cityCardsList.addEventListener('click', (event) => {

    if(event.target.classList.contains('delete-button')) {
        const parentCity = event.target.parentElement.parentElement.parentElement.parentElement;
        const cityId = Number(parentCity.dataset.cardId);

        cityCardManager.deleteCityCard(cityId);
        cityCardManager.save();
        cityCardManager.render();
    };
});

cityCardsList.addEventListener('click', (event) => {

    if(event.target.classList.contains('fav-button')) {
        const parentCity = event.target.parentElement.parentElement.parentElement.parentElement;
        const cityId = Number(parentCity.dataset.cardId);

        const cityCard = cityCardManager.getCityById(cityId);
        cityCardManager.savedCards.push(cityCard);

        console.log(cityCardManager.savedCards)
        cityCardManager.save();
        // cityCardManager.render();
    };
});


    
    
    
    
    