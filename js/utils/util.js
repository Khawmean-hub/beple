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

function makeShowMoreText(str){
    if(!str){  return ''; }

    return `
<!-- 유의사항 -->
<div class="notice_def" style="background-color:#ffffff;"><!-- 유의사항 펼침/닫힘 시 open 클래스 추가/삭제 -->
<p class="notice_btn"><a>유의사항</a></p>
${makeNotedInner(str)}
</div>
<span style="opacity:0">l</span>`
}

function makeNotedInner(str){
    const regex = /\[([^\]]+)\]/g;
    let list = str.split('\n');
    console.log(list)
    let isFirst = false;
    let result = list.map(v => {
        const matches = v.match(regex);
        if(matches){
            if(!isFirst){
                isFirst = true;
                v = 
`<h2>${v}</h2>
<!-- 기본형 -->
<ul>` 
            }else{
                v = 
`</ul>
<h2>${v}</h2>
<!-- 기본형 -->
<ul>`
            }
        }else if(v){
            v = `<li>${v}</li>`
        }
        return v;
    });

    return result.join('\n') + '</ul>';
}

const attendNoDupEvent = `
 /*
  * event 5월
  * 이벤트 한개만 응모가능(중복응모불가)
  */
  function applyEvt05(eventKey, eventValue, attendMsg1, attendMsg2){
      // DF 값 세팅
      if (ComUtil.isEmpty(eventKey)){
          eventKey = "A";
      }
      if (ComUtil.isEmpty(eventValue)){
          eventValue = "이벤트";
      }
      // set default msg
      if (ComUtil.isNull(attendMsg1)){
          attendMsg1 = "이벤트 응모되었습니다.";
      }
      if (ComUtil.isNull(attendMsg2)){
          attendMsg2 = "이미 응모되었습니다.";
      }
      var jexAjax = jexjs.createAjaxUtil("NOTI_EVT_000003");
      jexAjax.set({
          NOTI_SEQ: now_seq
      });
      jexAjax.execute(function (response){
          if(response.ATTEND_CNT > 0){
          ComPopup.showNotiPop("", attendMsg2 , "1","", "", "", "", "");
          }else{
                  var jexAjax2 = jexjs.createAjaxUtil("NOTI_EVT_000005");
                  jexAjax2.set({
                      NOTI_SEQ: now_seq,
                      CTNT: "Y",
                      EVENT_KEY: eventKey,
                      EVENT_VALUE: eventValue
                  });
                  jexAjax2.setting({"async": false});
                  jexAjax2.execute(function (data){
                      if(jexjs.isJexError(data)){
                          alert(jexjs.getJexErrorMessage(data));
                      }
                      ComPopup.showNotiPop("", attendMsg1 , "1","", "", "", "", "");
                  });
          }
      });
  }
`

const eventFn = {
    externalRedirectFn,
    redirectUnuriFn,
    redirectToOtherEvent,
    marketing,
    attentEvent,
    attendEventNoDup,
    attendEventDup,
    showMoreText
}


function externalRedirectFn(className, url){
    className = className || 'btn_external_link'
    return `
// Redirect external link
$('.${className}').on({
    click: function () {
        var _url = "${url}";
        ComWebkey.callAppActionUrl(ActionCode.ETC_URL, _url);
    }
})`
}

function redirectUnuriFn(className){
    className = className || 'btn_go_to_unuri_page'
    return `
// Go to 온누리상품권 구매하기
$('.${className}').on({
    click : function(){
        location.href = 'zero_gift_pbo_multi.act';
    }
})`
}

function redirectToOtherEvent(className,eventId){
    className = className || 'btn_other_event'
    return `
// Redirect to other event
$('.${className}').on({
    click : function(){
        location.href = 'notice_list.act?seq=${eventId}';
    }
})`
}

function marketing (className){
    className = className || 'btn_marketing_click'
    return `
// Agree Recieve Marketing
$('.${className}').on({
        click : function(){
            setMrktAgrYn('Y')
        }
})`
}

function attentEvent (className, key, value) {
    className = className || 'applyEvt05'
    key         = key || 'A'
    value       = value || '이벤트'
    return attendNoDupEvent + `
// Attend event no dup and normal
$('.${className}').on({
    click : function(){
        applyEvt05('${key}', '${value}');
    }
})`;
}

function attendEventNoDup (className, key, value, url){
    className   = className || 'btn_attend_no_dup' 
    key         = key || 'A'
    value       = value || '이벤트'
    if(url){
        return `
// Attend event no duplicate
$('.${className}').on({
        click : function(){
            var url = '${url}';
            applyEvtAndGo({eventKey: '${key}', eventValue: '${value}', url: url});
        }
})`
    }else{
        return `
// Attend event no duplicate
$('.${className}').on({
        click : function(){
            applyEvtAndGo({eventKey: '${key}', eventValue: '${value}'});
        }
})`
    }
}


function attendEventDup (className, key, value, url){
    className   = className || 'btn_attend_dup' 
    key         = key || 'A'
    value       = value || '이벤트'
    if(url){
        return `
// Attend event with duplicate
$('.${className}').on({
        click : function(){
            var url = '${url}';
            applyEvtCountAndGo({eventKey: '${key}', eventValue: '${value}', url: url});
        }
})`
    }else{
        return `
// Attend event with duplicate
$('.${className}').on({
        click : function(){
            applyEvtCountAndGo({eventKey: '${key}', eventValue: '${value}'});
        }
})`
    }
}


function showMoreText (str){
    return {
        html: makeShowMoreText(str),
        js: `
// Show more text functions
const noticeW = document.querySelector('.notice_def');
const noticeBtn = document.querySelector('.notice_btn a');
noticeBtn.addEventListener('click', (e) => {noticeW.classList.toggle('open')});
        `
    }
}