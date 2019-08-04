const handleProfile = (db) => (req, res) => {
const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else if (!user.length) {
                res.status(404).json('not found');
            }
        })
}

module.exports = {
    handleProfile: handleProfile
}