/* 
1. Use the inquirer npm package to get user input.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs, { writeFile } from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: "Type in your URL: ",
        name: "URL" 

    }])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;

    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image. 

    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr.png'));

    // 3. Create a txt file to save the user input using the native fs node module.

    fs.writeFile("URL.txt", url, (err) =>{
        if(err) throw err;
        console.log("QR code generated!");
    });
    // console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

