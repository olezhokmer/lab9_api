const r = require('express').Router()
const usersRepo = require('../repo/users')
const User = require('../entities/user')
const parseXml = require('../util/xml')
const wToXmlResults = require('../util/wToXmlResults')
const fs = require('fs');
require('dotenv').config();
let parsed = null;
const response = async (res, str, isErr) => {
    await wToXmlResults(str)
    return isErr ? res.status(400).send(str) : res.json(str)
}

const parseAuthMsg = async () => {
    const xml = fs.readFileSync(process.cwd() + "/msg.xml", "utf8");
    parsed = await parseXml(xml);
} 

parseAuthMsg().then().catch(e => console.log("msg.xml not parsed."))

r.post('/reg', async (req, res) => {
    if(!parsed) return res.status(500).send("File not parsed");
    if(!req.body.u) return response(res, parsed.reg.emptyUsername[0], true)
    if(req.body.p.length < 6) return response(res, parsed.reg.shortPass[0], true)
    if(!req.body.country || !req.body.state || !req.body.city) return response(res, parsed.reg.placeNotMathed[0], true)

    const users = await usersRepo.find({ u : req.body.u })
    if(users.length > 0) return response(res, parsed.reg.userExists[0], true)

    const user = new User(req.body.u, req.body.p, req.body.country, req.body.state, req.body.city)
    await usersRepo.insert(user)
    return response(res, parsed.reg.success[0], false)
})

module.exports = r