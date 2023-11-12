// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });

let corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST"
};

const RECIPIENTS = [
  "ajvargass@correo.udistrital.edu.co",   
  "contact@branak.com",
  "ralphman0@yahoo.com"
];

exports.handler = async function (event) {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  let params;
  switch (body.type) {
    case 'landing-page': {
      params = buildEmailFromLandingPage(body);
      break;
    }
    case 'booking' : {
      params = buildEmailFromBooking(body);
      break;
    }
    case 'contact' : {
      params = buildEmailFromContact(body);
      break;
    }
    default : {
      return {
        "isBase64Encoded": false,
        "statusCode": 400,
        "headers": corsHeaders,
        "body": "email type not recieved",
    }
    }
  }
  try {
    await ses.sendEmail(params).promise();
    return {
        "isBase64Encoded": false,
        "headers": corsHeaders,
        "statusCode": 200,
        "body": "Email sent succesfully",
    }
  } catch (error) {
    console.log(error);
    return {
        "isBase64Encoded": false,
        "statusCode": 500,
        "headers": corsHeaders,
        "body": JSON.stringify(error),
    }
  }
  
};

function buildEmailFromContact(body) {
  return {
    Destination: {
      ToAddresses: RECIPIENTS,
    },
    Message: {
      Body: {
        Text: {
          Data: body.mailContent
        },
      },

      Subject: { Data: body.subject },
    },
    Source: "BranakContact@branak.net",
  };
}

function buildEmailFromBooking(body) {
  return {
    Destination: {
      ToAddresses: RECIPIENTS,
    },
    Message: {
      Body: {
        Text: {
          Data: body.mailContent
        },
      },

      Subject: { Data: body.subject },
    },
    Source: "BranakBooking@branak.net",
  };
}

function buildEmailFromLandingPage(body) {
  return {
    Destination: {
      ToAddresses: RECIPIENTS,
    },
    Message: {
      Body: {
        Text: { 
          Data: `The folowing visitor wants to know more information about Branak: 
          name: ${body.first_name} ${body.last_name}
          email: ${body.email}
          country: ${body.country}
          phone type: ${body.phone_type}
          phone: ${body.phone}
          for whom: ${body.person_who_req}
          ` 
        },
      },

      Subject: { Data: "Branak Landing Page" },
    },
    Source: "BranakLandingPage@branak.net",
  };
}