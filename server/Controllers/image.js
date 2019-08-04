const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '26cde3aa1c5641ea8b08eda303b1a55f'
  });

  const handleApiCall = () => (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
  }


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('enteries', 1)
    .returning('enteries')
    .then(enteries => {
        res.json(enteries[0]);
    })
    .catch(err => res.status(400).json('enable to set enteries'));
}

module.exports = {
    handleImage,
    handleApiCall
}