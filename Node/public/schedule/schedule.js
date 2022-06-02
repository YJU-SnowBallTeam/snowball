$(document).ready(function() {
    calendarInit();
});
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        // console.log(prevDate, prevDay, nextDate, nextDay);

        // 현재 월 표기
        $('.year-month').text(currentYear + '.' + (currentMonth + 1));

        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML + `<div class="day current" value = ${i}>` + i + '</div>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });
}

const Daycur = document.querySelector('.day.current');
const allCal = document.querySelector('#all_cal')
const time = document.querySelector('#time')
const timeDiv = document.querySelector('#timeDiv')
const formTag = document.querySelector('#formtag')
$('.day').click(function(){ 

    var get12 = $(this).attr('value'); 
    
    var get22 = $(this).text();
    
    console.log(get12, get22);
    
    })
function clickEvent(){
    allCal.style.transform = `translateX(-20vw)`
    allCal.style.transition = `1s ease-out`
    
    $('.day').click(function(){ 
        var get12 = $(this).attr('value'); 
        console.log(get12);
        formTag.innerHTML = `
        <div>
        <form>
        <div style= "display : inline-block; margin-bottom : 10px">${get12}일의 일정은?</div>
        <table id="time" style ="position: relative;">
                <td>시간</td>
                <td>무엇을 하실건가요?<br /></td>
                <tr>
                    <td>08:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>09:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>10:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>11:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>12:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>13:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <tr>
                    <td>14:00</td>
                    <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>15:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>16:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>17:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>18:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>19:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>20:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>21:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>22:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
                <td>23:00</td>
                <td><input name="firstname" type="text" style="width: 80%;" /><br /></td>
                </tr>
            </table>
        </form>
    </div>` 
        })
    setTimeout(() => {
        $('#time').fadeIn(500);
        formTag.style.transform = `translateY(-45vh)`
        formTag.style.transition = `1.5s ease-out`    
        formTag.style.width = '40vw'
        formTag.style.display = "block"
        
    }, 500);
    
}

$('#all_cal').on("click",clickEvent)

// https://songsong.dev/11