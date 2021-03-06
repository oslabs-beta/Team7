/**
 * @author : Roseanne Damasco; July 29, 2020
 * @function : displays request and corresponding server result in tropicRPC output channel
 * @param : {object} tropicChannel - reference to tropicRPC's output channel
 * @param : {string} service - service of gRPC request
 * @param : {string} method - method of gRPC request
 * @param : {object} message - body of gRPC request
 * @param : {string} responseStr - server response message
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

import * as vscode from 'vscode';

const displayOuptMessage: Function = (
  tropicChannel: vscode.OutputChannel,
  service: string,
  method: string,
  message: object,
  responseStr: string
) => {
  // generate formatted request message string
  const requestStr: string = JSON.stringify(
    {
      service,
      method,
      message,
    },
    null,
    2
  );

  // focus output to tropicRPC channel, and display request input
  const outputTemplate: string = `------------------------\n\nSUBMITTED REQUEST \n${requestStr}\n\nSERVER RESPONSE \n${responseStr}\n\n`;
  tropicChannel.show(true);
  tropicChannel.append(outputTemplate);
  return null;
};

module.exports = displayOuptMessage;
