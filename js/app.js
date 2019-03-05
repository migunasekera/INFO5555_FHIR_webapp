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