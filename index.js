const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const dataR = {
  title: "Ash",
  level: "Easy Peasy",
  ingredients: ["n", "l", "a"],
  cuisine: "cuis",
};
// Connection to the database "recipe-app"
// data.forEach(element => { Recipe.create(element)})

async function runMongo() {
  try {
    const self = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    // Run your code here, after you have insured that the connection was made
    const tttt = await Promise.all(
      Object.values(data).map((x) => Recipe.create(x))
    );

    const recipe = await Recipe.update(
      { title: "Rigatoni alla Genovese" },
      { duration: 100, cuisine: "r", title: "Rigatoni alla Genovese" }
    );
    const t = await Recipe.findOne({ title: "Rigatoni alla Genovese" });
    console.log("Updated successfully  ");
    //const t1 = await Recipe.findOne({ title: 'Carrot Cake' });
    //console.log("deleted ", t1);
    const d=await Recipe.deleteOne({ title: 'Carrot Cake' })
    console.log("deleted one Item successfully");
    self.connection.close;
  } catch (error) {
    console.log(error);
  }
}
runMongo();
