/* メールのドラフトで使用できるスクリプト
	タイトルが「no subject」のものにチェックを入れる
  削除したくないものが紛れていた時のために削除ボタンのクリックは行わない。
*/
const tr = parent.right.document.getElementsByTagName('tr');

// 空の場合コンソールにメッセージを出して終了
if(tr.length == 0) {
  console.log("対象の下書きはありません。");
  return false;
}

for (r of tr) {
  const str = r.innerText;

  // strの中に(no subject)がある場合だけ対象
  if (str.includes("(no subject)")) {
    const checkBox = r.cells[0].children[0];
    checkBox.checked = true;
  }
}
