const express  = require("express")
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const PORT = process.env.PORT || 3000
const app = express();

app.get("/", function(req, res){
  const response = { statuscode: res.statusCode, message: "API Works!!!"};
  res.json({response, response});
});


const APP_ID = '23922b79cd2f479bbef32999ee319d04';
const APP_CERTIFICATE = '78cbb97b3d914e65bb6c28dee9c02b12';

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