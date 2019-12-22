module.exports = {
  success: (data) => {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-requested-with'
      },
      statusCode: 200,
      body: data ? JSON.stringify(data) : ''
    }
  },

  failure: (err) => {
    console.error(err)
    let msg = err.message
    if (!msg) msg = err
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'x-requested-with'
      },
      statusCode: 500,
      body: JSON.stringify({ error: msg })
    }
  }
}
