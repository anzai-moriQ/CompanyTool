/* 業務報告書をスクリプト実行日までの日にち分入力できるスクリプト
	出勤時刻・休憩時刻・退勤時刻・認定勤務時間の４つを入力することが可能
  病欠日数は入力済みであればその日にちを、未入力や0であれば0日を入れる
*/

// 関数式
const sliceTime = (e, msg) => {
    if(!e) alert(msg);
    const hh = parseInt(e.slice(0, 2)).toString();
    const mm = e.slice(2);
    return hh + ":" + mm;
}

const isTarget = (hiduke, targetDate) => {
    const yyyy = hiduke.getFullYear();
    const mm = ("00" + (hiduke.getMonth() + 1)).slice(-2);

    return (yyyy + "/" + mm) == targetDate ? true : false; 
}

(() => {
    const hiduke = new Date(); 
    const targetDate = parent.main.document.getElementById("yearMonth").value;
    if (!isTarget(hiduke, targetDate)) {
        if (!confirm("今月ではないページが対象とされています。")) {
            alert("入力を中止しました。");
            return false;
        }
    }

    // 入力受付
    let startTime = prompt("出勤時刻を４桁で入力してください。", "0900");
    let endTime   = prompt("退勤時刻を４桁で入力してください。", "1800");
    let restTime  = prompt("休憩時間を４桁で入力してください。", "0100");
    let adjustTime = prompt("認勤時間を４桁で入力してください。", "0000");

    startTime = sliceTime(startTime, "出勤時刻入力漏れ");
    endTime   = sliceTime(endTime, "退勤時刻入力漏れ");
    restTime  = sliceTime(restTime, "休憩時間入力漏れ");
    if (adjustTime) {
        adjustTime = sliceTime(adjustTime, "認勤時間入力漏れ");
    }

    // 作業日までの項目のみに入力を行うため、今日の日付を取得
    const target = ("00" + hiduke.getDate()).slice(-2);

    for(let i = 1; i <= target; i++){
        const iStr = i.toString().length == 1 ? "0" + i : i;
        const youbi = parent.main.document.getElementById("dayOfWeek" + iStr).value;

        if(youbi != "土" && youbi != "日" && youbi != "祝"){
            const startElem = parent.main.document.getElementById("startHour" + iStr);
            const endElem   = parent.main.document.getElementById("endHour" + iStr);
            const restElem  = parent.main.document.getElementById("dayBreak" + iStr);

            startElem.value = startTime;
            endElem.value   = endTime;
            restElem.value  = restTime;
            if (!adjustTime || adjustTime == "00:00") {
                const adjustElem = parent.main.document.getElementById("ceWorkHour" + iStr);
                adjustElem.value = adjustTime;
            }
        }
    }

    //  病欠日数の入力
    const sickDay = parent.main.document.getElementById("SickOutDays");
    sickDay.value = sickDay.value || "0";    
})();
