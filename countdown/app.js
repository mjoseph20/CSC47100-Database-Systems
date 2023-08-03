const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//let futureDate = new Date(2023, 10, 13, 11, 59, 00);
const futureDate = new Date(tempYear, tempMonth, tempDay 
    + 10, 11, 59, 00);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();
let month = months[futureDate.getMonth()];
let day = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${day}, ${month} ${date}, ${year} @ ${hours}:${minutes}am`;

//future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;

    // 1sec = 1000ms
    // 1min = 60sec
    // 1hr = 60min
    // 1day = 24hr

    //values in ms
    const oneDay = 86400000; //24*60*60*1000
    const oneHour = 3600000; //60*60*1000
    const oneMin = 60000;    //60*1000

    //calculate all values in ms
    let days = Math.floor(t / oneDay);
    let hrs = Math.floor((t % oneDay) / oneHour);
    let mins = Math.floor((t % oneHour) / oneMin);
    let secs = Math.floor((t % oneMin) / 1000);

    //set values in an array
    const values = [days, hrs, mins, secs];

    //format values less than 10
    function format (item) {
        if (item < 10) {
            return item = `0${item}`;
        }
        return item;
    }

    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });

    //expiration notice
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
    }
}

//countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();