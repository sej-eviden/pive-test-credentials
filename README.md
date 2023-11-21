# PIVE test credentials

## Purpose

Azure Function to test the Azure billing credentials.

Perform a `POST` request to <https://pive-test.azurewebsites.net/api/PIVE-test-credentials>.
Request shape:

```json
{
    "AzureClientId": "XXXX-XXXX-XXXX", 
    "AzureTenantId": "XXXX-XXXX-XXXX",
    "AzureClientSecret": "XXXX-XXXX-XXXX",
    "SubscriptionId": "XXXX-XXXX-XXXX"
}
```

To develop locally, you need to have the [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools) installed in your machine as well as [Node.js](https://nodejs.org/en/) and npm.

### Run locally

```powershell
npm install
func start
```

## Deployment

1. Compress the modified code

```powershell
Compress-Archive -Path '.\PIVE-test-credentials\*' -DestinationPath .\PIVE-test-credentials.zip
```

2. Deploy the new zip file

```powershell
az functionapp deployment source config-zip -g rg-PIVE-test -n PIVE-test --src '.\PIVE-test-credentials.zip'
```
