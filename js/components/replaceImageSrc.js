//================================================= Variables =================================================
const imgSrcReg = /<img\s+[^>]*?src\s*=\s*(["'])([^"]+)\1/g;
const onlyLatSlash = /\/([^\/]+)$/;
let leftEditor;
let rightEditor;
let topEditor;
let topEditorReal;

//================================================= Events =================================================
// $(document).on('input', '#newSrcBox, #box1, #newSrcBoxReal', onReplace)
$(document).on('click', '#btn_copy', onCopy)


//================================================= Functions =================================================
/**
 * ON Replace image
 */
function onReplace(isOnCheck) {
    let newSrc=[];
    if(isOnCheck){
        if($('#mode_check').prop('checked')===true){
            newSrc = getSrc(topEditorReal.getValue())
        }else{
            newSrc = getSrc(topEditor.getValue())
        }
    }else{
        if(topEditorReal.getValue()){
            $('#mode_check').prop('checked', true)
            MODE.setReal();
            //find all img src
            newSrc = getSrc(topEditorReal.getValue())
        }
        else if(topEditor.getValue()){
            $('#mode_check').prop('checked', false)
            MODE.setDev()
            //find all img src
            newSrc = getSrc(topEditor.getValue())
        }
    }
    

    //find all img src
    let old = getSrc(leftEditor.getValue())
    let newValueForRightBox  = leftEditor.getValue();

    old.forEach(old => {
        const fileName = old.match(onlyLatSlash)[1];
        console.log('fileName , ', fileName)
        if(newSrc.some(newSrc => getOnlyNameForNewSrc(newSrc) === fileName)){
            const newSrcStr = newSrc.find(v=> getOnlyNameForNewSrc(v) === fileName);
            newValueForRightBox = newValueForRightBox.replace(old, newSrcStr)
        }
    })

    rightEditor.setValue(newValueForRightBox)
    setModeLooking()
}

/**
 * remote last _ index : image_1_0001.png => image_01.png
 * @param {String} str 
 * @returns 
 */
function getOnlyNameForNewSrc(str){
    return str.match(onlyLatSlash)[1].replace(/_(\d+)(\.\w+)$/, '$2')
}

/**
 * get Src list
 * @param {String} htmlStr 
 * @returns Array
 */
function getSrc(htmlStr) {
    const imageSources = [];
    const match = htmlStr.matchAll(imgSrcReg);

    if (match) {
        for (const m of match) {
            // imageSources.push(m[2].match(onlyLatSlash)[1]);
            imageSources.push(m[2]);
        }
    }
    return imageSources;
}

/**
 * Make mirror editor
 */
function makeEditor(){
    leftEditor  = applyEditor('box1')
    rightEditor = applyEditor('box2')
    topEditor   = applyEditor('newSrcBox')
    topEditorReal = applyEditor('newSrcBoxReal')

    leftEditor.on('change', function() {
        onReplace()
    });
    topEditor.on('change', function() {
        onReplace()
    });
    topEditorReal.on('change', function() {
        onReplace()
    });
}

/**
 * Apply Editor
 * @param {String} id 
 * @returns MirrorEditor
 */
function applyEditor(id){
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        mode: "text/html",
        //theme: "", // You can choose other themes
        matchBrackets: true,
        autoCloseTags: true,
    });
}

/**
 * Copy
 */
function onCopy(){
    const str = rightEditor.getValue()
    if(str){
        copyToClipboard(str);
    }else{
        toastr.error('No data to copy.')
    }
}
