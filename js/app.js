//var smart = FHIR.client(config);
//var code = document.getElementById("code").value;


var str,
element = document.getElementById('code');
if (element != null) {
    str = element.value;
}
else {
    str = null;
}


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function bulletPoint(medInfo){
  // if (typeof(medInfo[0] == "undefined")){
  //   return
  // }
  // else {

  // }
  
  document.getElementById('patient_info').innerHTML += '<li>' + medInfo[0] + ' ' + '<strong>' + medInfo[1] + '</strong>' + '</li>';


}

function getMedicationInfo(medEntry){
  if(medEntry == null) {
    return}
  else{
    try {
      var med = medEntry.resource.medicationCodeableConcept.text
      var status = medEntry.resource.status

    }
    
    catch(err) {
      return
    } 
    
return [med, status];
  }
};


function mainfxn(){
  
  var id = [
    'smart-1577780',
    'smart-765583',
    'smart-1291938',
    'smart-1157764'
  ] // Patients who experience breast cancer due to "Malignant neoplasm of breast (disorder)" SNOMED-CT: 254837009

  var meds =
	{
    type: "MedicationDispense",

    // type: "MedicationRequest" // I could pull the same information, but MedicationDispense is a lot more reliable (less empty medication names)
  }; // Medication request search
  
  document.getElementById("patient_info").innerHTML = ""; // This clears the div
  // var delayInMilliseconds = 5000;
  document.getElementById("patient_info").innerHTML += 'Patients'
  
  for (i=0; i < id.length; i++){

    
    document.getElementById("patient_info").innerHTML += '<h4> Patient id#: ' + id[i].replace("smart-","") + '</h4>';
    
    // console.log(smart);
    // console.log(smart.patient.api.search(meds))
    // smart = getIdentifier(id[i]).then(
      console.log(id[i])
      // console.log(callPatient)
      


      var smart = new FHIR.client({
        serviceUrl: 'https://r3.smarthealthit.org',
        patientId: id[i]
        }
      )
      var pq = smart.patient.read();
      
      
      
      // console.log(smart.patient.api.search(meds))
      // smart.patient.api.search(meds).done((res)=>{
      //   console.log("BOB", res)
        
      // })
      
      smart.patient.api.search({type: "MedicationDispense", query: {patient:smart.patientId}
        }).then(listMedications)
      // sleep(1000);  

      function listMedications(m){
        
        console.log(i)
        
        if(m.data.entry != undefined){

          document.getElementById("patient_info").innerHTML += '<i>' + 'Medications' + '</i>'
          

        var entries = m.data.entry;
        console.log(entries);

        
        document.getElementById("patient_info").innerHTML += '<ul>';
        
        for (j = 0; j < entries.length; j++){         
          
          bulletPoint(getMedicationInfo(entries[j]))

          
        };
        document.getElementById("patient_info").innerHTML += '</ul>';
      }
      else{
        console.log("This did not return anything");
      }
      document.getElementById("patient_info").innerHTML += '<br> </br>';


      }
    
  }
  sleep(1000);
//   function startTimer () {
//     timer.start();
//     setTimeout(stopTimer,5000);
// }

// function stopTimer () {
//     timer.stop();
// }
// timer




			  //console.log(r.data.entry[0].resource.gender)
        $("patient_info").empty();
              //document.getElementById('patient_info').innerHTML = '<h2> Patient Info</h2>' +'<b>' +'<\b>' + 
        //document.getElementById("patient_info").innerHTML = '<h2> Patient Info</h2>'+'<p>'+'<b>'+'Gender: '+'</b>'+r.data.entry[0].resource.gender+'</p>'+'<p>'+'<b>'+'Birthday: '+'</b>'+r.data.entry[0].resource.birthDate+'</p>'+'<p>'+'<b>';
              
              

              // patient_id = r.data.entry[0].resource.id;
              $(plot1).empty()

              time = [2007, 2011, 2015, 2019];

              hemoglobin = [165, 150, 130, 110]; hemoglobin_1 = [135, 138, 120, 143]; hemoglobin_2 = [162, 150, 120, 100]; hemoglobin_3 = [153, 135, 149, 131];
              platelet = [150, 200, 250, 300]; platelet_1 = [300, 350, 380, 500]; platelet_2 = [200, 240, 310, 320]; platelet_3 = [500, 300, 200, 120];
              rbc = [4.1, 3.8, 3.7, 5.01]; rbc_1 = [5.1, 4.2, 4.1, 3.8]; rbc_2 = [4.65, 4.21, 3.99, 3.7]; rbc_3 = [3.6, 4.2, 4.1, 5.1];
              wbc = [9.6, 9.2, 4.2, 3.1]; wbc_1 = [5.52, 5.67, 4.2, 2.1]; wbc_2 = [3.4, 5.1, 2.1, 6.7]; wbc_3 = [3.5, 5.6, 4.2, 7.5];

              console.log('This is time', time);
              console.log('This is hemoglobin', hemoglobin);
              console.log('This is platelet', platelet);
              console.log('This is rbc', rbc);
              console.log('This is wbc', wbc);

              // Hemoglobin Plot
              var recorded_values =
              {
                  x: time,
                  y: hemoglobin,
                  type: 'scatter',
                  name: 'Patient ID: 1577780'
              };

              var recorded_values_1 =
              {
                  x: time,
                  y: hemoglobin_1,
                  type: 'scatter',
                  name: 'Patient ID: 1291938'
              };

              var recorded_values_2 =
              {
                  x: time,
                  y: hemoglobin_2,
                  type: 'scatter',
                  name: 'Patient ID: 765583'
              };

              var recorded_values_3 =
              {
                  x: time,
                  y: hemoglobin_3,
                  type: 'scatter',
                  name: 'Patient ID: 1157764'
              };

              var average =
              {
               x: time,
               y: [130,130,130,130],
               mode: 'lines',
               name: 'average values',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, recorded_values_1,recorded_values_2,recorded_values_3, average];

              var layout =
              {
               title:'Hemoglobin grams/dL'
              };
              Plotly.newPlot("plot1", data, layout);


              // Platelet Count plot
              var recorded_values =
              {
                  x: time,
                  y: platelet,
                  type: 'scatter',
                  name: 'Patient ID: 1577780'
              };

              var recorded_values_1 =
              {
                  x: time,
                  y: platelet_1,
                  type: 'scatter',
                  name: 'Patient ID: 1291938'
              };

              var recorded_values_2 =
              {
                  x: time,
                  y: platelet_2,
                  type: 'scatter',
                  name: 'Patient ID: 765583'
              };

              var recorded_values_3 =
              {
                  x: time,
                  y: platelet_3,
                  type: 'scatter',
                  name: 'Patient ID: 1157764'
              };

              var average =
              {
               x: time,
               y: [250,250,250,250],
               mode: 'lines',
               name: 'average values',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, recorded_values_1,recorded_values_2,recorded_values_3, average];

              var layout =
              {
               title:'Platelet Count billion/L'
              };
              Plotly.newPlot("plot2", data, layout);

              // Red Blood Count plot
              var recorded_values =
              {
                  x: time,
                  y: rbc,
                  type: 'scatter',
                  name: 'Patient ID: 1577780'
              };

              var recorded_values_1 =
              {
                  x: time,
                  y: rbc_1,
                  type: 'scatter',
                  name: 'Patient ID: 1291938'
              };

              var recorded_values_2 =
              {
                  x: time,
                  y: rbc_2,
                  type: 'scatter',
                  name: 'Patient ID: 765583'
              };

              var recorded_values_3 =
              {
                  x: time,
                  y: rbc_3,
                  type: 'scatter',
                  name: 'Patient ID: 1157764'
              };

              var average =
              {
               x: time,
               y: [4.52, 4.52, 4.52, 4.52],
               mode: 'lines',
               name: 'average values',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, recorded_values_1,recorded_values_2,recorded_values_3, average];

              var layout =
              {
               title:'Red Blood Count trillion cells/L'
              };
              Plotly.newPlot("plot3", data, layout);

              // White Blood Count plot
              var recorded_values =
              {
                  x: time,
                  y: wbc,
                  type: 'scatter',
                  name: 'Patient ID: 1577780'
              };

              var recorded_values_1 =
              {
                  x: time,
                  y: wbc_1,
                  type: 'scatter',
                  name: 'Patient ID: 1291938'
              };

              var recorded_values_2 =
              {
                  x: time,
                  y: wbc_2,
                  type: 'scatter',
                  name: 'Patient ID: 765583'
              };

              var recorded_values_3 =
              {
                  x: time,
                  y: wbc_3,
                  type: 'scatter',
                  name: 'Patient ID: 1157764'
              };

              var average =
              {
               x: time,
               y: [7,7,7,7],
               mode: 'lines',
               name: 'average values',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, recorded_values_1,recorded_values_2,recorded_values_3, average];

              var layout =
              {
               title:'White Blood Cell Count billion cells/L'
              };
              Plotly.newPlot("plot4", data, layout);
          }
        //     else
        //     {
        //       $("content").empty();
        //       $("content").append(
        //           '<p>sorry bro not here</p>'
        //       )
        // };
