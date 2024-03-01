/* 作業実績を入力するスクリプト
	備考・出勤時刻・退勤時刻・休憩時刻を入力できる
  備考は固定文言（日にちごとに別々の文言を設定することはできない）
*/

/** 関数式 **/
const isMatsubi = () => {
  if (parent.main.document.getElementById("day31")) {
    return "31";
  } else if (parent.main.documrnt.getElementById("30")) {
    return "30";
  } else if (parent.main.document.getElementById("29")) {
    // うるう年
    return "29";
  } else if (parent.main.document.getElementById("29")) {
    return "28"
  } else {
    return false;
  }
}

/** 実際の処理 **/
const memo = prompt("備考を入力してください。");

// 初期値が決まっている項目
const start = parent.main.document.getElementById("startHour").value;
const end = parent.main.document.getElementById("endHour").value;
const rest = "1:00";

// 30日・31日・29日・28日なのか求める
const matsubi = isMatsubi();
if (!matsubi) alert("サイトが壊れています");

for (let i = 1; i <= matsubi; i++) {
  const iStr = i.toString().length == 1 ? "0" + i : i;
  const youbi = parent.main.document.getElementById("dayOfWeek" + iStr).value;
  
  if (youbi != "土" && youbi != "日" && youbi != "祝") {
    const startElem = parent.main.document.getElementById("startHour" + iStr);
    const endElem = parent.main.document.getElementById("endHour" + iStr);
    const restElem = parent.main.document.getElementById("dayBreak" + iStr);
    const memoElem = parent.main.document.getElementById("remarks" + iStr);
    
    startElem.value = start;
    endElem.value = end;
    restElem.value = rest;
    memoElem.value = memo;
  }
}
