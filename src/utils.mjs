export const queryParams = {
  type: "ActualCost",
  dataset: {
    granularity: "None",
    aggregation: {
      "totalCost": {
        "name": "PreTaxCost",
        "function": "Sum"
      }
    },
    grouping: [
      {
        "type": "Dimension",
        "name": "ResourceId"
      },
      {
        "type": "Dimension",
        "name": "ChargeType"
      },
      {
        "type": "Dimension",
        "name": "PublisherType"
      }
    ]
  },
  timeframe: "Custom",
  timePeriod: {
    from: '2023-09-01T00:00:00+00:00',
    to: '2023-10-01T00:00:00+00:00'
  }
}

export function totalResult(rows) {
    let total = 0
    for (let row of rows) {
        total += row[0]
    }
    return total
}

function adjustTimeZone(date) {
    const off = -date.getTimezoneOffset() / 60

    date = date.getUTCDate() <= 1
        ? new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate(), off)
        : new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate(), off + 23, 59, 59)

    return date.toISOString().replace(".000Z", "+00:00")
}

export function getLastMonth(today) {
    const month = today.getMonth()
    const pastMonth = month > 1 ? month - 1 : 12
    const timeZoneOffset = -today.getTimezoneOffset() / 60

    const from = adjustTimeZone(new Date(today.getFullYear(), pastMonth, 1, +timeZoneOffset))
    const to = adjustTimeZone(new Date(today.getFullYear(), month, 0, +timeZoneOffset))

    console.log(from)
    console.log(to)

    return { from, to }
}
