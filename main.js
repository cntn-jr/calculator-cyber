'use strict';
{

    const one = document.getElementById('one')
    const two = document.getElementById('two')
    const three = document.getElementById('three')
    const four = document.getElementById('four')
    const five = document.getElementById('five')
    const six = document.getElementById('six')
    const seven = document.getElementById('seven')
    const eight = document.getElementById('eight')
    const nine = document.getElementById('nine')
    const zero = document.getElementById('zero')
    const doubleZero = document.getElementById('double-zero')
    const plus = document.getElementById('plus')
    const minus = document.getElementById('minus')
    const multiply = document.getElementById('multiply')
    const divide = document.getElementById('divide')
    const clear = document.getElementById('clear')
    const reverse = document.getElementById('reverse')
    const percent = document.getElementById('percent')
    const dot = document.getElementById('dot')
    const equal = document.getElementById('equal')
    const result = document.getElementById('result')
    const processTable = document.getElementById('process-table')

    //計算過程を保存するリスト
    const processList = []
    const allProcessList = []
    let resultText = ''

    const numberList = [zero, one, two, three, four, five, six, seven, eight, nine]
    const operationList = {
        'pl':plus,
        'mn':minus,
        'ml':multiply,
        'dv':divide,
    }


    //数字のボタンを押したときの処理
    numberList.forEach(num => {
        num.addEventListener('click', ()=>{
            if(processList.length % 2 === 0){
                processList.push(numberList.indexOf(num))
                allProcessList.push(numberList.indexOf(num))
            }else{
                //末尾に数字を追加する
                processList[processList.length - 1] = (processList[processList.length - 1] * 10) + numberList.indexOf(num)
                allProcessList[allProcessList.length - 1] = processList[processList.length - 1]
            }
            // console.log(processList);
            showResult();
        });
    });

    //四則演算の記号のボタンを押したときの処理
    Object.keys(operationList).forEach(ope =>{
        operationList[ope].addEventListener('click', ()=>{
            if(processList.length % 2 === 1){
                //計算可能であれば、一度計算する
                if(processList.length === 3){
                    let work = calc(processList[0],processList[2],processList[1])
                    processList.length = 0
                    processList.push(work)
                    showResult()
                }
                processList.push(ope)
                allProcessList.push(operationList[ope].textContent)
                opeColorChange(operationList[ope])
            }else{
                if(processList.length != 0){
                    //記号を書き替える
                    processList[processList.length - 1] = ope
                    allProcessList[allProcessList.length - 1] = operationList[ope].textContent
                    opeColorChange(operationList[ope])
                }
            }
        });
    });

    //=ボタンを押したときの処理
    equal.addEventListener('click', ()=>{
        if(processList.length > 2 && processList.length % 2 === 1){
            allProcessList.push('=')
            let work = calc(processList[0],processList[2],processList[1])
            // work = resultCheck(work)
            processList.length = 0
            processList.push(work)
            opeColorReset()
            showResult()
            showAllProcess()
            allProcessList.push(work)
        }
    });

    //Cボタンを押したときの処理
    clear.addEventListener('click', ()=>{
        processList.length = 0
        result.textContent = 0
        opeColorReset()
        processTable.textContent = ''
        allProcessList.length = 0
    });

    //%ボタンを押したときの処理
    percent.addEventListener('click', ()=>{
        if(processList.length === 1 || processList.length === 2){
            processList[0] /= 100
            result.textContent = processList[0]
            // console.log(processList)
        }else if(processList.length === 3){
            processList[2] /= 100
            showResult()
        }
    });

    //±ボタンを押したときの処理
    reverse.addEventListener('click', ()=>{
        if(processList.length === 1 || processList.length == 2){
            processList[0] = -(processList[0])
            result.textContent = processList[0]
        }else if(processList.length === 3){
            processList[2] = -(processList[2])
            showResult()
        }
    })

    //00ボタンを押したときの処理
    doubleZero.addEventListener('click', ()=>{
        if(processList.length === 1 || processList.length === 2){
            processList[0] *= 100
            result.textContent = processList[0]
        }else if(processList.length === 3){
            processList[2] *= 100
            showResult()
        }
    })

    function calc(num1, num2, ope){
        switch(ope){
            case 'pl':
                return plusFunc(num1, num2)
                break
            case 'mn':
                return minusFunc(num1, num2)
                break
            case 'ml':
                return multiplyFunc(num1, num2)
                break
            case 'dv':
                return divideFunc(num1, num2)
                break
        }
    }

    //計算結果の表示
    function showResult(){
        resultText = processList[processList.length - 1]
        resultText = resultCheck(resultText)
        result.textContent = resultText
    }

    function plusFunc(num1, num2){
        let value = num1 + num2
        return value;
    }

    function minusFunc(num1, num2){
        let value = num1 - num2
        return value;
    }

    function multiplyFunc(num1, num2){
        let value = num1 * num2
        return value;
    }

    function divideFunc(num1, num2){
        let value = num1 / num2
        return value;
    }

    //四則演算の記号を押したときにボタンの色を変える
    function opeColorChange(ope){
        opeColorReset()
        ope.classList.remove('btn-light')
        ope.classList.add('btn-warning')
    }

    //色を変えた記号ボタンの色をリセットする
    function opeColorReset(){
        Object.keys(operationList).forEach(ope =>{
            if(operationList[ope].classList.contains('btn-warning')){
                operationList[ope].classList.remove('btn-warning')
                operationList[ope].classList.add('btn-light')
            }
        })
    }

    //計算結果のチェック
    function resultCheck(value){
        if( (value !== 0)){
            value = Math.round( value * Math.pow(10, 15) ) / Math.pow(10, 15)
        }
        return value
    }

    //計算過程の表示
    function showAllProcess(){
        let processWork = ''
        allProcessList.forEach(value=>{
             processWork += value
             processWork += ' '
        })
        processTable.textContent = processWork
        // console.log(processWork);
        allProcessList.length = 0
    }

}