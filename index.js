const inputBirthday = document.querySelector("#input-birthday");
const checkBtn = document.querySelector("#check-btn");
const output =document.querySelector("#output");

function dateToStrConversion(date){
    let dateStr = {day : '' , month : '' , year : ''}
    if(date.day<10){
        dateStr.day = "0" + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
function getAllDateFormats(date){
    let dateStr = dateToStrConversion(date);
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy , mmddyyyy , yyyymmdd , ddmmyy , mmddyy , yymmdd];
}
function reverseStr(str){
    let splitStr = str.split('');
    let reversedStr = splitStr.reverse();
    let joinedStr = reversedStr.join('');
    // let reversedStr = str.split('').reverse().join('');
    return joinedStr;
}
function isPalindrome(str){
    let reversed = reverseStr(str);
    return str === reversed;
}
function checkPalindromeForAllDateFormats(date){
    const listOfDateString = getAllDateFormats(date);
    let flag = false;

    for(let i=0;i<listOfDateString.length;i++){
        if(isPalindrome(listOfDateString[i])){
            flag = true;
            break;
        }
    }
    return flag;
}
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0 ){
        return true;
    }
    return false;
}
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month == 2){
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        } else {
            if(day > 28){
                day = 1;
                month++;
            }
        }
    } else {
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month = 1;
        year = year++;
    }
    return {
        day : day,
        month : month,
        year : year
    }
}
function getNextPalindromeDate(date){
    var cntr = 0;
    var nextDate = getNextDate(date);
    while(1){
         cntr++;
         var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
         if(isPalindrome){
             break;
         }
         nextDate = getNextDate(nextDate);
     }
    return [cntr, nextDate];
}
function clickHandler(e){
    var bdayStr = inputBirthday.value;
    if(bdayStr !== ""){
        var arrayOfDate = inputBirthday.value.split('-');
        var date = {
            day : Number(arrayOfDate [2]),
            month : Number(arrayOfDate [1]),
            year : Number(arrayOfDate [0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            output.innerText = "Yay! your birthday is a Palindrome!! 🥳"
        } else{
            var [cntr, nextDate] = getNextPalindromeDate(date);
            output.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${cntr} days! 😞`
            // output.innerText = "Ohhh, your birthday is not a palindrome..😞"
        } 
    } else {
        output.innerText = "Please enter your Date of Birth.."
    }
}
checkBtn.addEventListener("click", clickHandler);

