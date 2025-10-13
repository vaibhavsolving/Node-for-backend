
const cron = require('node-cron');

function sayHellow(){
    console.log("Hello Everyone! My name is vaibhav, I'll run 5 Times");
}


function startCron() {
    let count = 0;
    const task = cron.schedule('* * * * * *', () => {
        count++;
        sayHellow();

        if(count >= 5){
            console.log("Max execution reached. Stopping cron job.");
            task.stop();
        }
    });
    task.start();
};



module.exports = startCron;