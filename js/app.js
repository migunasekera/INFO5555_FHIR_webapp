var smart = FHIR.client(config);


function getGraphs()
{
    var code = document.getElementById("code").value;
    //var bs = document.getElementById("bodysite").value;
	//var g = document.getElementById("gender").value;

    
	
	
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
            var hello = FHIR.client({
              serviceUrl: 'https://r3.smarthealthit.org',
              patientId: reference
            }
            );
            hello.patient.api.read()

          }





        


              
			  //console.log(r)
        console.log(r.data)
        
        
			  //console.log(r.data.entry[0].resource.gender)
        $("patient_info").empty();
              //document.getElementById('patient_info').innerHTML = '<h2> Patient Info</h2>' +'<b>' +'<\b>' + 
        //document.getElementById("patient_info").innerHTML = '<h2> Patient Info</h2>'+'<p>'+'<b>'+'Gender: '+'</b>'+r.data.entry[0].resource.gender+'</p>'+'<p>'+'<b>'+'Birthday: '+'</b>'+r.data.entry[0].resource.birthDate+'</p>'+'<p>'+'<b>';
              
              

              patient_id = r.data.entry[0].resource.id;
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
      )
}
