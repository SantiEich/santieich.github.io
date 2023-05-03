/**
 * Leaderboard
 * 
 * Description: The goal of this document is process hackers rankings and show as leaderboard. It will be reloaded automatically
 * Author: Anibal Ardid (@aardid)
 * Co-Author: Alan Levy "El Mago" (@soyelmago)
 * 
 */

// geting canvas by Boujjou Achraf
var c = document.getElementById("c");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

//chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//drawing the characters
function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#252364";//green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 45);



const consoleOptions = 'background: #ffffff; color: #2D9B00';
const RANKFILE = './ranking.json';
const DEFAULTAVATAR = './assets/avatar.png';
const SORTBYREP = true;

console.info('%c  ___      _______  _______  ______   _______  ______    _______  _______  _______  ______    ______  ', consoleOptions);
console.info('%c |   |    |       ||   _   ||      | |       ||    _ |  |  _    ||       ||   _   ||    _ |  |      | ', consoleOptions);
console.info('%c |   |    |    ___||  |_|  ||  _    ||    ___||   | ||  | |_|   ||   _   ||  |_|  ||   | ||  |  _    |', consoleOptions);
console.info('%c |   |    |   |___ |       || | |   ||   |___ |   |_||_ |       ||  | |  ||       ||   |_||_ | | |   |', consoleOptions);
console.info('%c |   |___ |    ___||       || |_|   ||    ___||    __  ||  _   | |  |_|  ||       ||    __  || |_|   |', consoleOptions);
console.info('%c |       ||   |___ |   _   ||       ||   |___ |   |  | || |_|   ||       ||   _   ||   |  | ||       |', consoleOptions);
console.info('%c |_______||_______||__| |__||______| |_______||___|  |_||_______||_______||__| |__||___|  |_||______| ', consoleOptions);

var loadRank = () => {
    fetch(RANKFILE)
    .then(response => response.json())
    .then(body => processRank(body.data))
    .catch(err => console.error("Error:" , err));
};

var compareRep = (a, b) => {
    const repA = a.reputation;
    const repB = b.reputation;

    let comparison = 0;

    if (repA < repB) {
      comparison = 1;
    } else if (repA > repB) {
      comparison = -1;
    }
    return comparison;
}

var processRank = (rank) => {
    // console.log("Rank: ", rank)
    
    if (SORTBYREP) {
        rank = rank.sort(compareRep);
    }
    // console.log("Sorted Rank: ", rank)

    // Top 3

    // winner
    let winneravatar = document.querySelector('#winner-avatar');
    let winnername = document.querySelector('#winner-name');
    let winnertwitter = document.querySelector('#winner-twitter');

    winneravatar.src = (rank[0].avatar && rank[0].avatar !== '') ? rank[0].avatar : DEFAULTAVATAR;
    winnername.innerHTML = rank[0].name;
    winnertwitter.innerHTML = (rank[0].twitter) ? '@' + rank[0].twitter : '';

    // second
    let secondavatar = document.querySelector('#second-avatar');
    let secondname = document.querySelector('#second-name');
    let secondtwitter = document.querySelector('#second-twitter');

    secondavatar.src = (rank[1].avatar && rank[1].avatar !== '') ? rank[1].avatar : DEFAULTAVATAR;
    secondname.innerHTML = rank[1].name;
    secondtwitter.innerHTML = (rank[1].twitter) ? '@' + rank[1].twitter : '';

    // third
    let thirdavatar = document.querySelector('#third-avatar');
    let thirdname = document.querySelector('#third-name');
    let thirdtwitter = document.querySelector('#third-twitter');

    thirdavatar.src = (rank[2].avatar && rank[2].avatar !== '') ? rank[2].avatar : DEFAULTAVATAR;
    thirdname.innerHTML = rank[2].name;
    thirdtwitter.innerHTML = (rank[2].twitter) ? '@' + rank[2].twitter : '';

    // all the rank
    var place = 0;

    let hascontent = (document.querySelector('#body-rank-table').innerHTML) ? true : false;

    rank.forEach(hacker => {
        place++;
        let avatar = (hacker.avatar && hacker.avatar !== '') ? hacker.avatar : DEFAULTAVATAR;
        let name = hacker.name;
        let twitter = hacker.twitter;
        let reputation = hacker.reputation;
        let bounties = hacker.bounties;
        let reports = hacker.reports;

        let placecolor = '';
        let reputationcolor = '';
        switch (place) {
            case 1:
                reputationcolor = 'u-text--yellow';
                placecolor = 'u-text--dark u-bg--yellow';
                break;
            case 2:
                reputationcolor = 'u-text--teal';
                placecolor = 'u-text--dark u-bg--teal';
                break;
            case 3:
                reputationcolor = 'u-text--orange';
                placecolor = 'u-text--dark u-bg--orange';
                break;
        
            default:
                break;
        }

        let table = document.querySelector('#body-rank-table');

        let newRow = '';
        newRow += '<tr class="c-list__item" id="rank-line-'+place+'">';
        newRow += '</tr>';

        contentRow  = '    <th scope="row">';
        contentRow += '        <div class="c-flag c-place u-bg--transparent '+placecolor+'">'+place+'</div>';
        contentRow += '    </th>';
        contentRow += '    <td class="c-media__title">';
        contentRow += '        <div class="c-media c-username">';
        contentRow += '            <img class="c-avatar c-media__img"';
        contentRow += '                src="'+avatar+'">';
        contentRow += '            <div class="c-media__content">';
        contentRow += '                <div class="c-media__title">'+name+'</div>';
        contentRow += '                <a class="c-media__link u-text--small"';
        contentRow += '                    target="_blank">@'+twitter+'</a>';
        contentRow += '            </div>';
        contentRow += '        </div>';
        contentRow += '    </td>';
        contentRow += '    <td>';
        contentRow += '        <div class="c-kudos">';
        contentRow += '            <div class="u-mt--8">';
        contentRow += '                <strong>'+reports+'</strong>';
        contentRow += '            </div>';
        contentRow += '        </div>';
        contentRow += '    </td>';
        contentRow += '    <td>';
        contentRow += '        <div class="c-kudos">';
        contentRow += '            <div class="u-mt--8">';
        contentRow += '                <strong>'+bounties+'</strong>';
        contentRow += '            </div>';
        contentRow += '        </div>';
        contentRow += '    </td>';
        contentRow += '    <td>';
        contentRow += '        <div class="c-kudos '+reputationcolor+'">';
        contentRow += '            <div class="u-mt--8">';
        contentRow += '                <strong>'+reputation+'</strong>';
        contentRow += '            </div>';
        contentRow += '        </div>';
        contentRow += '    </td>';

        if (hascontent) {
            let tableline = document.querySelector('#rank-line-'+place);
            tableline.innerHTML = contentRow;
        } else {
            table.insertAdjacentHTML('beforeend', newRow);
            let tableline = document.querySelector('#rank-line-'+place);
            tableline.innerHTML = contentRow;
        }

    });
}


loadRank();

setInterval(function () {
    loadRank();
}, 10000);

