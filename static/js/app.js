const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
   
function init() {
  d3.json(url).then(function(data) {
let selector = d3.select("#selDataset");

// Use the D3 library to read in samples.json from the URL

  for (let i = 0; i < data.names.length; i++){
    selector
      .append("option")
      .text(data.names[i])
      .property("value", data.names[i]);
  };
  let firstSample = data.names[0];
  create_chart(firstSample);
  create_demographic(firstSample);
});
};

  function create_chart(sampleNames){
    d3.json(url).then(function(data) {
    let samples_data=data.samples;
    let samples_data_filtered=samples_data.filter(eachperson=>eachperson.id==sampleNames);
    let samples_data_filttered_index=samples_data_filtered[0];
    let otu_ids= samples_data_filttered_index.otu_ids;
    let otu_labels= samples_data_filttered_index.otu_labels;
    let sample_values=samples_data_filttered_index.sample_values;
    let otuname=otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    let trace1 = {
    x: sample_values.slice(0, 10).reverse(),
    y: otuname,
    type: "bar",
    orientation:"h",
    text: otu_labels.slice(0, 10).reverse(),
  };
    let bardata = [trace1]
    let layout = {
    title: `Dispay for the top 10 OTUs found for ${sampleNames}`
  };
  Plotly.newPlot("bar", bardata, layout);

  let trace2 = {
    x: otu_ids,
    y: sample_values,
    mode: "markers",
    marker: {
    colorscale:"Earth",
    color: otu_ids,
    size: sample_values,  
  },text:otu_labels
};
    let bubbledata = [trace2]
    let layout2 = {
    title: `Bubble chart for ${sampleNames}`
  };
  Plotly.newPlot("bubble", bubbledata, layout2);
});
  };

  function create_demographic(sampleNames){
    d3.json(url).then(function(data) {
    let Demographic_Info = data.metadata.filter(eachperson=>eachperson.id==sampleNames);
    console.log(Demographic_Info[0])
    let displaydata = d3.select("#sample-metadata");
    displaydata.html("")
    for (item in Demographic_Info[0]){
      displaydata.append("h6").text(`${item.toLowerCase()}: ${Demographic_Info[0][item]}`)
      
    }});
  };

 init();

function optionChanged(sampleNames) {
  d3.json(url).then(function(data) {
  create_chart(sampleNames);
  create_demographic(sampleNames);
});
};