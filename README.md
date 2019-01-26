# Record Stacks
A web app which analyzes your DJ software's database file and provides analytics on your digital record collection. Currently under development and for Traktor only. 

The app utilizes a MERN stack, Passport and Charts.js for the visualization. Feel free to clone and run on localhost, it just needs to be connected to a MongoDB database by creating a "config" folder and keys.js file to export your mongoURI. Also, remember to run "npm install" in the root directory and the client folder as well.

![Imgur](https://i.imgur.com/9VXzc3m.png)

The simply inputs the NML database file created by their Traktor software. The xml data is parsed locally, sent to MongoDB for storage as a JSON object for each track.

On the graph page, Record Stacks brings the collection data back for more parsing so Charts.js can visualize the music library.

![Imgur](https://i.imgur.com/pBcmtVx.png)

![Imgur](https://i.imgur.com/QH12evD.png)

![Imgur](https://i.imgur.com/ILjgVE9.png)

![Imgur](https://i.imgur.com/nEOIo8o.png)