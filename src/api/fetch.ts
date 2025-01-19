export async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) throw new Error(response.statusText);

  return (await response.text()) as T;
}

export async function fetchSatellites(response: string) {
  try {
    const data = await fetchApi(response);
    

    return data;
  } catch (error) {
    return `Error fetching data`;
  }
}

export function parseTleToArray(data: string): string[] {
  // Merging the white space to the index item below itself
  data = data.replace(/\n/g, " ");
  const dataArray = data.match(/(\S+|\s+)/g) || [];

  for (let i = 0; i < dataArray.length; i++) {
    if (/\s+/.test(dataArray[i])) {
      dataArray[i - 1] = dataArray[i - 1].concat(dataArray[i]);
      dataArray.splice(i, 1);
    }
  }

  return dataArray || [];
}

export function parseTleArrayToString(data: string[]): string {
  // Splitting the TLE data into individual items in an array
  return data.toString().replace(/,/g, "").split(" ").join(" ");
}

export function parseToJson(data: string) {
  let tle = parseTleToArray(data);

  let satelliteName = "";
  let lineOne = [];
  let lineTwo = [];

  // Gets the name of the satellite by grabbing everything before
  // the number 1 that is before all the other data
  for (let i = 0; i < tle.length; i++) {
    let valueAfter = "";
    if (i + 1 < tle.length) valueAfter = tle[i + 1];

    // Check if it has reached the classifications
    const reachedFirstLine =
      valueAfter.includes("U") ||
      valueAfter.includes("C") ||
      valueAfter.includes("S");
    if (tle[i].includes("1") && reachedFirstLine) {
      // Gets all the strings before
      satelliteName = tle.slice(0, i).join(" ");
      tle = tle.slice(i, tle.length);
    }
  }

  // Gets the first line of the TLE data by grabbing the first 9 strings left in the TLE data
  for (let i = 0; i < tle.length; i++) {
    if (i < 9) {
      lineOne.push(tle[i]);
    }
  }
  tle = tle.slice(9, tle.length);

  // Gets the second line of the TLE data by grabbing the rest of the strings left
  lineTwo = tle;
  tle = [];

  const satelliteData = {
    name: satelliteName,
    data: {
      lineOne,
      lineTwo,
    },
  };

  return JSON.parse(JSON.stringify(satelliteData));
}
