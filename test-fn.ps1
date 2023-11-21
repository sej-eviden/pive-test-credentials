$Body = @{
    # AzureClientId = '44af70f7-5def-4c53-88fa-f82a218b5891'
    AzureClientId = '44af70f7-5def-4c53-88fa-f82a218b5890'
    AzureTenantId = 'fbb4764e-16a0-454a-8adc-54b94dac24f6'
    AzureClientSecret = 'BGp8Q~JnBiBh-eeDyh2PqC9VWqsUYNy8Kp-eAatX'
    SubscriptionId = '0b6b4c37-f1bf-4ce2-a367-85ec50c803ea'
}

Invoke-WebRequest  http://localhost:7071/api/PIVE-test-credentials `
    -Method 'POST' `
    -Body $($body | ConvertTo-Json) `
    -ContentType 'application/json'