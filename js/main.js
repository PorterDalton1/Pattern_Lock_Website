//Initial place for animated pill 
let pos = 9;

var id=null;
var theme = "white";

$(".errorMsg").hide()

//Toggles between the 4 website themes
function toggleTheme()
{
    if (theme === "white")
    {        
        $("#lightTheme").width( 25 );
        $("#lightTheme").height( 25 );

        $('link[rel="stylesheet"][href="./css/darktheme.css"]').attr('disabled', 'disabled');
        theme = "black";
    } else { // if (theme === "black") {
        //Resize the circles to show which one is active
        $("#darkTheme").width( 25 );
        $("#darkTheme").height( 25 );
        $("#lightTheme").width( 20 );
        $("#lightTheme").height( 20 );

        //Only activate the style being used
        $('link[rel="stylesheet"][href="./css/darktheme.css"]').removeAttr('disabled');
        theme = "white";
    }
}
toggleTheme()

//Function that animates the pill across the top of the screen
function animateTo(option, from)
{
    let stopAt = 0;
    if (option === 1)
    {
        stopAt = 9;
    }
    if (option === 2)
    {
        stopAt = 32.2;
    }
    if (option === 3)
    {
        stopAt = 57.1;
    }
    if (option === 4)
    {
        stopAt = 83.8;
    }
    let direction = stopAt >= pos;

    var pill = document.getElementById("pill");
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame()
    {
        if (direction) //Move to the left 
        {
            if (pos >= stopAt)
            {
                pill.style.left = stopAt.toString() + "%" 
                clearInterval(id);
            } else {
                pos += 1;
                pill.style.left = pos + "%";
            }
        } else { //Move to the right
            if (pos <= stopAt)
            {
                pill.style.left = stopAt.toString() + "%" 
                clearInterval(id);
            } else {
                pos -= 1;
                pill.style.left = pos + "%";
            }
        }
    }
}

/*
let menuPage = document.getElementById("menuPage");
let rules = document.getElementById("rules");
let code = document.getElementById("algorithm")
let display = document.getElementById("display");
let page = document.getElementsByClassName("page");
*/
//These next 4 functions work with navigating the website
function openMenu()
{
    animateTo(1);
    $("#menuPage").show();
    rules.setAttribute("style", "display:none !important"); //This won't work otherwise ¯\_(ツ)_/¯
    $("#algorithm").hide();
    $("#display").hide();
}

function openRules()
{
    animateTo(2);
    $("#menuPage").hide();
    $("#rules").show();
    $("#algorithm").hide();
    $("#display").hide();
    
}

function openAlgorithm()
{
    animateTo(3);
    $("#menuPage").hide();
    rules.setAttribute("style", "display:none !important"); //This won't work otherwise ¯\_(ツ)_/¯
    $("#algorithm").show();
    $("#display").hide();
    
}

function openForm()
{
    $("#menuPage").hide();
    rules.setAttribute("style", "display:none !important"); //This won't work otherwise ¯\_(ツ)_/¯
    $("#algorithm").hide();
    $("#display").hide();
    $("#logVisit").show();
    
}

function openRunIt()
{
    animateTo(4);
    $("#menuPage").hide();
    rules.setAttribute("style", "display:none !important"); //This won't work otherwise ¯\_(ツ)_/¯
    $("#algorithm").hide();
    $("#display").show();
    
}
//These next 3 sections are for numbering the code blocks----------------------
let newDivLettering = [];
for (let i = 0; i < 23; i++) {
    newDivLettering.push(document.createElement("div"))
    newDivLettering[i].innerHTML = (i+1).toString();
    document.getElementById("codeNumbering1").appendChild(newDivLettering[i]);
}

let newDivLettering2 = [];
for (let i = 0; i < 11; i++) {
    newDivLettering2.push(document.createElement("div"))
    newDivLettering2[i].innerHTML = (i+1).toString();
    document.getElementById("codeNumbering2").appendChild(newDivLettering2[i]);
}

let newDivLettering3 = [];
for (let i = 0; i < 22; i++) {
    newDivLettering3.push(document.createElement("div"))
    newDivLettering3[i].innerHTML = (i+1).toString();
    document.getElementById("codeNumbering3").appendChild(newDivLettering3[i]);
}
//-------------------------------------------------------------------------------

openMenu(); //Initial position for the pill and the homepage


//These next sessions were used in the examples and to calculate the formulas--------
function pointInArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++){
        if (arr2[i][0] == arr1[0] && arr2[i][1] == arr1[1])
        {return true;}
    }
    return false;
}
function canGo(toPoint, instructions) {
    let fromPoint = instructions[instructions.length-1];
    //Make sure we haven't 
        if (pointInArray(toPoint, instructions))
        {return false;}
    //Get midpoint
    let tmpX = (fromPoint[0] + toPoint[0]) / 2;
    let tmpY = (fromPoint[1] + toPoint[1]) / 2;

    //Make sure the midpoint values are whole numbers
    if (tmpX === Math.floor(tmpX) && tmpY === Math.floor(tmpY)){
        //If the midpoint is not taken
        if (!pointInArray([tmpX, tmpY], instructions))
        {return false;}
    }
    return true;
}

function getPoints(instructions) {
    let tmpArray = [];
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            if (canGo([x, y], instructions)){
                tmpArray.push([x, y]);
            }
        }
    }
    return tmpArray;
}

let totalCombinations = [];
function bruteforce_helper(instructions){
    let cyclePoints = getPoints(instructions);
    if (instructions.length > 3) {
        totalCombinations.push(instructions.slice());
    }
    for (let i = 0; i < cyclePoints.length; i++) {
        instructions.push(cyclePoints[i]);
        bruteforce_helper(instructions);
        instructions.pop();
    }
    //Base case, returns if length is 9 or done cycling through cyclePoints
    return
}
function bruteforce() {
    for (let x = 0; x < 3; x++){
        for (let y = 0; y < 3; y++){
            bruteforce_helper([[x, y]])
        }
    }
}
bruteforce()
//console.log(totalCombinations.length);
//------------------------------------------------------------------------------------------------

//Used to take in a list of coordinates and make them display better on a screen.
//[[0,0], [0, 1], [1, 1]] into [0, 0] => [0, 1] => [1, 1]
function setBetterLayout(listFun)
{
    tmpStr = "";
    for (let i = 0; i < listFun.length; i++)
    {
        tmpStr += "(";
        tmpStr += listFun[i][0].toString();
        tmpStr += ", ";
        tmpStr += listFun[i][1].toString();
        tmpStr += ")";
        if (i !== (listFun.length-1))
        {
            tmpStr += " => ";
        }
    }
    return tmpStr;
}


function openImages(fileNames) {
    $("#displayPatterns img").remove();
    for (var i = 0; i < fileNames.length; i+=2)
    {
        part1 = fileNames[i].toString() + fileNames[i+1].toString();
        part2 = fileNames[i+2].toString() + fileNames[i+3].toString();
        $( "#displayPatterns" ).append( '<img src="./img/patterns/' + part1 + '_' + part2 + '.png">' );
        if (i + 5 == fileNames.length)
        {
            break;
        }
    }
}


//This function displays the instructions on patternList
function fillCombos(start, stop) {
    while (document.getElementById("patternList").firstChild){
        document.getElementById("patternList").removeChild(document.getElementById("patternList").firstChild);
    }
    let counter = 0;
    let tmpStart = start + 1;
    let tmpCombos = [];
    let ulItem = document.createElement("ol");
    ulItem.setAttribute("start", tmpStart.toString());
    for (let i = start; i < stop; i++)
    {
        tmpCombos.push(document.createElement("li"));
        tmpButton = document.createElement("button");
        tmpButton.innerHTML = setBetterLayout(totalCombinations[i]);
        tmpButton.setAttribute("onclick", "openImages([" + totalCombinations[i] + "])");
        tmpCombos[counter].appendChild(tmpButton);
        ulItem.appendChild(tmpCombos[counter]);
        counter += 1;
    }
    document.getElementById("patternList").appendChild(ulItem);
}

//This creates all the buttons that you can pick between to display the values
function createComboButtons(){
    let tmp = 0;
    tmpButtons = [];
    let numButtons = 186;
    let numRange = 389112 / numButtons;
    for (let i = 0; i < numButtons; i++)
    {
        tmp = numRange * i;
        tmpButtons.push(document.createElement("button"))
        tmpButtons[i].innerHTML = (tmp+1).toString() + "-" + (numRange * (i+1)).toString();
        tmpButtons[i].setAttribute("onclick", "fillCombos("+(tmp).toString()+", "+(numRange*(i+1)).toString()+")");
        document.getElementById("buttonList").appendChild(tmpButtons[i]);
    }
}
createComboButtons();