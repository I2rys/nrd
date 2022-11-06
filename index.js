(async()=>{
    "use strict";

    // Dependencies
    const nrdModule = require("./modules/nrd")
    const chalk = require("chalk")
    
    // Variables
    const nrd = {
        a: "Checking if system is a VM...",
        b: "Checking if system is a Sandboxie...",
        c: "Checking if IP is not residential...",
        d: "Checking if has any Network sniffers running..."
    }

    // Functions
    function log(type, message){
        if(type === "d"){
            console.log(`${chalk.gray(message)} ${chalk.greenBright("DETECTED")}`)
        }else if(type === "nd"){
            console.log(`${chalk.gray(message)} ${chalk.redBright("NOT DETECTED")}`)
        }else if(type === "n"){
            console.log(chalk.gray(message))
        }
    }
    
    // Main
    log("n", nrd.a)
    var result = nrdModule.isVM()
    
    result ? log("d", nrd.a) : log("nd", nrd.a)

    log("n", nrd.b)
    result = nrdModule.isSandboxie()
    result ? log("d", nrd.b) : log("nd", nrd.b)

    log("n", nrd.c)
    result = await nrdModule.isResidentialIP()
    result ? log("d", nrd.c) : log("nd", nrd.c)

    log("n", nrd.d)
    result = await nrdModule.hasSniffersRunning()
    result ? log("d", nrd.d) : log("nd", nrd.d)
})()