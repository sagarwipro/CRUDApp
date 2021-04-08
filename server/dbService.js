const mysql= require("mysql");

const dotenv=require('dotenv');


dotenv.config();

let instance = null;

const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err)=>{
if(err){
    console.log("DB Connection Error : "+err.message);
}
else
console.log("db "+connection.state);
});



class DbService{
static getDbServiceInstance(){
    return instance ? instance:new DbService();
}

async getAllData(){
    try{
        const res=await new Promise((resolve,reject)=>{
            const query="select * from names;";
            connection.query(query,(err,results)=>{
                if(err){
                    reject(new Error(err.message));
                }
                else
                resolve(results);
            });
        });
//        console.log(response);
        return res;
    } catch(error){
        console.log(error);
    }
}



async insertNewName(name){
    try{
        const dateAdded=new Date();
        const insertId=await new Promise((resolve,reject)=>{
            console.log("Inserting data into database.>>>");
            const query="insert into names (name,date_added) values (?,?);";
            console.log("Name = "+name);
            connection.query(query,[name,dateAdded],(err,result)=>{
                if(err) reject(new Error(err.message));
                resolve(result.insertId);
            })
        });
        return {
            id:insertId,
            name:name,
            dateAdded:dateAdded
        };
//        return insertId;
    } catch(error){
        console.log(error);
    }
}

async updateRowById(id,name){
    try{
        const res=await new Promise((resolve,reject)=>{
            const query="update names set name =? where id= ?";
            connection.query(query,[name,id],(err,result)=>{
                if(err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
        console.log(res);
        return res===1?true:false;
    }catch(error){
        console.log(error);
        return false;
    }
}


async getSearchedResult(name){
    try{
        const res=await new Promise((resolve,reject)=>{
            const query="select * from names where name=?;";
            connection.query(query,[name],(err,results)=>{
                if(err) reject(new Error(err.message));
                resolve(results);
            });
        });
        return res;
    } catch(error){
        console.log(error);
    }
}

async deleteRowById(id){
    id=parseInt(id,10);
    try{
        const res=await new Promise((resolve,reject)=>{
            const query="delete from names where id= ?";
            connection.query(query,[id],(err,result)=>{
                if(err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
 console.log(res);
        return res===1?true:false;
    } catch(error){
        console.log(error);
        return false;
    }
}

}

module.exports = DbService;