import mongoose from "mongoose"

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/Brainly') // 0.0.0.0 for localhost, DatabaseName is the name of the database
        .then(() => console.log('🐰🐼🐼MongoDB Connected...✅✅✅ ... 🐼🐼🐰'))
        .catch(err => console.log(err));
}

export default connectDB;