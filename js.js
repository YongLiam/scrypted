// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let firebaseConfig = {
    apiKey: "AIzaSyDxOcHHQhU6egLr2ZkgMlKmqv8dN4z7EAo",
    authDomain: "scrypted-lcs.firebaseapp.com",
    projectId: "scrypted-lcs",
    storageBucket: "scrypted-lcs.appspot.com",
    messagingSenderId: "449386524331",
    appId: "1:449386524331:web:9c7b03c26e3814f92fd1ee",
    measurementId: "G-WJ60BYCL9Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//adding team
function goNext()
{
let passcode = document.getElementById('pass').value;
 let nextMove = document.getElementById('nextMove').value;

 if(passcode != '')
 {
   if(passcode == pass)
   location.replace(nextMove +".html");
   else
   alert("Wrong passcode!!!");
 }
 else{
   alert("You must enter a passcode!!!");
 }
 }


  //View Leaderboard
  function loadLeaderboard()
    {
      if(results.length==0)
      alert("Leaderboard Empty!!");
      else{
        if(oldResults.length>1)
        {
          sortResult(oldResults);
        }
        sortResult(results);
        checkRank();
        if(lobby != "lcsA") { //lobby A has logo
       if(results.length <= 12)
      {
        document.getElementById("singleTable").style.display = "block";
      for(let i=0; i<results.length; i++)
      {
        if(results[i].rank == undefined)
        results[i].rank = '';
      document.getElementById("row["+i+"]").innerHTML = '<td class="sn"><center>'+(i+1)+'</center></td><td><div class="clan"><div class="clan-name">'+ results[i].team.name +'</div></div></td><td><center>'+ results[i].matches +'</center></td><td><center>'+ results[i].wwcd +'</center></td><td><center>'+ results[i].placement +'</center></td><td><center>'+ results[i].kills +'</center> </td> <td> <center>'+ results[i].total +'</center></td><td>'+results[i].rank+'</td>'
      }
    }
      else{
        document.getElementById("doubleTable").style.display = "block";
        document.getElementById("doubleTable1").style.display = "block";
      for(let i=0; i<results.length; i++)
      {
        if(results[i].rank == undefined)
        results[i].rank = '';
      document.getElementById("roww["+i+"]").innerHTML = '<td class="sn"><center>'+(i+1)+'</center></td><td><div class="clan"><div class="clan-name">'+ results[i].team.name +'</div></div></td><td><center>'+ results[i].matches +'</center></td><td><center>'+ results[i].wwcd +'</center></td><td><center>'+ results[i].placement +'</center></td><td><center>'+ results[i].kills +'</center> </td> <td> <center>'+ results[i].total +'</center></td><td>'+results[i].rank+'</td>'
      }
         }
          }
          else { //lobby A
            if(results.length <= 12)
            {
              document.getElementById("singleTable").style.display = "block";
            for(let i=0; i<results.length; i++)
            {
              if(results[i].rank == undefined)
              results[i].rank = '';
            document.getElementById("row["+i+"]").innerHTML = '<td class="sn"><center>'+(i+1)+'</center></td><td><div class="clan"><div class="clan-logo"><img src="'+results[i].team.logo+'"/></div><div class="clan-name">'+ results[i].team.name +'</div></div></td><td><center>'+ results[i].matches +'</center></td><td><center>'+ results[i].wwcd +'</center></td><td><center>'+ results[i].placement +'</center></td><td><center>'+ results[i].kills +'</center> </td> <td> <center>'+ results[i].total +'</center></td><td>'+results[i].rank+'</td>'

            }
          }
            else{
              document.getElementById("doubleTable").style.display = "block";
              document.getElementById("doubleTable1").style.display = "block";
            for(let i=0; i<results.length; i++)
            {
              if(results[i].rank == undefined)
              results[i].rank = '';
            document.getElementById("roww["+i+"]").innerHTML = '<td class="sn"><center>'+(i+1)+'</center></td><td><div class="clan"><div class="clan-logo"><img src="'+results[i].team.logo+'"/></div><div class="clan-name">'+ results[i].team.name +'</div></div></td><td><center>'+ results[i].matches +'</center></td><td><center>'+ results[i].wwcd +'</center></td><td><center>'+ results[i].placement +'</center></td><td><center>'+ results[i].kills +'</center> </td> <td> <center>'+ results[i].total +'</center></td><td>'+results[i].rank+'</td>'

            }
               }
          }
        }
    }
    function emptyLeaderboard() {
      if(prompt("Enter lobby code to empty: ") == lobby) {
        db.collection("leaderboards").doc(lobby).update({
    result: [],
    oldResult: [],
    teams: []
  }).then(function(){
    alert("Leaderboard emptied!!");
    location.reload();
  }).catch(function(error){
    alert("Error emptying leaderboard" +error);
  })
      }
      else
      alert("Wrong lobby code");
}
  function sortResult(resultToSort)
  {
    //sort leaderboard
        //sort by total
        resultToSort.sort((a,b) => (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0)); 
       //sort by kills (if equal total)
       resultToSort.sort((a,b) => (a.total === b.total && a.kills > b.kills) ? -1 : ((b.total === a.total && b.kills > a.kills) ? 1 : 0));
       //sort by wwcd (if equal kills)
       resultToSort.sort((a,b) => (a.total === b.total && a.kills === b.kills && a.wwcd > b.wwcd) ? -1 : ((b.total === a.total && b.kills === a.kills && b.wwcd > a.wwcd) ? 1 : 0));
       //sort by position (if equal chicken dinner)
       resultToSort.sort((a,b) => (a.total === b.total && a.kills === b.kills && a.wwcd === b.wwcd && a.placement > b.placement) ? -1 : ((b.total === a.total && b.kills === a.kills && b.wwcd === a.wwcd && b.placement > a.placement) ? 1 : 0));
       //sort by matches played (if equal position)
       resultToSort.sort((a,b) => (a.total === b.total && a.kills === b.kills && a.wwcd === b.wwcd && a.placement === b.placement && a.matches > b.matches) ? -1 : ((b.total === a.total && b.kills === a.kills && b.wwcd === a.wwcd && b.placement === a.placement && b.matches > a.matches) ? 1 : 0));
  }
  function checkRank() {
    for(let i=0; i<oldResults.length; i++)
    for(let j=0; j<results.length; j++)
    {
      if(results[j].team.name == oldResults[i].team.name)
      {
        if((i-j)>0)
        results[j].rank = '<span style="float:left;"><span style="color:green;"">↑</span><span style="font-size:13px">'+(i-j)+'</span></span>';
        else if((i-j)<0)
        results[j].rank = '<span style="float:left;"><span style="color:red;">&#8595;</span><span style="font-size:13px">'+(i-j)+'</span></span>';
        else
        results[j].rank = '';
      }
    }
  }


//adding team
function addTeam()
{
  let db = firebase.firestore();
//Get newTeam Details
let tName = document.getElementById('tName').value;
  let tTag = document.getElementById('tTag').value;
  let tLogo = document.getElementById('tLogo').value;
  let tLobby = document.getElementById('tLobby').value;

  if(tName != '' && tTag != '')
  {
    let tTagName = tTag.concat(' | ' + tName)
    if(tLogo == '')
    tLogo = 'https://firebasestorage.googleapis.com/v0/b/demotest-73a88.appspot.com/o/assetss%2Fscrypted_icon.png?alt=media&token=06f54655-5b45-46ad-8d71-4ff5eb2b6f44';

    db.collection("teams").doc(tName).set({
    name: tName,
    tag: tTag,
    logo: tLogo,
    lobby: tLobby,
    tagName: tTagName
})
.then(function() {
  location.reload();
})
.catch(function(error) {
    alert("Error adding team: ", error);
});
  }
  else{
    alert("You Must Fill Team Name and Tag");
 
  }

  }