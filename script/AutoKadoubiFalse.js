// 業務報告書の稼働日が〇の部分を無しにするJS
for(let x = 1; x <= 31; x++){
    let date;
    let keta = (x + '').length;
    if (keta < 2) {
        let f = "0" + x;
        date = "#dispatchDay" + f;
    } else {
        date = "#dispatchDay" + x;
    }

    let a = parent.main.document.querySelector(date);
    if(a.selectedIndex == "1"){
        a.value = "0";
    }
    console.log(x + "件目の実行");
}
