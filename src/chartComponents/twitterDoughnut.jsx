const TwitterDoughnut = (props) => {
  const data = props.data;
  console.log(props.data);
  const womenPercent = (data.femaleSorry / data.female) * 100;
  const menPercent = (data.maleSorry / data.male) * 100;
  const total = womenPercent + menPercent;
  const womenLength = (womenPercent / total) * 600;
  const menLength = (menPercent / total) * 600;
  return null;
  // <Doughnut data={{ datasets: [{ data: [props.data.womenLength, props.data.menLength], backgroundColor: ['blue', 'hotpink'] }], labels: ['Women', 'Men'] }} />;
};

export default TwitterDoughnut;
