# API Documentation for JoinEat Back-end

## User Sign Up API

- End Point: `/users/signup`
- Method: `POST`
- Request Headers:

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| Content-Type | String | Only accept `application/json`. |

- Request Body:

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| name     | String | Required    |
| email    | String | Required    |
| password | String | Required    |

- Request Body Example

```json
{
  "name": "test-1",
  "email": "test-1@test.com",
  "password": "test"
}
```

- Success Response: 200

| Field        | Type   | Description               |
| ------------ | ------ | ------------------------- |
| access_token | String | Access token from server. |
| user         | Object | User information          |

- Email Already Exists: 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error Message |

- Error Example

```json
{
  "error": "message"
}
```

## User Sign In API

- End Point: `/users/signin`
- Method: `POST`
- Request Headers:

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| Content-Type | String | Only accept `application/json` |

- Request Body

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| email    | String | Required    |
| password | String | Required    |

- Request Body Example:

```json
{
  "email":"test@test.com",
  "password":"test"
}
```

- Success Response: 200

| Field        | Type   | Description              |
| ------------ | ------ | ------------------------ |
| access_token | String | Access token from server |
| user         | Object | User information         |

- Success Resopnse Example

```json
{
  "data": {
    "access_token": "some_token",
    "user": {
      "user_id": "101010101010101010",
      "name": "Test",
      "email": "test@test.com"
    }
  }
}
```

- Sign In Failed: 403
- Client Error: 400
- Server Error Response: 500
- Error response example

```json
{
  "error": "message"
}
```

## Event Create API

- End Point: `/events/`
- Method: `POST`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Content-Type  | String | Only accept `application/json`.                               |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Body:

| Field            | Type    | Description |
| ---------------- | ------- | ----------- |
| latitude         | float   | Required    |
| longitude        | float   | Required    |
| shop_name        | String  | Required    |
| event_name       | String  | Required    |
| is_public        | Boolean | Required    |
| appointment_time | Object  | Required    |
| people_limit     | int     | Required    |

- Request Body Example

```json
{
  "latitude": 25.0388638,
  "longitude": 121.5325665,
  "shop_name": "八方雲集新生仁愛店",
  "event_name": "嘗試新出的牛肉麵！",
  "is_public": true,
  "appointment_time": {
    "year": 2023,
    "month": 8,
    "date": 15,
    "hour": 18,
    "minute": 30
  },
  "people_limit": 6
}
```

- Success Response: 200

| Field    | Type   | Description      |
| -------- | ------ | ---------------- |
| event_id | Object | User information |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": "010101010101010"
    }
  }
}
```

- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error Message |

- Error Example

```json
{
  "error": "message"
}
```

## Event Delete API

- End Point: `/events/:event_id`
- Method: `DELETE`
- Request Headers:

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| Content-Type | String | Only accept `application/json`. |

- Parameters

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | Number | Event's id  |

- Request Example

`http://[HOST_NAME]/api/[API_VERSION]/events/10`

- Success Response: 200

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| event_id | Object | containes `event_id` |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": "bdf460cd-9676-4cfe-88f7-5d1de488f3c2"
    }
  }
}
```

- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error Message |

- Error Example

```json
{
  "error": "message"
}
```

## Range Query API

- End Point: `/events`
- Method: `GET`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Query Parameters

| Field     | Type   | Description |
| --------- | ------ | ----------- |
| latitude  | Number | required    |
| longitude | Number | required    |

- Request Example: `https://[HOST_NAME]/api/[API_VERSION]/events?latitude=25.0388368&longitude=121.5325665`

- Success Response: 200

| Field       | Type           | Description             |
| ----------- | -------------- | ----------------------- |
| events      | Array          | Array of `Event Object` |
| next_cursor | String or NULL | Next page key.          |

- Success Response Example

```json
{
  "data": {
    "events": [
      {
        "event_id": "121212121212212121212",
        "host_id": "something",
        "picture": "http://13.54.3.89/static/fb29e9a0-f4e6-4097-8234-027da08f63f1.jpeg",
        "name": "來嘗試新出的牛肉麵吧！",
        "shop_name": "八方雲集新生仁愛店",
        "latitude": 25.0388368,
        "longitude": 121.5325665,
        "people_limit": 6,
        "people_joined": 6,
        "is_public": 1,
        "distance": 0.0,
        "is_joined": 1,
        "appointment_time": {
          "year": 2023,
          "month": 8,
          "date": 15,
          "hour": 18,
          "minute": 30
        }
      },
      {
        "event_id": "21212121212121",
        "host_id": "something",
        "picture": "http://13.54.3.89/static/fb29e9a0-f4e6-4097-8234-027da08f63f1.jpeg",
        "name": "麥噹噹 YYDS",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0400737,
        "longitude": 121.53261,
        "people_limit": 6,
        "people_joined": 6,
        "is_public": 1,
        "distance": 200.0,
        "is_joined": 1,
        "appointment_time": {
          "year": 2023,
          "month": 8,
          "date": 15,
          "hour": 18,
          "minute": 30
        }
      }
    ]
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Event Join API

- End Point: `/events/:event_id/join`
- Method: `POST`
- Request Headers:

| Field         | Type   | Description                      |
| ------------- | ------ | -------------------------------- |
| Authorization | String | Access token preceding `Bearer`. |

- Parameter

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | String | Event's id  |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": "1212121212121212"
    }
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Event Quit API

- End Point: `/events/:event_id/quit`
- Method: `POST`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Parameter

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | String | Event's id  |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": "111111111"
    }
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Event Search API

- End Point: `/events/search`
- Method: `GET`
- Request Header;

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Parameters:

| Field     | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| keyword   | String | keyword can be `event_id` or `event_name` |
| latitude  | Number | required                                  |
| longitude | Number | required                                  |

- Request Example: `https://[HOST_NAME]/api/[API_VERSION]/event/search?keyword=fb550c3b-aced-4757-90b6-07ce3a57480e&latitude=25.0388368&longitude=121.5325665`, `https://[HOST_NAME]/api/[API_VERSION]/event/search?keyword=木&latitude=25.0388368&longitude=121.5325665`

- Success Response: 200

| Field  | Type                    | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| events | Array of `event Object` | List of Events that fit in the keywords |

- Success Response Example:

```json
{
  "data": {
    "events": [
      {
        "event_id": "fb550c3b-aced-4757-90b6-07ce3a57480e",
        "host_id": "c82cb849-b3a5-4b61-88d6-8a13ca38865c",
        "picture": null,
        "name": "木",
        "shop_name": "木木木",
        "latitude": "26.028460",
        "longitude": "121.532550",
        "people_limit": 2,
        "people_joined": 1,
        "is_public": 0,
        "distance": 110040,
        "is_joined": 1,
        "appointment_time": {
            "year": "2023",
            "month": "9",
            "date": "17",
            "hour": "10",
            "minute": "30"
        }
      }
    ]
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Query Shop API

- End Point: `/events/shop`
- Method: `POST`
- Request Header;

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Parameters:

| Field     | Type   | Description              |
| --------- | ------ | ------------------------ |
| latitude  | Number | user latitude, required  |
| longitude | Number | user longitude, required |

- Request Example: `https://[HOST_NAME]/api/[API_VERSION]/events/shop?latitude=25.0388368&longitude=121.5325665`

- Request body:

| Field     | Type   | Description    |
| --------- | ------ | -------------- |
| latitude  | Number | shop latitude  |
| longitude | Number | shop longitude |

- Request body example:

```json
{
  "latitude": 25.0,
  "longitude": 121.11111
}
```

- Success Response: 200

| Field  | Type                    | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| events | Array of `event Object` | List of Events that fit in the keywords |

- Success Response Example:

```json
{
  "data": {
    "events": [
      {
        "event_id": "0136c91d-fc35-4de9-8e0f-18230d45ce41",
        "host_id": "c82cb849-b3a5-4b61-88d6-8a13ca38865c",
        "picture": null,
        "name": "6666",
        "shop_name": "6666666",
        "latitude": "26.038846",
        "longitude": "121.532550",
        "people_limit": 5,
        "people_joined": 1,
        "is_public": 1,
        "distance": 4448,
        "is_joined": 1,
        "appointment_time": {
            "year": "2023",
            "month": "8",
            "date": "15",
            "hour": "18",
            "minute": "30"
        }
    },
    {
        "event_id": "5020952e-0e1f-4b2f-8022-6a508ba4e907",
        "host_id": "c82cb849-b3a5-4b61-88d6-8a13ca38865c",
        "picture": null,
        "name": "6666",
        "shop_name": "6666666",
        "latitude": "26.038846",
        "longitude": "121.532550",
        "people_limit": 5,
        "people_joined": 1,
        "is_public": 1,
        "distance": 4448,
        "is_joined": 1,
        "appointment_time": {
            "year": "2023",
            "month": "8",
            "date": "15",
            "hour": "18",
            "minute": "30"
        }
      }
    ]
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Event Detail API

- End Point: `/events/:event_id`
- Method: `GET`

- Request Header;

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Query Parameters:

| Field     | Type   | Description |
| --------- | ------ | ----------- |
| latitude  | Number | required    |
| longitude | Number | required    |

Request Example: `http://[HOST_NAME]/api/[API_VERSION]/events/1?latitude=26.0288368&longitude=121.5325665`

- Success Response: 200

| Field  | Type                    | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| events | Array of `event Object` | List of Events that fit in the keywords |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "host_id": 1,
      "event_id": 1,
      "name": "吃一波",
      "shop_name": "麥當勞-台北濟南餐廳",
      "latitude": 25.0388368,
      "longitude": 121.5325665,
      "people_limit": 6,
      "people_num": 2,
      "distance": 0.0,
      "appointment_time": {
        "year": 2023,
        "month": 8,
        "date": 15,
        "hour": 18,
        "minute": 30
      },
      "is_joined": true,
      "participants": [
        {
          "id": "1",
          "name": "PJ",
          "picture": ""
        },
        {
          "id": "2",
          "name": "抽抽",
          "picture": ""
        }
      ]
    }
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## User Profile API

- Endpoint: `/users/:user_id`
- Method: `GET`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Parameters

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | Number | event's id  |

- Success Response Example

```json
{
  "data": {
    "user": {
      "user_id": "8ceb3d97-50e8-4a5c-8919-2b61bac02cb9",
      "name": "Test",
      "email": "test@test.com",
      "picture": "https://joineat-com/static/8ceb3d97-50e8-4a5c-8919-2b61bac02cb9.png",
      "introduction": "hello",
      "tags": "Programming"
    }
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Event History

- Endpoint: `/users/:user_id/events`
- Method: `GET`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Parameters

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| user_id | Number | user's id   |

- Query Parameters

| Field     | Type   | Description      |
| --------- | ------ | ---------------- |
| latitude  | number | user's latitude  |
| longitude | number | user's longitude |

- Request example

`http://localhost:3000/api/1.0/users/1111-11111-11111-11111/events?longitude=121&latitude=25`

- Success Response Example

```json
{
  "data": {
    "events": [
      {
        "event_id": "111111111",
        "host_id": "something",
        "name": "沒人可以打敗麥噹噹",
        "shop_name": "某家麥當勞",
        "latitude": 25.0388368,
        "longitude": 121.5325665,
        "is_public": 1,
        "people_limit": 6,
        "people_num": 6,
        "distance": 0.0,
        "appointment_time": {
          "year": 2023,
          "month": 8,
          "date": 15,
          "hour": 18,
          "minute": 30
        }
      },
      {
        "event_id": "222222222",
        "host_id": "something",
        "name": "麥噹噹 YYDS",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0400737,
        "longitude": 121.53261,
        "is_public": 0,
        "people_limit": 4,
        "people_num": 2,
        "distance": 502.3,
        "appointment_time": {
          "year": 2023,
          "month": 8,
          "date": 15,
          "hour": 18,
          "minute": 30
        }
      }
    ]
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## User's Profile Update API

- Endpoint: `/users/profile/`
- Method: `PUT`
- Request Headers:

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Body:

| Field        | Type   | Description |
| ------------ | ------ | ----------- |
| introduction | String | Optional    |
| tags         | String | Optional    |

- Request Body Example:

```json
{
  "introduction": "Hello, my name is Test1",
  "tags": "surfing"
}
```

- Success Response Example

```json
{
  "data": {
    "user": {
      "user_id": "8ceb3d97-50e8-4a5c-8919-2b61bac02cb9"
    }
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## User's Picture Update API

- End Point: `/users/picture`
- Method: `PUT`
- Request Headers:

| Field         | Type   | Description                        |
| ------------- | ------ | ---------------------------------- |
| Authorization | String | Access token preceding `Bearer `.  |
| Content-Type  | String | Only accept `multipart/form-data`. |

- Request Body

| Field   | Type | Description |
| ------- | ---- | ----------- |
| picture | File | Image File. |

- Success Response: 200

| Field   | Type   | Description |
| ------- | ------ | ----------- |
| picture | String | Image Link  |

- Success Response Example:

```json
{
  "data": {
    "picture": "http://joineat.com/static/8ceb3d97-50e8-4a5c-8919-2b61bac02cb9.png"
  }
}
```

- Client Error Response(no token): 401
- Client Error Response(wrong token): 403
- Client Error Response: 400
- Server Error Response: 500

| Field | Type   | Description   |
| ----- | ------ | ------------- |
| error | String | Error message |

## Friends API

## Friends Pending API

## Friends Request API

## Friends Agree API

## Delete Friend API

## Events Query Friendship
