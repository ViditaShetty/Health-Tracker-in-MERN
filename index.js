///ADDED THIS FOR MED REMINDER FEATURE
//*********HAVE TO LOGIN ***EVERYDAY*** TO TWILIO ***SANDBOX*** WHEN USING TESTING WHATSAPP MSG FEATURE
//OTHERWISE MAKE  A TEMPLATE AND GET IT APPROVED BY WHATSAPP IF U WANT TO USE IT LONGER THAN 24 HR PERIOD*/
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
//ADDED THIS **************************
//CRON=TO SEND DAILY MESSAGES AT MINS:HRS EG:OR 1.18 AM  TYPE 18 1***,function....  
//run using node index.js after cd to Reminder-app-with...
//and npm start after cd to reminder-app-frontend
const twilio = require('twilio')
const { ConnectionPolicyPage } = require('twilio/lib/rest/voice/v1/connectionPolicy')

var client = new twilio('ACe021554dc87badaef970e9d25e51c5f8', '3c30d59863f1e9895c233a9f96605097'),
cronJob = require('cron').CronJob;
var textJob = new cronJob( '43 9 * * *', function(){
    client.messages.create( { 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+918291589667', body:'Hello! Hope you’re having a good day!' }, function( err, data ) {
        console.log(err,data,"*");
    });
  },  null, true);
  //WE NEED TO ACCESS REMINDAT TIME(8 O CLOCK) AND SEND REMINDMSG AT THAT TIME DAILY USING CRON?????
//********************************* */
  
//APP config
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//DB config
mongoose.connect('mongodb://localhost:27017/reminderAppDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, () => console.log("DB connected"))
const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})
const Reminder = new mongoose.model("reminder", reminderSchema)


//Whatsapp reminding functionality

setInterval(() => {
    Reminder.find({}, (err, reminderList) => {
        if(err) {
            console.log(err)
        }
        if(reminderList){
            reminderList.forEach(reminder => {
                if(!reminder.isReminded){
                    const now = new Date()
                    if((new Date(reminder.remindAt) - now) < 0) {
                        Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                            if(err){
                                console.log(err)
                                
                            }
                            const accountSid = "ACe021554dc87badaef970e9d25e51c5f8" 
                            const authToken = "3c30d59863f1e9895c233a9f96605097"
                            const client = require('twilio')(accountSid, authToken); 
                            
                            ////add for cron for daily update***********8
                            var base=String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})));
                            console.log(base);
                            var minsRem=String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(-36,-34);
                            var hrsRem=String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(-39,-37);
                            console.log(hrsRem);
                            var daysRem=String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"}))).slice(0,3);                        
                            var daysRemNo=0;
                            var week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                            for(var i=0;i<7;i++){
                                if(week[i]==daysRem){
                               daysRemNo=i;    
                               }  }
                            console.log("***",minsRem,"***",hrsRem,"***",daysRemNo); 
                            var param1="* "+minsRem+" "+hrsRem+" * * "+daysRemNo;  
                            console.log("param1 for cron-job=",param1); 
                            //FOR SENDING MESSAGE THROUGH CRON+TWILIO WEEKLY FROM NOW ***********************  
                            //******SETTING SEC=58 OTHERWISE MESSAGE SENT FOR EVERY SECOND */                  
                            var textJob = new cronJob( 59+" "+minsRem+" "+hrsRem+" * * "+daysRemNo, function(){
                                client.messages 
                                .create({ 
                                    from: 'whatsapp:+14155238886',       
                                    to: 'whatsapp:+918291589667',//YOUR PHONE NUMBER INSTEAD OF 8888888888
                                    body: reminder.reminderMsg 
                                }) ;
                            },  null, true)                          
                             ////FOR SENDING MESSAGE NOW THROUGH TWILIO********
                            client.messages 
                            .create({ 
                                from: 'whatsapp:+14155238886',       
                                to: 'whatsapp:+918291589667',//YOUR PHONE NUMBER INSTEAD OF 8888888888
                                body: reminder.reminderMsg 
                            }).then(message => console.log("***",message.sid,"***",minsRem,hrsRem,daysRemNo)) 
                             .done()
                             
                            ////******** */end
                        })
                    }
                }
            })
        }
    })
},1000)
;


//API routes
app.get("/getAllReminder", (req, res) => {
    Reminder.find({}, (err, reminderList) => {
        if(err){
            console.log(err)
        }
        if(reminderList){
            res.send(reminderList)
        }
    })
})
app.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    })
    reminder.save(err => {
        if(err){
            console.log(err)
        }
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })

})
app.post("/deleteReminder", (req, res) => {
    Reminder.deleteOne({_id: req.body.id}, () => {
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })
})

app.listen(9000, () => console.log("Be started") )