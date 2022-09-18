function init() {
    // Grab a reference to the dropdown select element
    var selectHome = d3.select("#selDatasetHome");
    var selectAway = d3.select("#selDatasetAway")
    // Use the list of team names to populate the select options
    d3.json("static/js/NFL_final_results.json").then((data) => {
      var homeTeams = data.home_team;
      var dataKeys = Object.keys(homeTeams);
      var awayTeams = data.away_team;
      
      var arrHome = []
      var arrAway = []
      dataKeys.forEach((key) => {
        
        if (!arrHome.includes(homeTeams[key])){
          arrHome.push(homeTeams[key])
          selectHome
            .append("option")
            .text(homeTeams[key])
            .property("value", homeTeams[key]);
        }
      });
      dataKeys.forEach((key) => {
        if (!arrAway.includes(awayTeams[key])){
          arrAway.push(awayTeams[key])
          selectAway
            .append("option")
            .text(awayTeams[key])
            .property("value", awayTeams[key])
        }
      });
      // Use the first team from the list to build the initial view
      var deftHomeTeam = homeTeams[0];
      var deftAwayTeam = awayTeams[0];
      buildCharts(deftHomeTeam, deftAwayTeam);
      buildMetadata(deftHomeTeam, deftAwayTeam);
      winStatsdata(deftHomeTeam,deftAwayTeam);
    });
  }
  
  // Initialize the dashboard
  init();

  function optionChangedHome(newHome) {
    // Fetch new data each time a new home team is selected
    var selectAway = document.querySelector('#selDatasetAway');
    var output = selectAway.value;
    
    buildMetadata(newHome, output);
    buildCharts(newHome, output);
    winStatsdata(newHome,output);
    
  }
  function optionChangedAway(newAway) {
    // Fetch new data each time a away team is selected
    var selectHome = document.querySelector('#selDatasetHome');
    var output = selectHome.value;
    
    buildMetadata(output, newAway);
    buildCharts(output,newAway);
    winStatsdata(output,newAway);
    
  }
  // Demographics Panel 
function buildCharts(newHome, newAway) {
  d3.json("static/js/NFL_final_results.json").then((data) => {
    var keepKey=0
    var dataKeys = Object.keys(data.home_team);
    for (const element of dataKeys){
      if (data.home_team[element] === newHome && data.away_team[element] === newAway){
        keepKey = element;
        break;
        
    } else {
      keepKey = 9999 
    }}

    var gaugeData = [{
      //domain: {x: [0,1], y:[0,1]},
      value: data.accuracy[keepKey] * 100,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "XGBOOST Accuracy Score"},
      gauge: {
        axis: {range: [0, 100]},//, tickwidth: 1, tickcolor: "black"},
        bar: {color: "black"},
        steps: [
          {range: [0,20], color: "red", },
          {range: [20,40], color: "orange"},
          {range: [40,60], color: "yellow"},
          {range: [60,80], color: "green"},
          {range: [80,100], color: "blue"} 
        ],
        threshold: {
          line: { color: "cyan", width: 4},
          thicknesss: 0.75,
          value: 7
        }
      }
    }];
  
  // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: "XGBoost Accuracy Score (Home team wins)",
      paper_bgcolor: "rgba(0,0,0,0)"
    };
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    })  
}
function winStatsdata(newHome,newAway) {
  d3.json("static/js/NFL_win_stats.json").then((data) => {
    var homeKey = 0
    var awayKey = 0
    var dataKeys = Object.keys(data.home_team);
    
    var HOMEPANELSTATS = d3.select("#sample-metadata-home-stats");
    var AWAYPANELSTATS = d3.select("#sample-metadata-away-stats")
    HOMEPANELSTATS.html("");
    
    AWAYPANELSTATS.html("");
    for (const element of dataKeys){
      if (data.home_team[element] === newHome){
        homeKey = element;
           
    } if (data.home_team[element] === newAway){
        awayKey = element;
    } 
      
  
    }
    HOMEPANELSTATS.append("h6").text(`Overall Win PCT:  ${data.win_pct[homeKey]}`)
    HOMEPANELSTATS.append("h6").text(`Home Win PCT: ${data.home_pct[homeKey]}`)
    AWAYPANELSTATS.append("h6").text(`Overall Win PCT: ${data.win_pct[awayKey]}`)
    AWAYPANELSTATS.append("h6").text(`Away Win PCT: ${data.away_pct[awayKey]}`)
})
      // add accuracy, home stadium and stadium location to this panel
    
}

function buildMetadata(newHome,newAway) {
  d3.json("static/js/NFL_final_results.json").then((data) => {
    console.log(data);
    console.log(newHome, newAway)
    var keepKey=0
    var dataKeys = Object.keys(data.home_team);
    var HOMEPANEL = d3.select("#sample-metadata-home");
    var DECPANEL = d3.select("#sample-metadata-stats");
    var AWAYPANEL = d3.select("#sample-metadata-away")
    HOMEPANEL.html("");
    DECPANEL.html("");
    AWAYPANEL.html("");
    

    //console.log(dataKeys)
    if (newHome === newAway) {
      DECPANEL.append("h6").text('Please choose new teams.  Home and Away cannot be the same team.')
    } else {
      for (const element of dataKeys){
        if (data.home_team[element] === newHome && data.away_team[element] === newAway){
          keepKey = element;
          break;
          
      } else {
        keepKey = 9999 
      }}
      
      console.log(keepKey)
      // Use d3 to select the panel with id of `#sample-metadata-home for the home team`
      
  
      // Use `.html("") to clear any existing metadata
      if (keepKey === 9999) {
        DECPANEL.append("h6").text('Matchup not found: Insufficient data. Please choose new teams.')
      } else {
        // add accuracy, home stadium and stadium location to this panel
        DECPANEL.append("h6").text(`XGBOOST Home Win Accuracy: ${data.accuracy[keepKey]}`);
        HOMEPANEL.append("h6").text(`Home Stadium: ${data.stadium[keepKey]}`)
        HOMEPANEL.append("h6").text(`Stadium Location: ${data.stadium_location[keepKey]}`)
        
      }
    }
   // dataKeys.forEach((key) => {
   //   if (data.home_team[key] === newHome && data.away_team[key] === newAway){
   //     keepKey = key;
   //     throw BreakError;
        
   // } else {
   //   keepKey = 9999 
   // }})

    
    

  });
}
  
  