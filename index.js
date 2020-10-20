const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios').default;
const queryString = require("query-string");

const app = express();
const port = process.env.PORT || 3000;


const url = "https://www.uptodate.com/register/AddressFormWebService.do?guid=";

var config = {
  proxy: {
    port: "3128",
    host: "200.188.161.160",
    auth: {
      username: "nedel",
      password: "en25031995",
    },
  },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/registerUptodate",async (req,res) =>{
    
    const formData = {
        formName: "INTERNATIONAL",
        fieldOptionalText: "(optional)",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fullName: `${req.body.firstName}_${req.body.lastName}_drp`,
        email: req.body.email,
        country: "VIE",
        zip: "50000",
        city: "HoChiMinhCity",
        specialty: "1",
        practiceType: "9",
        registrationUserName: req.body.registrationUserName,
        password: req.body.password,
        verifyPassword: req.body.verifyPassword,
      };
    
    const result = await axios
    .post(url, queryString.stringify(formData), config)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
    if(result) return res.status(201).json({result})
    else return res.status(400).json("Error!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})