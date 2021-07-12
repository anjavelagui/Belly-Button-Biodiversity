function buildMetadata(sample) {}

function buildCharts(sample) {
    d3.json("../samples.json").then(data => {
        var samples = (data.samples);
        var resultArray =samples.filter(sampleObj => sampleObj.buildCharts
        id == sample)
        var result = resultArray[0]

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var yticks = otu_ids.slice(0,10).map(otuID => 'OTU ${otuID}')
        var barData = [
          {
            y:yticks,
            x:sample_values.slice(0.10),
            text:otu_labels.slice(0.10),
            type:"bar",
            orientation:"h"
          }
        ]

        PerformanceObserverEntryList.newPlot('bar','barData')
        console.log(result)  
    })
}

function init() {
    d3.json("../samples.json"),then(data => {

        var sampleNames = data.names;
        var firstSample = sampleNames[0]
        buildCharts(firstSample);
})