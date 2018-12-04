function request(url, json) {
  console.log('json:', json);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      console.log(data);
    });
}

function jsonrpc(url, body) {
  const params = {
    jsonrpc: 2.0,
    id: 1,
    method: 'call',
    params: body,
  };
  return request(url,params);
}

export async function odooLogin(params) {
  const newParams = {
    ...params,
    db: 'TT',
  };
  return jsonrpc('/json/user/login', newParams);
}


export async function odooCall(params) {
  const { model, method, args = [], kwargs = {} } = params;
  const newParams = {
    model,
    method,
    args,
    kwargs,
  };
  // TODO:
  return jsonrpc(`/json/api?session_id=${JSON.parse(localStorage.userMSG).sid}`, newParams);
}