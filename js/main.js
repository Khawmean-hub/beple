$(function () {
    $("#leftColumn").resizable({
        handles: 'e',
        resize: function (event, ui) {
            var containerWidth = $("#container").width();
            var leftWidth = ui.size.width;
            var rightWidth = containerWidth - leftWidth;
            $("#rightColumn").width(rightWidth);
        }
    });
    window.currentMode = MODE.DEV;
    setModeLooking()
    makeEditor();

    $('.menu .item')
        .tab()
        ;
});