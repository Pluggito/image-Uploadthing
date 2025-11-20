const express = require("express");
const cors = require("cors");
const { createUploadthing, createRouteHandler } = require("uploadthing/express");
require("dotenv").config();
const port = process.env.PORT || 5070;
const app = express();

app.use(cors({
  origin: [
     "https://hatsoff-wears.vercel.app",
    "http://localhost:5173"
  ]
}));
app.use(express.json()); // body parser

// UploadThing setup
const f = createUploadthing();

const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 2 },
  }).onUploadComplete(({ file }) => {
    console.log("Uploaded file URL:", file.url);
  }),
};

// Route handler
app.use(
  "/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config:{
        uploadthingId: process.env.UPLOADTHING_APP_ID,
        uploadthingSecret: process.env.UPLOADTHING_SECRET,
        uploadthingToken: process.env.UPLOADTHING_TOKEN,
    }
  })
);

app.listen(port, () => {
  console.log("Server running on http://localhost:5070");
});
