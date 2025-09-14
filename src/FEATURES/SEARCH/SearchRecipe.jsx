import React, { useEffect } from 'react'

let timer = null;
const defaultSearchStr = [
    "Search a Recipe...",
    "Pizza",
    "Pasta",
    "Burger",
    "Salad",
    "Chicken",
    "Soup",
    "Dessert",
    "Vegan",
    "Seafood",
    "Tacos"
]

export default function SearchRecipe() {
    const [index, setIndex] = React.useState(0);
    const randVal = defaultSearchStr[index]

    useEffect(() => {
        async function getRecipes() {
            const data = await fetch("https://forkify-api.herokuapp.com/v2/recipes?search=pizza&key=f14e0dfd-46c7-4804-891e-dd5dc8ba229d");
            const res = await data.json();
            console.log(data)
        }

        getRecipes()
    }, [])

    useEffect(()=>{
        function changeIndex() {
            const randomIndex = Math.floor(Math.random() * defaultSearchStr.length);
            timer = setTimeout(() => {
                console.log({randomIndex})
                setIndex(randomIndex)
            }, 10000)
        }
        
        changeIndex()
        return () => clearTimeout(timer)
    },[index])

    console.log({index, defaultSearchStr: randVal})


    return (<label htmlFor="" className="w-full flex shadow-2xl">
        <input className="search-field text-fade-animation text-2xl" type="text" value={randVal} />
        <div className="cstm-search-btn w-52 h-full bg-green-950 flex items-center justify-center text-green-300 font-bold text-4xl">Search</div>
    </label>)
}

/*
GET https://platform.fatsecret.com/rest/food/v4?
food_id=33691&
Content-Type: application/json
Header: Authorization: Bearer {Access Token}
food_id=33691&format=json


COPILOT
// Define the URL endpoint
const url = 'https://platform.fatsecret.com/rest/food/v4?food_id=33691&format=json';

// Include headers with Authorization
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
};

// Perform the fetch request
fetch(url, { headers })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Handle the JSON data returned
        console.log(data);
    })
    .catch(error => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
    });

    ACCESS TOKEN
    Client ID: 93f9bd9b24cc4c2fb0f7a61cd3a3cc10 
    Client Secret: bccf59d3e02f4862ab6322c9e66a61bb

    RAPID API CODE SNIPET
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=side%20salad&diet=vegetarian&intolerances=gluten&includeIngredients=cheese%2Cnuts&excludeIngredients=eggs&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&addRecipeInstructions=false&addRecipeNutrition=false&maxReadyTime=45&ignorePantry=true&sort=max-used-ingredients&offset=0&number=10';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'd36cfed342msh9ebb1dc6074bd83p1eb6c3jsnebaac21345e0',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}
*/
