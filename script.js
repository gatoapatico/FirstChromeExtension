let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtnEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtnEl = document.getElementById("delete-btn");
const saveBtnEl = document.getElementById("save-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

saveBtnEl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    })
})

inputBtnEl.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})

deleteBtnEl.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

function render(leads) {
    let listItems = "";
    for(let i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">${leads[i]}</a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}