
class InputUtil {
    constructor(){
        this.btnType2Action = {};
    }
    /**
     * 
     * @param btnType
     * 0:左键 1:中键 2:右键
     * @param action
     * mouseDown: 按下  mouseUp: 未按下
     */
     handleBoardBtnAction(btnType, action) {
        this.btnType2Action[btnType] = action;
        console.log(`[Input].handleBoardBtnAction, btnType = ${btnType}, action = ${action} `);
    }

    checkBoardBtnClick(btnType) {
        const action = this.btnType2Action[btnType];
        return action == 'mouseDown';
    }
}

export default new InputUtil();