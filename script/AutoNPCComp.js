/* NPC報告書を入力するスクリプト
	スクリプト実行日までの日にち分入力可能
	出勤時刻・休憩時刻・退勤時刻を入力でき。
*/

// 関数式
const sliceTime = (e, msg) => {
  if (!e) alert(msg);
  const hh = parseInt(e.slice(0, 2)).toString();
  const mm = e.slice(2);
  return hh + ":" + mm;
};

const isTarget = (hiduke, targetDate) => {
  const yyyy = hiduke.getFullYear();
  const mm = ("00" + (hiduke.getMonth() + 1)).slice(-2);

  return yyyy + "/" + mm == targetDate ? true : false;
};

// 実処理
(() => {
  const hiduke = new Date();
  const targetDate = parent.main.document.getElementById("yearMonth").value;
  if (
    !isTarget(hiduke, targetDate) &&
    !confirm("今月ではないページが対象とされています。")
  ) {
    alert("入力を中止しました。");
    return false;
  }

  // 入力受付
  let startTime = prompt("出勤時刻を４桁で入力してください。", "0900");
  let endTime = prompt("退勤時刻を４桁で入力してください。", "1800");
  let restTime = prompt("休憩時間を４桁で入力してください。", "0100");

  startTime = sliceTime(startTime, "出勤時刻入力漏れ");
  endTime = sliceTime(endTime, "退勤時刻入力漏れ");
  restTime = sliceTime(restTime, "休憩時間入力漏れ");

  // 作業日までの項目のみに入力を行うため、今日の日付を取得
  const target = ("00" + hiduke.getDate()).slice(-2);

  for (let i = 1; i <= target; i++) {
    const iStr = i.toString().length == 1 ? "0" + i : i;
    const youbi = parent.main.document.getElementById("dayOfWeek" + iStr).value;

    if (youbi != "土" && youbi != "日" && youbi != "祝") {
      const startElem = parent.main.document.getElementById("startHour" + iStr);
      const endElem = parent.main.document.getElementById("endHour" + iStr);
      const restElem = parent.main.document.getElementById("dayBreak" + iStr);

      startElem.value = startTime;
      endElem.value = endTime;
      restElem.value = restTime;
    }
  }
})();
