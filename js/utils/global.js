const MODE = {
    DEV: 'DEV',
    REAL: 'REAL',
    isDev: ()=> window.currentMode === MODE.DEV,
    isReal: ()=> window.currentMode === MODE.REAL,
    setReal: ()=> window.currentMode = MODE.REAL,
    setDev: ()=> window.currentMode = MODE.DEV,
    getMode: ()=> window.currentMode ? window.currentMode : MODE.DEV,
    setMode: (mode) => window.currentMode = mode,
}


const FN = {
    MORE_TEXT: 'MORE_TEXT',

}

const MSG = {
    ADD_SUCCESS: 'Add successfully.',
    INPUT_EMPTY: 'Input empty.',
    MEET_REQUIREMENT: 'Need requirement'
}