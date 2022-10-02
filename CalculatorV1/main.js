const key = document.querySelectorAll(".key");
const equalsKey = document.querySelector("#equals");
const show = document.querySelector("#show"); 
const acKey = document.querySelector("#AC");
let showSave = false ; 
let act = false ; 
const events = {
    signs : {
        "＋" : function(a,b) {return a+b;},
        "－" : function(a,b) {return a-b;},
        "×" : function(a,b) {return a*b;},
        "÷" : function(a,b) {return a/b;}
    },
    keyClick : function(event) {
        const value = event.path[0].innerText;
        if (show.innerText === "value is too long") { //아무것도 입력못하게 막기 
            //pass
        }
        else if (show.innerText === "0" ){ //초기값 상태의 입력 
            if(parseInt(value)){show.innerText = value ; } //초기값 0인 상태일때 정수입력시 정수를 띄워줌
            else {show.innerText = show.innerText + value ; } //초깃값 0인상태에 기호입력시 기호를 붙여줌 
        }
        else {  // 값이있는 상태의 입력
            if (!isNaN(parseInt(show.innerText[show.innerText.length-1])) || !isNaN(parseInt(value))) {
                show.innerText = show.innerText + value;  //조건 문을 걸어준이유는 연산자 입력후 또연산자를 입력하는것을 방지하기 위해
            }
        }
        
    },
    equalsKey:function() { // = 키 이벤트 
        const str = show.innerText ; 
        let saveNum = ""; 
        let listNum = [];
        for (let i = 0 ; i < str.length ; i++){   //리스트로 형변환 숫자는 정수형으로 변환
            if (!isNaN(parseInt(str[i])) || str[i] === ".") {  //숫자일때 
                saveNum += str[i] ;
                if (i == str.length -1) {
                    listNum.push(Number(saveNum)) ; //Number를 쓰는 이유는 실수는 실수로 변환하기 위해 
                    saveNum = "";
                } 
            }
            else {    //기호일때 but 소수점 제외 실수때문
                listNum.push(Number(saveNum)) ;
                listNum.push(str[i]);
                saveNum = "";
            }            
        }
        if (typeof listNum[listNum.length -1] === "string") { // 마지막값이 기호일때 실행 X 
            //pass
        }
        else { //마지막 값이 기호가아닐때 정상실행 
            for (let i = 0; i< listNum.length; i++) { //리스트마지막에 결과값을 넣어주는 알고리즘
                if (typeof listNum[i] === "string" ) { 
                    onNum = listNum[i-1];
                    twoNum = listNum[i+1];
                    listNum[i+1] = events.signs[listNum[i]](onNum,twoNum);
                }
            }
            if (show.innerText.length > 20) { show.innerText = "value is too long"}//값의 결과값이 너무길때
            else {show.innerText = listNum[listNum.length -1];} //결과값을 띄워줌
        }
       
    },
    acClick : function() {  //초기화 이벤트
        show.innerText = "0";
    }

}

for (let i = 0 ; i < key.length;i++) {
    key[i].addEventListener("click",events.keyClick);  //키 눌렀을떄 이벤트
}

equalsKey.addEventListener("click",events.equalsKey); // = 키 이벤트
acKey.addEventListener("click",events.acClick); //초기화 이벤트