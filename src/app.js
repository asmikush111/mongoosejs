const mongoose =require('mongoose');


//create database
mongoose.connect("mongodb://localhost:27017/databasename",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("connnection successful."))
.catch((err)=> console.log(err));

//create collection schema
const playlistSchema=new mongoose.Schema({
    name:{type:String,
          required:true},
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{type:Date,
          default:Date.now}
})

//create collection
const Playlist =new mongoose.model("Playlist",playlistSchema);

//insert document

const createDocument =async ()=>{
   try{
      const reactPlaylist=new Playlist({
            name:"React JS", ctype:"Front End",videos:50, author:"asmi" ,active:true
      })
      const nodePlaylist=new Playlist({
            name:"Node JS", ctype:"Back End",videos:40, author:"asmi" ,active:true
      })
      const mongoPlaylist=new Playlist({
            name:"Mongo DB", ctype:"DataBase",videos:30, author:"asmi" ,active:true
      })

      //for single insert
      //const result =await reactPlaylist.save();
      //for multiple insert
      const result =await Playlist.insertMany([reactPlaylist,nodePlaylist,mongoPlaylist]);
      console.log(result);
   }
   catch(err){
      console.log(err);
   }
}
createDocument();

//read document

const getDocument=async()=>{
      try{
            const result=await Playlist.find({videos:{$not :{ $eq :40}}})
            .select({_id:0});
            console.log(result);
      }
      catch(err){ console.log(err); }
}
getDocument();

const updateDocument=async (name)=>{
      try{
            const result=await Playlist.updateMany({name},{$set:{videos:10}},{new:true,useFindAndModify:false});
            console.log(result);
      }
      catch(err){
            console.log(err);
      }
}
updateDocument('React JS');

//delete documents

const deleteDocument=async(name)=>{
      try{
            const result=await Playlist.deleteMany({name});
            console.log(result);
      }
      catch(err){ console.log(err); }
}
deleteDocument('React JS');

//drop collection
const dropCollection=async()=>{
      try{
            const result=await Playlist.collection.drop();
            console.log(result);
      }
      catch(err){ console.log(err); }
}
dropCollection();


//drop database
const dropDatabase=async()=>{
      try{
            const result=await mongoose.connection.dropDatabase();
            console.log(result);
      }
      catch(err){ console.log(err); }
}
dropDatabase();




















