import { app } from '@azure/functions';
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential, EnvironmentCredential } from "@azure/identity";

import { getLastMonth, queryParams, totalResult } from "../utils.mjs"

app.http('PIVE-test-credentials', {

  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const credentials = await request.json();
    console.log("**************************")
    console.log(credentials)
    console.log("**************************")

    try {
      const result = await queryData(credentials);
      console.log(result);
      return {
        body: result,
        status: 200
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        body: error
      }
    }
  }
});

async function queryData({ AzureClientId, AzureTenantId, AzureClientSecret, SubscriptionId }) {

  process.env.AZURE_CLIENT_ID = AzureClientId;
  process.env.AZURE_TENANT_ID = AzureTenantId;
  process.env.AZURE_CLIENT_SECRET = AzureClientSecret;
  process.env.SUBSCRIPTION_ID = SubscriptionId;

  const scope = `/subscriptions/${SubscriptionId}`;

  try {
    console.log(process.env)
    const tokenCredential = new DefaultAzureCredential(new EnvironmentCredential());
    const client = new CostManagementClient(tokenCredential, SubscriptionId);

    let queryP = { ...queryParams, timePeriod: getLastMonth(new Date()) };
    console.log("Query request:")
    console.log(queryP);

    let result = await client.query.usage(scope, queryP);
    const { rows } = result;
    console.log("Application (Client) Id: ", AzureClientId);
    // console.log(rows)
    // console.log({ total: totalResult(rows) });

    return JSON.stringify({
      total: totalResult(rows),
      application_id: AzureClientId,
      error: null
    })
  } catch (error) {
    console.log("** ERROR IN QUERY **");
    throw new Error(error);
  }
}