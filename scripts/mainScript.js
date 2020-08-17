/*------------------------------------|
|           Update Function           |
|------------------------------------*/

function UpdateOrder(){

    document.getElementById("taxi_type_display").value = document.getElementById("taxitype").value;
    document.getElementById("fuel_type_display").value = document.getElementById("Fueltype").value;
    document.getElementById("distance_display").value = document.getElementById("Distance").value;
    document.getElementById("stay_display").value = document.getElementById("Stay").value;
    document.getElementById("address_display").value = document.getElementById("Startingp").value;

    let taxi = document.getElementById("taxitype");
    taxi= taxi.value;
    
    let taxival=0;

    switch(taxi){
        case "Tuk-Tuk":
            taxival=50;
            break;
        case "Mini-Car":
            taxival= 75;
            break;
        case "Luxury-Car":
            taxival=100;
            break;
        case "Luxury-Van":
            taxival=150;
            break;
        case "Luxury-Bus":
            taxival=200;
            break;
        default:
            alert("wrong input")
    }

    let fuel = document.getElementById("Fueltype");
    fuel = fuel.value;

    let fuelval=0;

    switch(fuel){
        case "Medium":
            fuelval=1000;
            break;
        case "High":
            fuelval=2000;
            break;
        case "Low":
            fuelval=500;
            break;
        default:
            alert("wrong input");
    }

    let distance= document.getElementById("Distance").value;
    let stay = document.getElementById("Stay").value;

    let stayval=0;

    switch(stay){
        case "One-Way":
            stayval = taxival*distance;
            break;
        case "Two-Way":
            stayval=2*(taxival*distance);
            break;
        case "Overnight":
            stayval=5000+(2*(taxival*distance));
            break;
        default:
            alert("Error")
        
    }
    document.getElementById("currentcost").value = stayval + fuelval;

 }


 /*-------------------------------------|
 |             Add to order             |
 |-------------------------------------*/

let totalcost = 0;
let ordercount = 0;

function AddToCart() {

    let ordercost = document.getElementById("currentcost").value;
    totalcost = totalcost + parseInt(ordercost);

    document.getElementById("taxi_type_display").value = "";
    document.getElementById("fuel_type_display").value = "";
    document.getElementById("distance_display").value = "";
    document.getElementById("stay_display").value = "";
    document.getElementById("currentcost").value = "";

    let table = document.getElementById("cart");
    let tableLength = table.length;
    let row = table.insertRow(tableLength);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    let taxi = document.getElementById("taxitype").value;
    cell1.innerHTML = taxi;
    cell2.innerHTML = ordercost;
    cell3.innerHTML = '<td><button onclick="RemoveFromCart(this)">Remove</button></td>';

    ordercount += 1;

    document.getElementById("total_cost").innerHTML= totalcost;

}

function RemoveFromCart(row) {

    let rowNum = row.parentNode.parentNode.rowIndex;
    document.getElementById("cart").deleteRow(rowNum);
}

/*---------------------------------|
|         reserve function         |
|---------------------------------*/

function Reserve(){

    alert("Thank you for your order!");
    totalcost = 0;

    if (ordercount >= 4 ) {
        let LoyaltyPointsEarned = ordercount*20;
        sessionStorage.setItem("LoyaltyPoints",LoyaltyPointsEarned.toString());
    }

    location.reload(); // To reset all the inputs.

}

/*----------------------------------|
|            favourites             |
|----------------------------------*/

function AddToFav(){

    let taxi=document.getElementById("taxi_type_display").value;
    let fuel=document.getElementById("fuel_type_display").value;
    let dist=document.getElementById("distance_display").value;
    let stay=document.getElementById("stay_display").value;
    let start=document.getElementById("address_display").value;
    let currentcost=document.getElementById("currentcost").value;

    let favourite = {};
    favourite.taxitype = taxi;
    favourite.fueltype = fuel;
    favourite.distance = dist;
    favourite.stay = stay;
    favourite.start = start;
    favourite.currentcost = currentcost;

    sessionStorage.clear();
    sessionStorage.setItem("order",JSON.stringify(favourite));

    document.getElementById("taxi_type_display").value = "";
    document.getElementById("fuel_type_display").value = "";
    document.getElementById("distance_display").value = "";
    document.getElementById("stay_display").value = "";
    document.getElementById("currentcost").value = "";

}

function OrderFav(){

    let order = sessionStorage.getItem("order");
    let test = JSON.parse(order);

    document.getElementById("taxi_type_display").value = test.taxitype;
    document.getElementById("fuel_type_display").value = test.fueltype;
    document.getElementById("stay_display").value = test.stay;
    document.getElementById("distance_display").value = test.distance;
    document.getElementById("address_display").value = test.start;
    document.getElementById("currentcost").value = test.currentcost;
}

function CheckLoyalty() {

    let LoyaltyBal = sessionStorage.getItem('LoyaltyPoints');
    alert("You have " + LoyaltyBal + " points remaining");
}