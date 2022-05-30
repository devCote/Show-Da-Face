const getModel = (imageUrl, modelId, modelVersionId) => {

  const USER_ID = process.env.REACT_APP_USER_ID;
  const PAT = process.env.REACT_APP_PAT;
  const APP_ID = 'bahanenko';
  const MODEL_ID = modelId;
  const MODEL_VERSION_ID = modelVersionId;
  const IMAGE_URL = imageUrl

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
}

// --- FACEDETECT MODEL ---
export const faceDetectModel = async (input) => {
  try {
    const modelVersionId = '45fb9a671625463fa646c3523a3087d5'
    const modelId = 'face-detection'
    const initModel = await getModel(input, modelId, modelVersionId)
    const model = await initModel.json()
    const faceDetectCoordinates =
      model.outputs[0].data.regions[0].region_info.bounding_box;
    return faceDetectCoordinates;
  } catch (err) {
    alert('FACEDETECT undefined', err);
    return {};
  }
};

// ___ GENERAL MODEL ____
export const generalModel = async (input) => {
  try {
    const modelId = 'general-image-recognition'
    const modelVersionId = 'aa7f35c01e0642fda5cf400f543e7c40'
    const initModel = await getModel(input, modelId, modelVersionId)
    const model = await initModel.json()
    const generalModelData = model.outputs[0].data.concepts;
    return generalModelData;
  } catch (err) {
    alert('GENERAL DATA undefined', err);
    return {};
  }
};

// --- DEMOGRAPHICS MODEL ---
export const demographicsModel = async (input) => {
  try {
    const raceModelId = 'ethnicity-demographics-recognition'
    const raceModelVersionId = 'b2897edbda314615856039fb0c489796'
    const race = await getModel(input, raceModelId, raceModelVersionId)
    const ageModelId = 'age-demographics-recognition'
    const ageModelVersionId = 'fb9f10339ac14e23b8e960e74984401b'
    const age = await getModel(input, ageModelId, ageModelVersionId)
    const genderModelId = 'gender-demographics-recognition'
    const genderModelVersionId = 'ff83d5baac004aafbe6b372ffa6f8227'
    const gender = await getModel(input, genderModelId, genderModelVersionId)
    const raceModel = await race.json()
    const ageModel = await age.json()
    const genderModel = await gender.json()
    const raceArr = raceModel.outputs[0].data.concepts;
    const ageArr = ageModel.outputs[0].data.concepts;
    const genderArr = genderModel.outputs[0].data.concepts;
    const model = { raceArr, ageArr, genderArr }
    return model;
  } catch (err) {
    alert('DEMOGRAPHICS undefined', err);
    return {};
  }
};

// --- CELEBRITY MODEL ---
export const celebrityModel = async (input) => {
  try {
    const modelId = 'celebrity-face-recognition'
    const modelVersion = '0676ebddd5d6413ebdaa101570295a39'
    const model = await getModel(input, modelId, modelVersion)
    const initModel = await model.json()
    const celebrityModelData = initModel.outputs[0].data.concepts;
    return celebrityModelData;
  } catch (err) {
    alert('CELEBRITY undefined', err);
    return {};
  }
};

