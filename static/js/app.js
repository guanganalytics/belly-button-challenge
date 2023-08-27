
// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
  
  
// function plotMetric(x){
  // d3.json(url).then((data) => {
  
  let samples_data=data.samples;
  let samples_data_filtered=samples_data.filter(eachperson=>eachperson.id==940);
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
    title: `Dispay for the top 10 OTUs found for ${940}`
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
    text:otu_labels
  },};

  let bubbledata = [trace2]
  let layout2 = {
    title: `Bubble chart for ${940}`
  };

Plotly.newPlot("bubble", bubbledata, layout2);



  let Demographic_Info = data.metadata[0];
  let displaydata = d3.select("#sample-metadata");
  for (item in Demographic_Info){displaydata.append("h6").text(`${item.toLowerCase()}: ${Demographic_Info[item]}`);


}});