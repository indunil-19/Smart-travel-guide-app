export const icon = (val) => {
  var answer = "";
  switch (val) {
    case "Dry":
      answer = "weather-sunny";
      console.log(val);
      break;
    case "Intermediate":
      answer = "snowflake";
      break;
    case "Wet":
      answer = "weather-rainy";
      break;
    case "Hiking":
      answer = "hiking";
      break;
    case "Camping":
      answer = "fire";
      break;
    case "Swimming":
      answer = "swim";
      break;
    case "Reliogous":
      answer = "church";
      break;
    case "Catholic":
      answer = "church";
      break;
    case "Buddhism":
      answer = "buddhism";
      break;
    case "Hindu":
      answer = "hinduism";
      break;
    case "Islam":
      answer = "islam";
      break;
    case "Beaches":
      answer = "beach";
      break;
    case "Gardens":
      answer = "flower";
      break;
    case "Natural":
      answer = "tree-outline";
      break;
    case "Animal":
      answer = "elephant";
      break;
    case "Ancient":
      answer = "castle";
      break;
    case "Parks":
      answer = "dog-side";
      break;
    case "Riding boats":
      answer = "rowing";
      break;
    case "Surfing":
      answer = "weather-windy";
      break;

    default:
      answer = "star-outline";
  }
  return answer;
};
