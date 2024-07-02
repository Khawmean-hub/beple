// ==================================================== Events ===============================================
$(document).on('click', '#btn_show_functions_modal', onShowFunctionsModal)
$(document).on('input', '#show_more_text_input', onInputShowMore)
$(document).on('click', '#btn_add_show_more', onAddShowMore)
$(document).on('click', '#btn_add_show_clear', onShowMoreClear)
$(document).on('input', '#attend_with_dup input', onAttendWithDup)
$(document).on('click', '#btn_add_attend_event_with_duplicate', onAddAttendWithDup)
$(document).on('click', '#btn_add_attend_event_with_duplicate_clear', onAddAttendWithDupClear)
$(document).on('input', '#attend_no_dup input', onAttendnoDup)
$(document).on('click', '#btn_add_attend_event_no_duplicate', onAddAttendnoDup)
$(document).on('click', '#btn_add_attend_event_no_duplicate_clear', onAddAttendnoDupClear)
$(document).on('input', '#attend_no_dup_normal input', onAttendnoDupNormal)
$(document).on('click', '#btn_add_attend_event_no_duplicate_normal', onAddAttendnoDupNormal)
$(document).on('click', '#btn_add_attend_event_no_duplicate_normal_clear', onAddAttendnoDupNormalClear)
$(document).on('input', '#marketing_input', onInputMarketing)
$(document).on('click', '#marketing_add', onAddMarketing)
$(document).on('click', '#marketing_clear', onClearMarketingForm)
$(document).on('input', '#go_event input', onGoEvent)
$(document).on('click', '#go_event_clear', goEventClear)
$(document).on('click', '#go_event_add', goEventAdd)
$(document).on('input', '#go_unuri_input', onGoUnuriPage)
$(document).on('click', '#go_unuri_clear', goUnuriClear)
$(document).on('click', '#go_unuri_add', goUnuriAdd)
$(document).on('input', '#external_link input', onExternalLink)
$(document).on('click', '#external_link_clear', externalLinkClear)
$(document).on('click', '#external_link_add',externalLinkAdd)


//====================================================== Functions ================================================

function onShowFunctionsModal(){
    $('#add_event_modal').modal('setting', 'closable', false).modal('show')
}

function appendScriptBox(str){
    let jsValue = scriptBox.getValue()
    jsValue += '\n\n'+ str
    scriptBox.setValue(jsValue)
}


// -------------------- Show more text
function onInputShowMore(){
    const text = $(this).val()
    if(text){
        const res = eventFn.showMoreText(text);
        previewBox.setValue(res.html +'\n\n //JavaScript'+ res.js)
    }else{
        previewBox.setValue('')
    }
}

function onAddShowMore(){
    const text = $('#show_more_text_input').val()
    if(text){
        const res = eventFn.showMoreText(text);
        let value = leftEditor.getValue();
        value += '\n\n'+ res.html;
        leftEditor.setValue(value)

        appendScriptBox(res.js)

        onShowMoreClear();
        toastr.success(MSG.ADD_SUCCESS)
    }else{
        toastr.error(MSG.INPUT_EMPTY)
    }
}

function onShowMoreClear(){
    previewBox.setValue('')
    $('#show_more_text_input').val('')
}


// -------------------- Attend Event with duplicate
function getValueAttednWithDup(){
    const className = $('#att_dup_class').val();
    const key = $('#att_dup_key').val();
    const value = $('#att_dup_value').val();
    const url = $('#att_dup_url').val();
    return eventFn.attendEventDup(className, key, value, url);
}
function onAttendWithDup(){
    previewBox.setValue(getValueAttednWithDup())
}

function onAddAttendWithDup(){
    appendScriptBox(getValueAttednWithDup())
    toastr.success(MSG.ADD_SUCCESS)
    onAddAttendWithDupClear()
}

function onAddAttendWithDupClear(){
    previewBox.setValue('')
    $('#attend_with_dup input').val('')
}

// -------------------- Attend Event no duplicate
function getValueAttednnoDup(){
    const className = $('#att_no_dup_class').val();
    const key = $('#att_no_dup_key').val();
    const value = $('#att_no_dup_value').val();
    const url = $('#att_no_dup_url').val();
    return eventFn.attendEventNoDup(className, key, value, url);
}
function onAttendnoDup(){
    previewBox.setValue(getValueAttednnoDup())
}

function onAddAttendnoDup(){
    appendScriptBox(getValueAttednnoDup())
    toastr.success(MSG.ADD_SUCCESS)
    onAddAttendnoDupClear()
}

function onAddAttendnoDupClear(){
    previewBox.setValue('')
    $('#attend_no_dup input').val('')
}

// -------------------- Attend Event no duplicate normal
function getValueAttednnoDupNormal(){
    const className = $('#att_no_dup_normal_class').val();
    const key = $('#att_no_dup_normal_key').val();
    const value = $('#att_no_dup_normal_value').val();
    return eventFn.attentEvent(className, key, value)
}
function onAttendnoDupNormal(){
    previewBox.setValue(getValueAttednnoDupNormal())
}

function onAddAttendnoDupNormal(){
    appendScriptBox(getValueAttednnoDupNormal())
    toastr.success(MSG.ADD_SUCCESS)
    onAddAttendnoDupNormalClear()
}

function onAddAttendnoDupNormalClear(){
    previewBox.setValue('')
    $('#attend_no_dup_normal input').val('')
}


// -------------------- Agree Recieve Marketing
function onInputMarketing(){
    const marketing = $('#marketing_input').val();
    previewBox.setValue(eventFn.marketing(marketing))
}

function onAddMarketing(){
    const marketing = $('#marketing_input').val();
    appendScriptBox(eventFn.marketing(marketing))
    toastr.success(MSG.ADD_SUCCESS)
    onClearMarketingForm();
}

function onClearMarketingForm(){
    $('#marketing_input').val('')
    previewBox.setValue('')
}

// -------------------- Redirect to other event
function getGoEventValue(){
    const className = $('#go_event_class').val()
    const eventId = $('#go_event_seq').val()
    if(eventId){
        $('.go_event_seq').removeClass('error')
        return eventFn.redirectToOtherEvent(className, eventId)
    }else{
        $('.go_event_seq').addClass('error')
        toastr.error(MSG.MEET_REQUIREMENT)
    }
}
function onGoEvent (){
    const value = getGoEventValue()
    previewBox.setValue(value)
}

function goEventAdd(){
    const value = getGoEventValue();
    if(value){
        appendScriptBox(value)
        toastr.success(MSG.ADD_SUCCESS)
        goEventClear()
    }
}

function goEventClear(){
    $('#go_event_class').val('')
    $('#go_event_seq').val('')
    previewBox.setValue('')
    $('.go_event_seq').removeClass('error')
}



// -------------------- Go to unuri page
function onGoUnuriPage (){
    const className = $(this).val()
    previewBox.setValue(eventFn.redirectUnuriFn(className))
}

function goUnuriClear(){
    $('#go_unuri_input').val('')
    previewBox.setValue('')
}

function goUnuriAdd(){
    const className = $('#go_unuri_input').val()
    appendScriptBox(eventFn.redirectUnuriFn(className))
    toastr.success(MSG.ADD_SUCCESS)
    goUnuriClear()
}

// -------------------- Redirect external link

function getExternalLinkValue(){
    const className = $('#external_link_input').val()
    const url = $('#external_link_url').val()
    if(url){
        $('.external_link_url').removeClass('error')
        return eventFn.externalRedirectFn(className, url)
    }else{
        $('.external_link_url').addClass('error')
        toastr.error(MSG.MEET_REQUIREMENT)
    }
}
function onExternalLink (){
    previewBox.setValue(getExternalLinkValue())
}

function externalLinkAdd(){
    const value = getExternalLinkValue();
    if(value){
        appendScriptBox(value)
        toastr.success(MSG.ADD_SUCCESS)
        externalLinkClear()
    }
}

function externalLinkClear(){
    $('#external_link_input').val('')
    $('#external_link_url').val('')
    previewBox.setValue('')
    $('.external_link_url').removeClass('error')
}