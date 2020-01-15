$(document).ready(function() {

    var previousEntry = localStorage.getItem("entry");

    if (previousEntry != undefined)
    {
        $('#entry').val(previousEntry);
    }

    $('#saveEntry').click(function() {
        localStorage.setItem("entry", $('#entry').val());
        alert("I've saved that for you - open a new tab to see!")
    });

});