import connectDB from "./config/db.config";
import createApp from "./framework/web/app";


const PORT = process.env.PORT || 3005;

connectDB();

const app = createApp();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});