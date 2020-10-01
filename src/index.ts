import app from './app';
import "./config/database";

app.listen(app.get('port'), () => {
    console.log("Node server started.");
});