const Repo = require('./repo')

class UsersRepo extends Repo {
    constructor() {
        super('users')
    }
}

module.exports = new UsersRepo();