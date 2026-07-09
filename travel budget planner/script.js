// =============================
// TRIP PLANNER
// =============================

function saveTrip() {

    let destination = document.getElementById("destination").value.trim();
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let travelers = document.getElementById("travelers").value;
    let transport = document.getElementById("transport").value;
    let budget = document.getElementById("budget").value;

    // Validation
    if (
        destination === "" ||
        startDate === "" ||
        endDate === "" ||
        travelers === "" ||
        budget === "" ||
        transport === "Select Transport"
    ) {
        alert("Please fill in all the fields.");
        return;
    }

    // Date Validation
    if (endDate < startDate) {
        alert("End Date cannot be earlier than Start Date.");
        return;
    }

    // Display Trip Details
    document.getElementById("tripResult").innerHTML = `
        <h3>🌍 ${destination}</h3>
        <p><b>Start Date:</b> ${startDate}</p>
        <p><b>End Date:</b> ${endDate}</p>
        <p><b>Travelers:</b> ${travelers}</p>
        <p><b>Transport:</b> ${transport}</p>
        <p><b>Estimated Budget:</b> ₹${budget}</p>
    `;
 // Save trip to Local Storage

const trip = {
    destination,
    startDate,
    endDate,
    travelers,
    transport,
    budget
};

localStorage.setItem("tripData", JSON.stringify(trip)); 
updateDashboard();  
}


// =============================
// BUDGET CALCULATOR
// =============================

function calculateBudget() {

    let hotel = Number(document.getElementById("hotel").value);
    let food = Number(document.getElementById("food").value);
    let transport = Number(document.getElementById("transportCost").value);
    let shopping = Number(document.getElementById("shopping").value);
    let others = Number(document.getElementById("others").value);

    let total = hotel + food + transport + shopping + others;

    document.getElementById("budgetResult").innerHTML =
        `<h3>Total Budget: ₹${total}</h3>`;
}


// =============================
// EXPENSE TRACKER
// =============================

let totalExpense = 0;
{
    {
function addExpense(){

    let expenseName = document.getElementById("expenseName").value.trim();

    let expenseAmount = Number(document.getElementById("expenseAmount").value);

    if(expenseName==="" || expenseAmount<=0){

        alert("Please enter valid details.");

        return;

    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push({

        name:expenseName,

        amount:expenseAmount

    });

    localStorage.setItem("expenses",JSON.stringify(expenses));

    displayExpenses();
    updateDashboard();

    document.getElementById("expenseName").value="";

    document.getElementById("expenseAmount").value="";

}
    // =============================
// PACKING CHECKLIST
// =============================

function addItem(){

    let item = document.getElementById("packingItem").value.trim();

    if(item === ""){
        alert("Please enter an item.");
        return;
    }

    let items = JSON.parse(localStorage.getItem("packingItems")) || [];

    items.push({
        name: item,
        packed: false
    });

    localStorage.setItem("packingItems", JSON.stringify(items));

    displayPackingItems();
    updateDashboard();

    document.getElementById("packingItem").value = "";
}  
function displayPackingItems(){

    let items = JSON.parse(localStorage.getItem("packingItems")) || [];

    let list = document.getElementById("packingList");

    list.innerHTML = "";

    items.forEach((item,index)=>{

        let li=document.createElement("li");

        li.innerHTML=`
            <span
            class="${item.packed ? "packed":""}"
            onclick="togglePacked(${index})">

            ${item.name}

            </span>

            <button onclick="deleteItem(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);

    });

}

}

function deleteItem(index){

    let items = JSON.parse(localStorage.getItem("packingItems")) || [];

    items.splice(index,1);

    localStorage.setItem("packingItems", JSON.stringify(items));

    displayPackingItems();
    updateDashboard();

}
function togglePacked(index){

    let items = JSON.parse(localStorage.getItem("packingItems")) || [];

    items[index].packed = !items[index].packed;

    localStorage.setItem("packingItems", JSON.stringify(items));

    displayPackingItems();
    updateDashboard();

}

// =============================
// DARK MODE
// =============================

function toggleTheme(){

    document.body.classList.toggle("dark-mode");

    let button = document.querySelector(".theme-btn");

    if(document.body.classList.contains("dark-mode")){

        button.innerHTML = "☀️ Light Mode";

    }else{

        button.innerHTML = "🌙 Dark Mode";

    }

}
// =============================
// LOAD SAVED TRIP
// =============================

function loadTrip(){

    const savedTrip = localStorage.getItem("tripData");

    if(savedTrip){

        const trip = JSON.parse(savedTrip);

        document.getElementById("tripResult").innerHTML = `
            <h3>🌍 ${trip.destination}</h3>
            <p><b>Start Date:</b> ${trip.startDate}</p>
            <p><b>End Date:</b> ${trip.endDate}</p>
            <p><b>Travelers:</b> ${trip.travelers}</p>
            <p><b>Transport:</b> ${trip.transport}</p>
            <p><b>Estimated Budget:</b> ₹${trip.budget}</p>
        `;
    }

}
window.onload=function(){

    loadTrip();

    displayPackingItems();

    displayExpenses();

    updateDashboard();

}
;
function displayExpenses(){

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let table=document.getElementById("expenseBody");

    table.innerHTML="";

    let total=0;

    expenses.forEach(expense=>{

        let row=table.insertRow();

        row.insertCell(0).innerHTML=expense.name;

        row.insertCell(1).innerHTML="₹"+expense.amount;

        total+=expense.amount;

    });

    document.getElementById("expenseTotal").innerHTML="₹"+total;

}
// =============================
// DASHBOARD
// =============================

function updateDashboard(){

    // Trip

    let trip = JSON.parse(localStorage.getItem("tripData"));

    if(trip){

        document.getElementById("tripCount").innerHTML = "1";

        document.getElementById("budgetTotal").innerHTML =
        "₹" + trip.budget;

    }

    // Expenses

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let expenseTotal = 0;

    expenses.forEach(expense=>{

        expenseTotal += expense.amount;

    });

    document.getElementById("expenseCount").innerHTML =
    "₹" + expenseTotal;

    // Packing

    let packing = JSON.parse(localStorage.getItem("packingItems")) || [];

    document.getElementById("packingCount").innerHTML =
    packing.length;

}
// =============================
// SCROLL TO TOP
// =============================

window.onscroll=function(){

    let button=document.getElementById("topBtn");

    if(document.body.scrollTop>300 || document.documentElement.scrollTop>300){

        button.style.display="block";

    }else{

        button.style.display="none";

    }

}

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
// =============================
// CLEAR BUDGET
// =============================

function clearBudget(){

    document.getElementById("hotel").value="";

    document.getElementById("food").value="";

    document.getElementById("transportCost").value="";

    document.getElementById("shopping").value="";

    document.getElementById("others").value="";

    document.getElementById("budgetResult").innerHTML=
    "Total Budget: ₹0";

}
// =============================
// CLEAR EXPENSES
// =============================

function clearExpenses(){

    if(confirm("Delete all expenses?")){

        localStorage.removeItem("expenses");

        displayExpenses();

        updateDashboard();

    }

}
// =============================
// CLEAR PACKING
// =============================

function clearPacking(){

    if(confirm("Delete all packing items?")){

        localStorage.removeItem("packingItems");

        displayPackingItems();

        updateDashboard();

    }

}
}