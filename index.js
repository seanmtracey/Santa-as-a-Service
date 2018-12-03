var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

function main(params) {

    if(!params.WATSON_VISUAL_RECOGNITION_KEY){
        
        return {
            statusCode: 500,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ status : "err", message : `The parameter "WATSON_VISUAL_RECOGNITION_KEY" has not been set.` })
        };

    } else if(params.__ow_headers['content-type'] !== "application/json"){
   
        return {
            statusCode: 400,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ status : "err", message : `Invalid Content-Type headers. Got ${params.__ow_headers['content-type']}, expected "application/json"` })
        };
   
    } else if(params.__ow_method !== "post"){
   
        return {
            statusCode: 400,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ status : "err", message : `Invalid HTTP request verb. Got ${params.__ow_method}, expected POST` })
        };
   
    } else if(params.image){

        const imageBuffer = Buffer.from(params.image, 'base64');

        const visualRecognition = new VisualRecognitionV3({
            version: '2018-03-19',
            iam_apikey: params.WATSON_VISUAL_RECOGNITION_KEY
        });

        var params = {
            images_file: imageBuffer
        };

        return new Promise( (resolve, reject) => {

            visualRecognition.classify(params, function(err, res) {
                if (err) {
                // console.log(err);

                    reject({
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify(err)
                    });

                } else {
                    console.log(JSON.stringify(res, null, 2));

                    resolve( {
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify(res, null, 2)
                    } );

                }
            });

        } );


        /*return {
            headers : {
                "Content-Type" : "application/json"
            },
            body : {
                result : {
                    top : 0,
                    right : 0,
                    bottom : 0,
                    left : 0
                }
            }
        };*/

    }

}

exports.main = main;