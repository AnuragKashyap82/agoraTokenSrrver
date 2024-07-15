const express  = require("express")
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const PORT = 3000;
const app = express();

app.get("/", function(req, res){
  const response = { statuscode: res.statusCode, message: "API Works!!!"};
  res.json({response, response});
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);


  ///
const app = express();
const port = 3000;

const APP_ID = '2b0bdd0de9f14d84bcff8fb037e452c3';
const APP_CERTIFICATE = '18aaec564fbb4443a8d1f5d8345f205a';

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



});