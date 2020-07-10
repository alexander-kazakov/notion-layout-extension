var isshown=false

var modifyComments = function(){
    console.log("Notion Layout Extension: Document changed");
    var target = document.querySelector(".notion-scroller.vertical > div:nth-child(2)[style='width: 100%; font-size: 14px;']");
    if (target) {

        let abutton = document.createElement("button");
        abutton.innerHTML = "-";
        abutton.style.fontSize = "4px";
        abutton.style.border = "none";
        abutton.style.width = "100%";
        abutton.id = "myButton";
        abutton.onclick = function(){
            console.log("Notion Layout Extension: Button clicked");
            if (isshown){
                target.style.height = 0;
                target.style.display = "none";
                isshown = false
            }
            else {
                target.style.height = null;
                target.style.display = null;
                isshown = true
            }
        }

        if (!document.getElementById("myButton")){
            let parentDiv = target.parentNode
            var content = document.querySelector(".notion-page-controls").parentElement
            content.appendChild(abutton)

            target.style.height = 0;
            target.style.display = "none";
        }
    }
}

// Select the node that will be observed for mutations
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = {attributes: false, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(modifyComments);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);