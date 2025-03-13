
# Opinion Trading App

A Opinion Trading App web App with websocket 


## Deployment

To deploy this project run

```bash
git clone https://github.com/astitva3110/Opinion-Trading-App.git
```

```bash
node app.js
```

## Documentation

Register Route


```bash
Post:http://localhost:3000/auth/register
```
```bash
{
     "name":"abc",
    "email":"admin@gmail.com",
    "password":"12345",
    //add role: admin if user is an admin 
}
```
```bash
{
    "message": "User registered successfully",
    "success": true
}
```

Login Route


```bash
Post:http://localhost:3000/auth/login
```
```bash
{
    "email":"admin@gmail.com",
    "password":"12345"
}
```
```bash
{
    "message": "Login Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkMmY3M2VhNmQ5OTBmNmY2YmRlZDg1Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTc0MTg3OTExNSxNzQyNDgzOTE1fQ.N_d8DZ4_-Cr3oiPIOMz19p_3RhW1-uLNwNVpzlBAIgQ",
    "success": true
}
```


User Route


```bash
Get:http://localhost:3000/user/profile
```

```bash
{
    "User": {
        "_id": "67d2e6b7e66a0ff4eb8d3997",
        "name": "abc",
        "email": "abc@gmail.com",
        "password": "$2b$10$t5Ft5B0f3urCpNLHO/xa9etkd49bvnR7wkUOeacPTGY7rg/duLMgy",
        "role": "user",
        "balance": 20,
        "__v": 0
    },
    "success": true
}
```

Event Route


```bash
Get:http://localhost:3000/event/active
```

```bash
{
    "Event": [
        {
            "_id": "67d1f6761c61dba88d82f621",
            "fixtureId": 1749755,
            "title": "Huracan vs San Martin de Formosa",
            "teamA": "Huracan",
            "teamB": "San Martin de Formosa",
            "liveScore": "? - ?",
            "preScore": "N/A",
            "status": "NOT STARTED",
            "time": "21:00",
            "isManual": false,
            "createdAt": "2025-03-12T21:02:46.639Z",
            "updatedAt": "2025-03-12T21:02:46.639Z",
            "__v": 0
        }
    ],
    "success": true
}
```

Trade Route


```bash
Post:http://localhost:3000/trade/bet/:id
```
```bash
{
   "amount":"40", 
   "betType":  "teamA"
}
```
```bash
{
    "message": "Bet placed successfully!",
    "trade": {
        "userId": "67d2e6b7e66a0ff4eb8d3997",
        "event": "67d2fa583a57d35c9702f1c3",
        "amount": 40,
        "status": "pending",
        "payout": 79.2,
        "_id": "67d2fb222e6ff6a433a34836",
        "createdAt": "2025-03-13T15:34:58.076Z",
        "updatedAt": "2025-03-13T15:34:58.076Z",
        "__v": 0
    }
}
```

Trade Route


```bash
Post:http://localhost:3000/trade/bet/:id
```
```bash
{
   "amount":"40", 
   "betType":  "teamA"
}
```
```bash
{
    "message": "Bet placed successfully!",
    "trade": {
        "userId": "67d2e6b7e66a0ff4eb8d3997",
        "event": "67d2fa583a57d35c9702f1c3",
        "amount": 40,
        "status": "pending",
        "payout": 79.2,
        "_id": "67d2fb222e6ff6a433a34836",
        "createdAt": "2025-03-13T15:34:58.076Z",
        "updatedAt": "2025-03-13T15:34:58.076Z",
        "__v": 0
    }
}
```

### Admin 

Create event Route


```bash
Post:http://localhost:3000/admin/create/event
```
```bash
{
"title":"INDIA VS ENGLAND World Cup",
"teamA":"INDIA",
"teamB":"ENGLAND",
"status":"NOT STARTED"
}
```
```bash
{
    "message": "Event created successfully!",
    "event": {
        "title": "INDIA VS ENGLAND World Cup",
        "teamA": "INDIA",
        "teamB": "ENGLAND",
        "liveScore": "0 - 0",
        "preScore": "N/A",
        "status": "NOT STARTED",
        "time": "0",
        "isManual": false,
        "_id": "67d2f9022b3579d1f1829b50",
        "createdAt": "2025-03-13T15:25:54.455Z",
        "updatedAt": "2025-03-13T15:25:54.455Z",
        "__v": 0
    },
    "success": true
}
```


Trade Data Route


```bash
Get:http://localhost:3000/admin/trade
```
```
```bash
{
    "Trade": [
        {
            "_id": "67d2f304b1192d0fd8c0e350",
            "userId": "67d2e6b7e66a0ff4eb8d3997",
            "event": "67d1f6761c61dba88d82f621",
            "amount": 40,
            "status": "pending",
            "payout": 79.2,
            "createdAt": "2025-03-13T15:00:20.634Z",
            "updatedAt": "2025-03-13T15:00:20.634Z",
            "__v": 0
        },
    ],
    "success": true
}
```

Edit event Route


```bash
Post:http://localhost:3000/admin/edit/:id
```
```bash
{
    "status":"FINISHED"
}
```
```bash
{
    "message": "Event updated successfully!",
    "event": {
        "_id": "67d2f9022b3579d1f1829b50",
        "title": "INDIA VS ENGLAND World Cup",
        "teamA": "INDIA",
        "teamB": "ENGLAND",
        "liveScore": "0 - 0",
        "preScore": "N/A",
        "status": "FINISHED",
        "time": "0",
        "isManual": false,
        "createdAt": "2025-03-13T15:25:54.455Z",
        "updatedAt": "2025-03-13T15:32:21.240Z",
        "__v": 0
    },
    "success": true
}
```
## Features

- WebSocket is implemented for real-time updates.
- Betting payouts are applied.


