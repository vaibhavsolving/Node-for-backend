
const cron = require('node-cron');
const fs = require("fs");     //inbuild
const path = require("path");  //inbuild  no need to install

const sourceDir = path.join(__dirname, "dataForCron");
const backupDir = path.join(__dirname, "backupData4Cron");



cron.schedule('0 2 * * *', async () => {
    try{
        const timestamp = new Date().toISOString().replace(/[:.]/g,"-");
        const destination = path.join(backupDir, `backup-${timestamp}`);

        await fs.cp(sourceDir, destination, {recursive: true}, (err) => {
            if(err){
                console.log("backup failed:", err);
            }else{
                console.log(`backupp created at ${destination}`);
            }
        })
    } catch (err) {
        console.error("❌ Backup Failed:", err);
  }
});




function sayHellow(){
    console.log("Hello Everyone! My name is vaibhav, I'll run 5 Times");
}

function startCron() {
    let count = 0;
    const task = cron.schedule(' 0 2 * * *', () => {
        count++;
        sayHellow();

        if(count >= 5){
            console.log("Max execution reached. Stopping cron job.");
            task.stop();
        }
    });
    task.start();
};


const task = () => {
    console.log("Running a scheduled task at: ", new Date());
};
cron.schedule("*/20 * * * * *", task);


module.exports = startCron;