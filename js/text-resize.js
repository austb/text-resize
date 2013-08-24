/* Dependencies */

var blueIdPrefix = "bbutton-",
    blueTextClass = "bbutton",
    blueButtonArray = ["This is a button", "Another button", "This button has a lot of text", "This is the fourth button", "Button 5", "Button 6"],
    greenIdPrefix = "gbutton-",
    greenTextClass = "gbutton",
    greenButtonArray = ["This is a button", "Another button", "This button has a lot of text", "This is the fourth button", "Button 5", "Button 6"];
    
/* End of Dependencies */

/*
    Edit this function to include all the sets of buttons defines in the Dependencies
*/
function LoadButtons() {
    var htmlStr = "";
    
    // Adds blue buttons
    htmlStr += "<div class='buttonGroup'>";
    for(var i = 0; i < blueButtonArray.length; i++) {
        htmlStr += "<label class='buttonLabel blue' for='" + blueIdPrefix + i + "'><span id='" + blueIdPrefix + i + "' class='" + blueTextClass + "'>" + blueButtonArray[i] + "</span></label>"
    }
    htmlStr += "</div>";
    
    // Adds green buttons
    htmlStr += "<div class='buttonGroup'>";
    for(var i = 0; i < greenButtonArray.length; i++) {
        htmlStr += "<label class='buttonLabel green' for='" + greenIdPrefix + i + "'><span id='" + greenIdPrefix + i + "' class='" + greenTextClass + "'>" + greenButtonArray[i] + "</span></label>"
    }
    htmlStr += "</div>";
    
    $("#dContent").html(htmlStr); // Adds the buttons to the <div>
    
    styleText(blueButtonArray, blueIdPrefix, blueTextClass);
    styleText(greenButtonArray, greenIdPrefix, greenTextClass);
}

/*
    The selectLongest(array) function takes an array of strings and selects the longest one.
    This element will be used to determine the font-size of the rest of the elements.
    This allows all the text to fit inside their parent elements and be the same size.
*/
function selectLongest(array) {
    var longestLabel = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].length > array[longestLabel].length) {
            longestLabel = i;
        }
    }
    return longestLabel;
}

/*
    The resize text function increases the text size until the textSize reaches its maximum size
*/
function resizeText(inside, outside) {
    console.log(inside);
    var textSize = inside.css("font-size");
    console.log(textSize);
    inside.css("line-height", textSize);
    textSize = parseInt(textSize.replace("px", ""), 10);
    while (textSize < outside.height() - (outside.height() * 0.2) && inside.width() < outside.width() - (outside.width() * 0.2)) {
        textSize ++;
        inside.css("font-size", textSize);
    }
    return textSize;
}

/*
    This centers the text vertically so the text appears in the center of the label
*/
function centerTextVertical(smaller, larger) {
    smaller.css("line-height", smaller.css("font-size"));
    var heightDiff = larger.height() - smaller.height();
    smaller.css("margin-top", heightDiff / 2);
}

/*
    This runs the above three functions in the correct way to resize the text appropriately
*/
function styleText(array, prefix, textClass) {
    var arrayLoc, textSize;
    $("." + textClass).css("font-size", "2px");
    $("." + textClass).css("line-height", $("." + textClass).css("font-size"));
    
    arrayLoc = selectLongest(array);
    textSize = resizeText($("#" + prefix + arrayLoc), $("label[for='" + prefix + arrayLoc + "']"));
    for (var i = 0; i < array.length; i++) {
        $("#" + prefix + i).css("font-size", textSize);
        centerTextVertical($("#" + prefix + i), $("label[for='" + prefix + i + "']"));
    }
}

/*

*/
$(document).ready(function() {
    
    LoadButtons();
    
    // Add all buttons so they change size when the window resizes
    $(window).resize(function(){
        styleText(blueButtonArray, blueIdPrefix, blueTextClass);
        styleText(greenButtonArray, greenIdPrefix, greenTextClass);
    });
    
    $(".buttonLabel").click(function(e) {
        e.preventDefault();
        window.alert("You click the button \"" + $(this).children(0).text() + "\"");
    })
});