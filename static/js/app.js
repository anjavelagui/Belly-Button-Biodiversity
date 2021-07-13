function buildMetadata(sample) {
  console.log(sample)

  d3.json("../../samples.json").then(data => {
    var metadata = data.metadata;
    console.log(metadata)
    var resultArray = samples.filter(sampleObj => samplesObj.id == sample)
    var result = resultArray[0]
  })    
}

function buildCharts(sample) {
    d3.json("../../samples.json").then(data => {
      console.log(data) 
      var samples = data.samples;
        var resultArray = samples.filter(sampleObj => samplesObj.id == sample)
        var result = resultArray[0]
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var yticks = otu_ids.slice(0,10).map(otuID => 'OTU ${otuID}').reverse();
        var barData = [
          {
            y:yticks,
            x:sample_values.slice(0.10).reverse(),
            text:otu_labels.slice(0.10).reverse(),
            type:"bar",
            orientation:"h"
          }
        ]
        Plotly.newPlot("bar", barData)

        //Building the Bubble Chart
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          margin: { t: 0},
          hovermode: "closest",
          xaxis: { title: "OTU ID" },
          margin: { t: 30}
        };
        var buvvleData = [
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
                 
    })
}
//Performance ObserverEntryList.newPlot('bar','barData')

function init() {
  var selector = d3.select("#selDataset");

  d3.json("../../samples.json").then(data => {
    var sampleNames = data.names;
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    })
           
    var firstSample = sampleNames[0]
    buildCharts(firstSample);
    buildMetadata(firstSample);
  })
} 
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);

}   
init();