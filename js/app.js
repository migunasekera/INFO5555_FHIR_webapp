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


};

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


function getGraphs()
{



    
	
	
	/*var name =
    {
        type: "Patient",
        query: {
            given: fname,
            family: lname,
			//gender: g
        }
    };
	*/
	
	 var cond =
	{
		type: "Condition",
		query: {
			code: code,
			//body-site: bs
		}
			
	}; 
	
	

    smart.api.search(cond).then(
      function(r)
        {
            // if (typeof(r.data.entry) != "undefined")
            // {

          var thing = ['apple','banana','mango']
          
          //console.log(smart.length)
          //var patients = r.data.entry;
          var patients = r.data.entry; // array of patients
          //var references = patients.resource.subject.reference; // patients identifier

          for(i = 0;i<patients.length;i++){
            var reference = patients[i].resource.subject.reference;
            console.log(reference.replace("Patient/",""))
            // var hello = FHIR.client({
            //   serviceUrl: 'https://r3.smarthealthit.org',
            //   patientId: reference.replace("Patient/", "")
            // }
            // );
            // console.log(hello.patient.api.read());

          }





        


              
			  //console.log(r)
        console.log(r.data)
        
        
			  //console.log(r.data.entry[0].resource.gender)
        $("patient_info").empty();
              //document.getElementById('patient_info').innerHTML = '<h2> Patient Info</h2>' +'<b>' +'<\b>' + 
        //document.getElementById("patient_info").innerHTML = '<h2> Patient Info</h2>'+'<p>'+'<b>'+'Gender: '+'</b>'+r.data.entry[0].resource.gender+'</p>'+'<p>'+'<b>'+'Birthday: '+'</b>'+r.data.entry[0].resource.birthDate+'</p>'+'<p>'+'<b>';
              
              

              patient_id = r.data.entry[0].resource.id;
              $(plot1).empty()

              time = [2003, 2008, 2013];

              mcv_val = [90.7, 91, 98];
              gct_val = [15, 25, 30];
              alt_val = [10, 6, 38];
              bilirubin_val = [15, 45, 17];
			  
			  console.log('This is time', time);
              console.log('This is mcv_val', mcv_val);
              console.log('This is gct_val', gct_val);
              console.log('This is alt_val', alt_val);
              console.log('This is bilirubin_val', bilirubin_val);

              // MCV plot
              var recorded_values =
              {
                  x: time,
                  y: mcv_val,
                  type: 'scatter',
                  name: 'patient value'
              };

              var upper_lim =
              {
               x: time,
               y: [96,96,96],
               mode: 'lines',
               name: 'upper_limit',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var lower_lim =
              {
               x: time,
               y: [83,83,83], // all the same values - lowest value accept
               mode: 'lines',
               name: 'lower_lim',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, upper_lim, lower_lim];

              var layout =
              {
               title:'MCV values[fL]'
              };
              Plotly.newPlot("plot1", data, layout);


              // GCT plot
              var recorded_values =
              {
                  x: time,
                  y: gct_val,
                  type: 'scatter',
                  name: 'patient value'
              };

              var upper_lim =
              {
               x: time,
               y: [32,32,32],
               mode: 'lines',
               name: 'upper_limit',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var lower_lim =
              {
               x: time,
               y: [6,6,6], // all the same values - lowest value accept
               mode: 'lines',
               name: 'lower_lim',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, upper_lim, lower_lim];

              var layout =
              {
               title:'GCT values[iU/L]'
              };
              Plotly.newPlot("plot2", data, layout);

              // ALT plot
              var recorded_values =
              {
                  x: time,
                  y: alt_val,
                  type: 'scatter',
                  name: 'patient value'
              };

              var upper_lim =
              {
               x: time,
               y: [40,40,40],
               mode: 'lines',
               name: 'upper_limit',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var lower_lim =
              {
               x: time,
               y: [5,5,5], // all the same values - lowest value accept
               mode: 'lines',
               name: 'lower_lim',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, upper_lim, lower_lim];

              var layout =
              {
               title:'ALT values[iU/L]'
              };
              Plotly.newPlot("plot3", data, layout);

              // Bilirubin plot
              var recorded_values =
              {
                  x: time,
                  y: alt_val,
                  type: 'scatter',
                  name: 'patient value'
              };

              var upper_lim =
              {
               x: time,
               y: [70,70,70],
               mode: 'lines',
               name: 'upper_limit',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var lower_lim =
              {
               x: time,
               y: [0,0,0], // all the same values - lowest value accept
               mode: 'lines',
               name: 'lower_lim',
               line: {
                 color: 'rgb(0,0,0)'
               }
              };

              var data = [recorded_values, upper_lim, lower_lim];

              var layout =
              {
               title:'Bilirubin values[micromol/L]'
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
      )
}
