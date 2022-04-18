const stateAbbreviations = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
];
const checkboxElements = ["#newspaper", "#duckduckgo", "#friend"]


function initValidation(formName) {
    
    let $form = $(formName);
    /*
    $('form :input').change(function(ev){
        validateForm();
        if(!this.checkValidity())
            $(this).addClass("was-validated")
    });
    */
    

    $form.submit(function(event){
        $form = $(this);
        formEl=$form.get(0);

        event.preventDefault();
        event.stopPropagation();

        validateForm();

        if (!formEl.checkValidity()){
            $(":input").addClass("was-validated")
        }
        else{
            $("#thankYouPage").show();
            $("#logVisit").hide();
        }
    });
}

function validateForm() {
    var foundInvalid = false;
    var validatedState = false;
    $('#vForm li').each(function(index, val) {

        if ($(val).children('#state').length > 0) {
            if (!validateState("#state", "You must enter a valid two character state code, e.g., UT")) {
                validatedState = true;
                return false;
            }
        }
        else if ($(val).children('input').val() == '') {
            foundInvalid = true;
            $(val).children('.errorMsg').show();
            return false;
        }
        else {
            $(val).find('.errorMsg').hide();

        }
    });
    
    if (!validatedState)
        validateState("#state", "You must enter a valid two character state code, e.g., UT", false);
      /*note, to validate the group, just passing in id of one of them ("#newspaper"), we will use groupName to check status of group.  Just call setElementValidity on the '#newspaper' element to show the error message*/
    
    validateCheckboxGroup(checkboxElements, "find-page", "you must select at least one!");

}

//Fin
function validateState(id, msg, add=true){
    $el = $(id);
    let valid=false;

    valid = stateAbbreviations.indexOf($el.val().toUpperCase()) != -1;
    setElementValidity(id, valid, msg, add);
    return valid;
}

function validateCheckboxGroup(fieldName, groupName, message) {
    let valid = false;

    //TODO
    //Validate whether any of the checkboxes are checked. set 'valid' to true if checked
    
    $.each(fieldName, function(index, value) {
        if ($(value).is(":checked")) {
            valid = true;
        }
    });
    
    setElementValidity(fieldName[0], valid, message);
}

function setElementValidity(fieldName, valid, message, add=true){
    let $field=$(fieldName);
    let el = $field.get(0);
    if (valid) { //it has a value
        el.setCustomValidity(''); //sets to no error message and field is valid
        $field.parent().find('.errorMsg').hide();
        
        //Remove error message
    } else {
        el.setCustomValidity(message); //sets error message and field gets 'invalid' stat
        //Add error message
        if (add)
            $field.parent().find('.errorMsg').show();
    }
    //TODO  insert or remove message in error div for element
}