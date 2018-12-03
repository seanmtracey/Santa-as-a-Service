function main(params) {

    if(params.__ow_headers['content-type'] !== "application/json"){
   
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

        return {
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
        };

    }

}

exports.main = main;