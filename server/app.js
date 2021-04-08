var express=require("express");
const app=express();

const cors=require("cors"); //For api calls

const dotenv=require("dotenv"); //We save our database info here like password,ID,PORT,etc.


dotenv.config(); //We can use .env file when we need to

const dbService = require("./dbService");
const { response } = require("express");

app.use(cors()); //when we get incoming api call, it can block it and send data to our backend.
app.use(express.json()); //That it can send data into Json format.

app.use(express.urlencoded({extended:false}));

const port=process.env.PORT;
const hostname=process.env.HOST;


//We will use CRUD here.

//CREATE


app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    console.log("APP>JS>>>Inserting the data");
    const result = db.insertNewName(name);

    result.then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});


//READ

app.get('/getAll',(req,res)=>{
const db=dbService.getDbServiceInstance();
console.log("GetAll Function called.");
//res.sendFile('index.html',{root:'wamp64/www/fullstackApp/client/'});
 const result=db.getAllData();
 result.then(data=>res.json({data:data}))
 .catch(err=>console.log(err));
});


app.get('/search/:name',(req,res)=>{
    const {name}=req.params;
    const db=dbService.getDbServiceInstance();
    console.log("search Function called.");
     const result=db.getSearchedResult(name);
     result.then(data=>res.json({data:data}))
     .catch(err=>console.log(err));
    });
    

    //UPDATE

app.patch('/update',(req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const db=dbService.getDbServiceInstance();
    console.log("Update Function called from app.js");
    const result=db.updateRowById(id,name);
    result.then(data=>res.json({success:data}))
    .catch(err=>console.log(err));
    });
    



//DELETE

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const db=dbService.getDbServiceInstance();
    console.log("delete Function called from app.js and parameters are "+req.params.id);
    const result=db.deleteRowById(id);
    console.log(result);
    result.then(function(result){
        console.log("Returning value from dbServices is "+result);
    })
    result.then(data=>res.json({success:data}))
    .catch(err=>console.log(err));
    });
    


//PortListner 


app.listen(process.env.PORT,process.env.HOST, () => {
    console.log("App is running");
});