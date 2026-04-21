const dotenv = require("dotenv");
dotenv.config();
const { createApp } = require("./app");
const { PORT, HOST } = process.env;


async function setupServer() {
    console.log("Going to create app...");
    const app = await createApp();


    app.listen(parseInt(PORT), HOST, (err) => {
        if (err) {
            console.error("Failed to start server:", err);
            process.exit(1);
        }
        console.log(`Server listening on http://${HOST}:${PORT}`);
    });
}

setupServer().catch((err) => console.error(err));
