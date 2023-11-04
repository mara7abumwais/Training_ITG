const order_form = document.getElementById('order_form');
const food_modal = document.getElementById("food_modal");
const close_foodModel = document.getElementById('close_foodModel');
const food_options = document.getElementsByName('food_options');
const special_notes = document.getElementById('special_notes');

// to get user name
const urlSearchParams = new URLSearchParams(window.location.search);

const foodPrices = {
    fried_chicken: 10,
    pizza: 20,
    burger: 30,
};

function getSelectedFood ()
{
    for(let option of food_options)
    {
        if(option.checked)
        {
            return option.value;
        }
    }
    return null;
}

function calculatePrice(selectedFood)
{
    let price = foodPrices[selectedFood];
    console.log(price);
    if(special_notes.value !== "")
    {
        price = price + 5;
    }
    return price;
}

order_form.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    //Receipt modal data
     // Get the modal elements using getElementById
    const user_name = document.getElementById('user_name');
    const order_date = document.getElementById('order_date');
    const user_price = document.getElementById('user_price');
    const user_order = document.getElementById('user_order');
    const user_notes = document.getElementById('user_notes');

    const currentdate = new Date();
    let datetime = currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear();


     // Set the innerHTML of the modal receipt elements
    user_name.innerHTML = urlSearchParams.get('register_name');
    user_order.innerHTML = getSelectedFood();
    user_price.innerHTML = "$"+calculatePrice(user_order.innerHTML);
    order_date.innerHTML = datetime;
    user_notes.innerHTML = "Your special notes: " + special_notes.value;

    //Reset the
    order_form.reset();
    //display receipt modal
    food_modal.style.display = "block";

});

//close receipt modal
close_foodModel.onclick = function() {
    food_modal.style.display = "none";
}