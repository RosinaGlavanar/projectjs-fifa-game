getCode();

function searchByCountry() {
  var searchText = document.getElementById("search").value;
  clear("#tbodySearch");
  getEvents(searchText);
}

function showGroup() {
  clear("#tbodyGroups");
  getGroup();
}

function showEventByCode(code) {
  clear("#tbodySearch");
  getCountry(code);
}

function clear(selector) {
  document.querySelector(selector).innerHTML = "";
}

function getCode() {
  Ajax.get("http://worldcup.sfg.io/teams", data => {
    var fifa_codes = [];
    for (let index = 0; index < data.length; index++) {
      fifa_codes.push(data[index].fifa_code);
    }
    for (let index = 0; index < fifa_codes.length; index++) {
      document.getElementById("dropdownMenuButton").innerHTML +=
        " <a onclick='showEventByCode(this.innerText)' class='dropdown-item' >" +
        fifa_codes[index] +
        "</a>";
    }
    console.log(fifa_codes);
  });
}

function getEvents(searchText) {
  Ajax.get("http://worldcup.sfg.io/matches", data => {
    for (let index = 0; index < data.length; index++) {
      if (data[index].away_team_country == searchText) {
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var th2 = document.createElement("th");

        th1.innerHTML =
          data[index].away_team_country + " - " + data[index].home_team_country;

        th2.innerHTML =
          data[index].away_team.goals + "-" + data[index].home_team.goals;

        tr.appendChild(th1);
        tr.appendChild(th2);
        document.getElementById("tbodySearch").appendChild(tr);
      }
    }
  });
}

function getGroup() {
  Ajax.get("http://worldcup.sfg.io/teams/group_results", data => {
    for (let index = 0; index < data.length; index++) {
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");

      th1.innerHTML = data[index].letter;

      th2.innerHTML =
        data[index].ordered_teams[0].country +
        "  -  " +
        data[index].ordered_teams[1].country +
        "  -  " +
        data[index].ordered_teams[2].country +
        "  -  " +
        data[index].ordered_teams[3].country;

      tr.appendChild(th1);
      tr.appendChild(th2);
      document.getElementById("tbodyGroups").appendChild(tr);
    }
  });
}

function getCountry(code) {
  Ajax.get("http://worldcup.sfg.io/matches/country?fifa_code=" + code, data => {
    for (let index = 0; index < data.length; index++) {
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");

      th1.innerHTML =
        data[index].away_team_country + " - " + data[index].home_team_country;

      th2.innerHTML =
        data[index].away_team.goals + "-" + data[index].home_team.goals;

      tr.appendChild(th1);
      tr.appendChild(th2);
      document.getElementById("tbodySearch").appendChild(tr);
    }
  });
}