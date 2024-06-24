function toastrSetting(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

toastrSetting()

/**
 * Copy to clipboard
 * @param {String} str 
 */
function copyToClipboard(str){
    const $temp = $("<textarea>");
    // Append the temporary text area element to the body
    $("body").append($temp);
    // Set the value of the temporary text area to the text to be copied
    $temp.val(str).select();
    // Execute the copy command
    document.execCommand("copy");
    $temp.remove();
    toastr.success("Text copied to clipboard!");
}