$(function () {

    $("#leftColumn").resizable({
        handles: 'e',
        resize: function (event, ui) {
            const containerWidth = $("#container").width();
            const leftWidth = ui.size.width;
            const rightWidth = containerWidth - leftWidth;
            $("#rightColumn").width(rightWidth);
        }
    });
    window.currentMode = MODE.DEV;
    setModeLooking()
    makeEditor();
    //Make tab
    $('.menu .item').tab();
	$('.ui.accordion').accordion();
});
