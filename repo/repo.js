const supabase = require('../util/db')

class Repo {
    collection;
    constructor(collection){
        this.collection = collection;
    }

    async insert(obj){
        return (await supabase.from(this.collection).insert([ obj ])).data
    }
    async find(props){
        return (await supabase.from(this.collection).select().match(props)).data
    }
}

module.exports = Repo;