var smart = FHIR.client(config);

function getGraphs()
{
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;

    var name =
    {
        type: "Patient",
        query: {
            given: fname,
            family: lname
        }
    };

    smart.api.search(name).then(
      function(r)
        {
            // if (typeof(r.data.entry) != "undefined")
            // {
            //     //This is your HTML Output

              $("patient_info").empty();
              document.getElementById("patient_info").innerHTML = '<h2> Patient Info</h2>'+'<p>'+'<b>'+'Gender: '+'</b>'+r.data.entry[0].resource.gender+'</p>'+'<p>'+'<b>'+'Birthday: '+'</b>'+r.data.entry[0].resource.birthDate+'</p>'+'<p>'+'<b>';

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
