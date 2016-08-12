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

/* observe changes in the hotel listings */
observer1.observe(document.getElementById('hotel_listings'), config1); 

/* Run Once Regardless */
changeNumListings();
