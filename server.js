const http = require("http");
const fs = require("fs");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

let json, html

const rl = readline.createInterface({ input, output });
  
rl.question("Please write path to json (for example, ./data.json )\n", name => {
    rl.question("Also please write path to html (for example, index.html )\n", filePath => {
        try{
            json = require(name);
            html = fs.readFileSync(filePath, "utf8");
        } catch(err){
            console.log("Error: ", err.message);
        }   
        rl.close();
    })
});

rl.on("close", () => {
    if(json && html){
        http.createServer((req, res) => {
            html = html.replace("{header}", json.header).replace("{message}", json.message);
            res.end(html)

        }).listen(3000, () => {
            console.log("Server is working on http://localhost:3000");
        })
    }
})

