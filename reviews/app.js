const reviews = [
    {
        id: 1,
        name: "Michael Jackson",
        job: "King of Pop",
        img:"./person-1.jpeg",
        text:"Greatest Singer of All Time"
    },
    {
        id: 2,
        name: "Michael Jordan",
        job: "Professional Athlete",
        img:"./person-2.jpeg",
        text:"Greatest NBA Player of All Time"
    },
    {
         id: 3,
        name: "Mike Tyson",
        job: "Professional Boxer",
        img:"./person-3.jpeg",
        text:"Greatest Heavyweight Champ of All Time"
    },
    {
        id: 4,
       name: "Michael Joseph",
       job: "Software Engineer",
       img:"./person-4.jpeg",
       text:"Greatest Problem Solver of All Time"
   }
];

// select items
const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');

// set starting item
let currentItem = 0;

// load initial item
window.addEventListener('DOMContentLoaded', function() {
    showPerson(currentItem);
});

// show person based on item
function showPerson(person) {
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
    console.log(person)
}

// show next person
nextBtn.addEventListener('click', function() {
    currentItem++;
    if(currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson(currentItem);
});

//show prev person
prevBtn.addEventListener('click', function() {
    currentItem--;
    if(currentItem  < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});

//show random person
randomBtn.addEventListener('click', function() {
    currentItem = Math.floor(Math.random() * reviews.length);
    console.log(currentItem);
    showPerson(currentItem);
});