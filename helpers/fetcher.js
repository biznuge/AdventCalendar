var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

module.exports = class Fetcher{

    static doFile(path){
        
        return fs.readFileSync(path,{ encoding: 'utf8' });

    }

    static doRequest(options) {
        return new Promise(function (resolve, reject) {

            var buffer = [];

            let protocol = http;
            if (options.protocol=='https:') {
                protocol = https;
            }

            const req = https.request(options, function (res) {

                res.on('data', (chunk) => {
                    buffer.push(chunk);
                });

                res.on('end', () => {
                    
                    let body = null;
                    let gzip = false;
                    if ( "content-encoding" in res.headers ){
                        gzip = true;
                    }

                    let chunkBuffer = Buffer.concat(buffer);

                    if (gzip){

                        zlib.gunzip(chunkBuffer, function(error, data) {
                            if(!error) {

                                body = data.toString();
                                resolve(body);

                            } else {
                                reject(error);
                            }
                        });

                    }else{

                        body = chunkBuffer.toString();
                        resolve(body);

                    }


                });
            })

            req.on('error', (e) => {
                console.log(e);
                reject(e);
            });

            req.end();

        });
    }

};