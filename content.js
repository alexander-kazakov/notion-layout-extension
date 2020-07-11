var isshown=false

// This function is called any time something new loads inside Notion window
// e.g. you navigate to a new page
var onPageChange = function(){
    console.log("Extension: Page changed");

    // Find the block with properties list
    var propertiesLists = document.querySelectorAll(".notion-scroller.vertical > div:nth-child(2)[style='width: 100%; font-size: 14px;']");

    propertiesLists.forEach(function(propertiesList){
        console.log("Found properties list");

        // Set up the toggle button
        let toggleButton = document.createElement("button");
        toggleButton.innerHTML = "-";
        toggleButton.style.fontSize = "4px";
        toggleButton.style.border = "none";
        toggleButton.style.width = "100%";
        toggleButton.id = "toggleButton";
        toggleButton.onclick = function(){
            console.log("Extension: Button clicked");
            if (isshown){
                // Hide properties list section
                propertiesList.style.height = 0;
                propertiesList.style.display = "none";
                isshown = false
            }
            else {
                // Show properties list section
                propertiesList.style.height = null;
                propertiesList.style.display = null;
                isshown = true
            }
        }

        // If not already processed this properties list,
        // add the toggle button and hide the list
        if (!(propertiesList.id === "already_processed")){
            console.log("Processing new properties list");
            var parentBlockForButton = propertiesList.parentElement.firstChild.firstChild
            parentBlockForButton.appendChild(toggleButton)

            propertiesList.style.height = 0;
            propertiesList.style.display = "none";
            propertiesList.id = "already_processed";
        }
    })
}


// This calls onPageChange function each time Notion window changes
// e.g. you navigate to a new Notion page
const targetNode = document.body;
const config = {attributes: false, childList: true, subtree: true };
const observer = new MutationObserver(onPageChange);
observer.observe(targetNode, config);