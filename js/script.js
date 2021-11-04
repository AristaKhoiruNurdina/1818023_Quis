
const baseUrl = "https://www.balldontlie.io/api/v1/";
const teamEndPoin = `${baseUrl}teams`;
const gameEndPoin = `${baseUrl}games`;
const playerEndPoin = `${baseUrl}players`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");


function getListTeams() {
    title.innerHTML = "Daftar Tim Basket"
    fetch(teamEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            resJson.data.forEach(team => {
                data += `
                <li class="collection-item avatar">
                    <span class="title">${team.name}</span>
                    <p>Kota: ${team.city} <br>
                       Nama: ${team.full_name}
                    </p>
                    <a href="#" data-id="${team.id}" class="secondary-content"><i class="waves-effect waves-light btn-small" data-id ="${team.id}" >Detail</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>';
            const detil = document.querySelectorAll('.secondary-content');
            detil.forEach(btn => {
                btn.onclick = (event) =>{
                    showTeamInfo(event.target.dataset.id);
                }
            
            })
        }).catch(err => {
            console.error(err);
        })
}

function showTeamInfo(id){

    let url = baseUrl + "teams/" + id;
    title.innerHTML = "Detail Team";
    fetch(url)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson.area);
       
        contents.innerHTML = `
            <div class="col s12 m7">
             <h2 class="header">${resJson.name}</h2>
                    <div class="card-stacked">
                      <div class="card-content">
                        <p>Singkatan : ${resJson.abbreviation} <br>
                           Kota       : ${resJson.city} <br>
                           Pertemuan  : ${resJson.conference} <br>
                           Devisi      : ${resJson.division} <br>
                           Nama Lengkap  : ${resJson.full_name} <br>
                           Nama        : ${resJson.name} <br>
                          
                        </p>
                      </div>
                    </div>
            </div>
            `
    
    }).catch(err => {
        console.error(err);
    })

}



function getListGames() {
    title.innerHTML = "List Permainan";
    fetch(gameEndPoin)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let data = "";
            let i = 1;
            resJson.data.forEach(team => {
                data += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${team.home_team.name}</td>
                    <td>${team.home_team_score}</td>
                    <td>${team.period}</td>
                    <td>${team.season}</td>
                   
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th>No</th>
                            <th>Nama Tim</th>
                            <th>Score</th>
                            <th>Periode</th>
                            <th>Season</th>    
                        </thead>
                        <tbody>
                            ${data}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}


function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "games":
            getListGames();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});