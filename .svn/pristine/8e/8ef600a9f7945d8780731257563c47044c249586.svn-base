const getDate = function () {
    let date = new Date();
    let nowMonth = date.getMonth() + 1;
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
    }
    let strDate = date.getDate();
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return {
        year: date.getFullYear(),
        month: nowMonth,
        day: strDate,
    }
}
export { getDate }