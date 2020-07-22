/**
 * @author : Ed Chow, Shahrukh Khan; July 20, 2020
 * @function : executes gRPC request submitted by user, and displays request and corresponding server result in Tropic output channel
 * @param : {number} port - port of user's running server
 * @param : {string} protoFilePath - absolute path to user's protofile
 * @param : {string} protoPackage - proto package name
 * @param : {string} service - service of gRPC to call
 * @param : {string} method - method of gRPC endpoint to invoke
 * @param : {object} message - body of request to send
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

import * as vscode from 'vscode';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const sendgRPCRequest = (
  port: number,
  protoFilePath: string,
  protoPackage: string,
  service: string,
  method: string,
  message: object,
  tropicChannel: vscode.OutputChannel
) => {
  // read proto file and save as package definition (protocol buffer)
  // protoLoader compiles proto files into JS
  const packageDef = protoLoader.loadSync(`${protoFilePath}`, {});
  // read package definition and save as grpc object
  const grpcObject = grpc.loadPackageDefinition(packageDef);
  // save grpc object's protoPackage object as user package
  const userPackage = grpcObject[`${protoPackage}`];
  // create a connection to the gRPC server, for a specific service
  // return an object with all of the methods within that service, and save as client
  // grpc.credentials.createInsecure(): communication will be in plain text, i.e. non-encrypted
  const client = new userPackage[service](`localhost:${port}`, grpc.credentials.createInsecure());

  // invoke client object's method
  client[`${method}`](message, (err, response) => {
    if (err) console.log('error in grpc request: ', err);

    // generate formatted Request and Response message string
    const requestStr = JSON.stringify(
      {
        service,
        method,
        message,
      },
      null,
      2
    );
    const responseStr = JSON.stringify(response, null, 2);
    const outputMessage = `------------------------\n\nSUBMITTED REQUEST \n${requestStr}\n\nSERVER RESPONSE \n${responseStr}\n\n`;

    // display request and response in tropic output channel
    tropicChannel.show(true);
    tropicChannel.append(outputMessage);

    // exit function
    return null;
  });
};

module.exports = sendgRPCRequest;