# Mock API REST

**An API REST to mock any other one.**

Fake a response body, status, headers or delay the response.

## Usage

Make an HTTP request and specify the search params status, body, header or delay.
any pathname or method will be ignored.

### Body

Specify a search body param to retrieve a response with that body.

```http
GET https://mockup-api.deno.dev/?body=hola


HTTP/1.1 200 OK
content-type: text/plain
content-length: 4
date: Sun, 04 Jul 2021 15:13:01 GMT

hola
```

### Code Status

Specify a search status param get back that code status.
The status must be inside the range 200 to 599.

```http
GET https://mockup-api.deno.dev/?status=301


HTTP/1.1 301 Moved Permanently
content-type: text/plain
content-length: 0
date: Sun, 04 Jul 2021 15:15:35 GMT
```

### Headers

Specify a search header param as json string to get them back.

```http
GET https://mockup-api.deno.dev/?headers={"x-hello":"world"}


HTTP/1.1 200 OK
x-hello: world
content-length: 0
date: Sun, 04 Jul 2021 15:26:11 GMT
```

### Delay

Specify a search delay param in milliseconds in order to delay the response.

```http
GET https://mockup-api.deno.dev/?delay=1000
```

## Example

Here a json response as example.

```http
GET https://mockup-api.deno.dev/?body={"a":1}&headers={"content-type":"application/json"}


HTTP/1.1 200 OK
content-type: application/json
content-length: 7
date: Sun, 04 Jul 2021 15:31:36 GMT

{
  "a": 1
}
```
