const devColor = 'teal';
const realColor = 'orange';

$(document).on('change', '#mode_check', onChangeMode)

/**
 * Set mode ui
 */
function setModeLooking(){
    if(MODE.isDev()){
        setCss(devColor)
        $('#btn_copy').addClass(devColor).removeClass(realColor)
        $('#mode_txt').text(MODE.DEV)
        $('#mode_check').val(false)
    }else{
        setCss(realColor)
        $('#btn_copy').addClass(realColor).removeClass(devColor)
        $('#mode_txt').text(MODE.REAL)
        $('#mode_check').val(true)
    }
}

function setCss(color){
    //Nav bar
    $('.my_nav_bar').css('background', color)
}


function onChangeMode(){
    if($('#mode_check').prop('checked')){
        MODE.setReal()
    }else{
        MODE.setDev()
    }
    setModeLooking()
    onReplace(true)
}