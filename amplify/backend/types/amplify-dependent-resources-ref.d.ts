export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "administratorsGroupRole": "string",
            "teachersGroupRole": "string",
            "studentsGroupRole": "string"
        }
    },
    "function": {
        "postConfirmationLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "AdminQueriescf1cdf40": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "sendEmail": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}