"use strict";

// Dependencies
const request = require("request-async")
const shellJS = require("shelljs")

// Variables
var nrd = {}

// Main
nrd.isVM = function(){
    const result = shellJS.exec("wmic computersystem get model", { silent: true }).stdout

    if(result.match("Virtual Machine")){
        return true
    }else{
        return false
    }
}

nrd.isSandboxie = function(){
    const result = shellJS.exec("tasklist", { silent: true }).stdout

    if(result.match("SbieSvc.exe")){
        return true
    }else{
        return false
    }
}

nrd.isResidentialIP = function(){
    return new Promise(async(resolve)=>{
        var result = await request("https://api.ipify.org/")
        result = await request(`https://hnisa.vercel.app/api/ip/info?ip=${result.body}`)

        JSON.parse(result.body).data.proxy === "yes" ? resolve(true) : resolve(false)
    })
}

nrd.hasSniffersRunning = function(){
    const processes = shellJS.exec("tasklist", { silent: true  }).stdout
    var result = false

    if(processes.match("Wireshark.exe")) result = true

    return result
}

module.exports = nrd