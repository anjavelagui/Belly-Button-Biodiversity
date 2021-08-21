function buildMetadata(sample) {
  console.log(sample)

  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata)
    var resultArray = metadata.filter(sampleObj => samplesObj.id == sample);
    var result = resultArray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key,value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });    
}
// Build Gauge using function 
function buildCharts(sample) {
  d3.json("samples.json").then((data => {
    console.log(data)
    var samples= data.samples;
    var resultArray= samples.filter(sampleObj => samplesObj.id == sample);
    var result= resultArray[0]
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
    
    var barData =[
      {
        y:ids.slice(0,10).map(otuID => 'OTU ${otuID}').reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
    ];

    var barLayout = {
      title: "Top 10 BAteria Cultures", margin: { t: 30, 1: 150}
    };

    Plotly.newPlot("bar", barData, barLayout);
  });


  function init() {
    //Building the Bubble Chart
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0},
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };

    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale:"Earth"
        }
      }
    ];
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  }

  //Performance ObserverEntryList.newPlot('bar','barData')
  function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample);
      });

      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    }
  );
  }
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }

init();