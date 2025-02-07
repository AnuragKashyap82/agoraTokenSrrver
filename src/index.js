const express  = require("express")
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const PORT = process.env.PORT || 3000
const app = express();

app.get("/", function(req, res){
  const response = { statuscode: res.statusCode, message: "API Works!!!"};
  res.json({response, response});
});


const APP_ID = 'c444380a64844899b0732bcad7561e8d';
const APP_CERTIFICATE = 'a7dd6f0ec9b545b0a56a46f1226194bf';

app.get('/rtcToken', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: 'channelName is required' });
    }

    const uid = req.query.uid || 0; // default to 0 for anonymous users
    const role = req.query.role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    const expireTime = req.query.expireTime || 3600;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTimestamp + parseInt(expireTime, 10);

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);

    return res.json({ token, channelName });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});