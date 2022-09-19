import { toDiabetesEvent } from "../models";
import type { DiabetesEvent } from "../models";

const diabetesEventApiUrl = "https://localhost:5001/api/DiabetesEvent";

const getData = async () => {
  console.debug("getData")
  const requestOptions = {
    method: 'GET',
  };

  return new Promise<DiabetesEvent[]>(async (resolve) => {
    const response = await fetch(diabetesEventApiUrl, requestOptions);

    response.json()
      .then((content : any[]) => {
        console.log(content)
        
        const deserialized = content.map(toDiabetesEvent);

        resolve(deserialized);
      });
  });
}

const postRandom = async () => {
  console.debug("postRandom")
  const random = Math.floor(Math.random() * 2);
  const randomUnit = ["units", "mmol/L"][random];

  const diabetesEvent = {
    timestamp: new Date(),
    type: random,
    value: Math.random() * 5 + 2,
    unit: randomUnit
  };

  await post(diabetesEvent);
}

const post = async (diabetesEvent: DiabetesEvent) => {
  console.debug("post")
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diabetesEvent),
      cors: 'same-origin'
  };

  const newEntity = await fetch(diabetesEventApiUrl, requestOptions);
  const json = await newEntity.json()

  return toDiabetesEvent(json)
}

const deleteOneLog = async (id : string) => {
  const requestOptions = {
      method: 'DELETE',
  };

  await fetch(diabetesEventApiUrl + `/${id}`, requestOptions);
}

const deleteAllLogs = async () => {
  const requestOptions = {
      method: 'DELETE',
  };

  await fetch(diabetesEventApiUrl, requestOptions);
}

export { getData, postRandom, deleteAllLogs, post, deleteOneLog };