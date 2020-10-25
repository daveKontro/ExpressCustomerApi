## Demo API using cURL

### start server

```
npm run dev
```

### register and authentication

- to parse json in command line
```
$ sudo apt install jq
```

- register a user
```
$ curl -X POST -H "Content-Type: application/json" -d "{ \"loginId\":\"<login id>\", \"password\":\"<password>\" }" http://localhost:3000/register
```

- get token
```
$ TOKEN=$(curl -X POST -H "Content-Type: application/json" -d "{ \"loginId\":\"<login id>\", \"password\":\"<password>\" }" http://localhost:3000/auth | jq -r '.token')
$ echo $TOKEN
```

### CRUD with token

- create employee
```
$ curl -X POST -H 'Content-type: application/json' -H "Authorization: Bearer ${TOKEN}" -d "{ \"name\":\"john doe\", \"email\":\"johndoe@email.com\" }" http://localhost:3000/employees
```

- read all employees
```
$ curl -X GET -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://localhost:3000/employees
```

- read one employee
```
$ curl -X GET -H 'Accept: application/json' -H "Authorization: Bearer ${TOKEN}" http://localhost:3000/employees/<id>
```

- update employee
```
$ curl -X PUT -H 'Content-type: application/json' -H "Authorization: Bearer ${TOKEN}" -d "{ \"amount\":123456 }" http://localhost:3000/employees/<id>
```

- delete employee
```
$ curl -X DELETE -H "Authorization: Bearer ${TOKEN}" http://localhost:3000/employees/<id>
```