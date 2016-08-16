/* let statement to set el as a local variable.  initializing it to document.getElementsByClassName('x').  
el stands for elements. */
let el = document.getElementsByClassName.bind(document);

/* Task 1 */
let inDate = el('date in_date_field quickview_input hasDatepicker')[1]; 
let outDate = el('date out_date_field quickview_input hasDatepicker')[1];
let destination = el('destination quickview_input search_live ui-autocomplete-input')[1];

function printDateAndDestination() {
    console.log('In Date    :', inDate.value);
    console.log('Out Date   :', outDate.value);
    console.log('Destination:', destination.value);
}

/* Needed to create a type of event listener to react to changes in a DOM.  
It runs the script each time a field updates.  MutationObserver is a super 
new thing thats like a specialized event handler. 
Instantiated new DOM mutation observers. */
let observer = new MutationObserver(function(mutations) {
    printDateAndDestination();
});

let config = {
    attributes: true,
    characterData: true
};
observer.observe(inDate, config); //observe inDate element node (1)
observer.observe(outDate, config); //observe outDate element node (1)
observer.observe(destination, config); //observe destination element node (1)

/* Run Once Regardless */
printDateAndDestination();

/* Task 2 */

/*When the function is called: get the number of visible hotels, and the current notice at the top.
If the notice already has "out of", just change the number.  Otherwise, add the "out of" and the number shown */
function changeNumListings() {
    let numShown = el('inner clearfix hotel-info-container').length; 
    let notice = el('listing_summary')[0]; //look for dynamic changes under div class="listing_summary"
    let tmp = notice.innerHTML.split(' '); 
    if (tmp.length === 5) {
        tmp[0] += ' ' + numShown + ' out of';   
    } else {
        tmp[1] = numShown;
    }
    notice.innerHTML = tmp.join(' ');
}

let observer1 = new MutationObserver(function(mutations) {
    changeNumListings();
});

let config1 = {
    attributes: true,
    childList: true,
    characterData: true
};

/* observe changes in the hotel lsitings */
observer1.observe(document.getElementById('hotel_listings'), config1); 

/* Run Once Regardless */
changeNumListings();

/* Task 3 */

var hotelListContain = false; // global variable to determine if div for storing hotels on DOM has been made
var hotelList = new Array(); // global variable to retain information of all selected hotels

function changeSelect(){

    if(!hotelListContain){ // if changeSelect is being run for the first time
        hotelListContain = true; // set to true so when changeSelect is run again on DOM mutation, all event handlers can be applied without accidentially creating another element in the DOM to store hotel names and links

        // create main div to insert into DOM
        var hotelListContainer = document.createElement('div');
        hotelListContainer.setAttribute("id", "hotelListContainer");
        hotelListContainer.setAttribute("class", "module");

        // create header so user can clearly identify where selected hotels will be listed
        var header = document.createElement("h1");
        var headerText = document.createTextNode("Selected Hotels");
        header.appendChild(headerText);

        // create ul element to hold hotel list
        var list = document.createElement('ul');
        list.setAttribute("id", "hotelList");

        // append header and ul to container div and insert aggregate element into DOM
        hotelListContainer.appendChild(header);
        hotelListContainer.appendChild(list);
        document.getElementById('list-view').childNodes[1].insertBefore(hotelListContainer, document.getElementById('list-view').childNodes[1].childNodes[2]);
    }

    // attach event listeners to all select buttons
    let selects = document.querySelectorAll("a.prominent_button.do_show_rates");
    for (var i = selects.length - 1; i >= 0; i--) {
        selects[i].onclick = function(event){
            window.open(event.target, "_blank"); // open link in seperate tab
            var hotel = {name: this.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].innerHTML, href: this.href}; // create hotel object to push into global hotel list array
            if(hotelList.length === 0 || hotelList.find(findHotelName, [hotel.name]) === undefined){ // if hotel list is empty or the selected hotel is not a duplicate
                updateHotelList(hotel); // update hotel list global array and update hotel list on DOM
            }
            return false; // stops the default loading of link
        }
    }
}

function findHotelName(hotel){
    // Search all hotel objects inside global array hotel list for selected hotel
    // name (i.e. checking for duplicates). If a duplicate is found, it will
    // return the duplicate object, and if not, it will return undefined.
    return hotel.name === this[0];
}

function updateHotelList(hotel){
    // update global variables storing all user selected hotels
    // and hotel names, then reproduce list of these hotels inside
    // the DOM
    hotelList.push(hotel);
    document.getElementById("hotelList").innerHTML = ""; // clear previous list
    for (var j = hotelList.length - 1; j >= 0; j--) {
        var listelement = document.createElement("li"); // create list element
        var listlink = document.createElement("a"); // create link element
        listlink.setAttribute("href", hotelList[j].href); // give link element hotel link
        var name = document.createTextNode(hotelList[j].name); // create text with hotel name
        listlink.appendChild(name); // put hotel name inside link element
        listelement.appendChild(listlink); // put link element inside list element
        document.getElementById("hotelList").appendChild(listelement); // add completed list element to ul element at top of page
    }
}

let observer2 = new MutationObserver(function(mutations) {
    changeSelect();
});

let config2 = {
    attributes: true,
    childList: true,
    characterData: true
};

observer2.observe(document.getElementById('hotellist-quickview'), config2);

/* Run Once Regardless */ 
changeSelect();
