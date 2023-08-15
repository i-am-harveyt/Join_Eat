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
  "name": "test-1"
  "email": "test-1@test.com",
  "password": "test",
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

```
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
      "user_id": 10,
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

## Event Launch API

- End Point: `/event/`
- Method: `POST`
- Request Headers:

| Field        | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| Content-Type | String | Only accept `application/json`. |

- Request Body:

| Field            | Type    | Description |
| ---------------- | ------- | ----------- |
| latitude         | float   | Required    |
| longitude        | float   | Required    |
| shop_name        | String  | Required    |
| event_name       | String  | Required    |
| is_public        | Boolean | Required    |
| appointment_time | String  | Required    |
| people_limit     | int     | Required    |

- Request Body Example

```json
{
  "latitude": 25.0388638,
  "longitude": 121.5325665,
  "shop_name": "八方雲集新生仁愛店",
  "event_name": "嘗試新出的牛肉麵！",
  "is_public": true,
  "appointment_time": "2023-08-15 11:40:00",
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
    "event_id": 10
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
        "event_id": 10,
        "name": "來嘗試新出的牛肉麵吧！",
        "shop_name": "八方雲集新生仁愛店",
        "latitude": 25.0388368,
        "longitude": 121.5325665,
        "people_limit": 6,
        "people_num": 6,
        "distance": 0.0
      },
      {
        "event_id": 12,
        "name": "麥噹噹 YYDS",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0400737,
        "longitude": 121.53261,
        "people_limit": 4,
        "people_num": 2,
        "distance": 502.3
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

- End Point: `/event/:event_id/join`
- Method: `POST`
- Request Headers:

| Field         | Type   | Description               |
| ------------- | ------ | ------------------------- |
| Authorization | String | Access token from server. |

- Parameter

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | String | Event's id  |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": 10
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

- End Point: `/event/:event_id/quit`
- Method: `POST`
- Request Headers:

| Field         | Type   | Description               |
| ------------- | ------ | ------------------------- |
| Authorization | String | Access token from server. |

- Parameter

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| event_id | String | Event's id  |

- Success Response Example:

```json
{
  "data": {
    "event": {
      "event_id": 10
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

- End Point: `/event/search`
- Method: `GET`
- Request Header;

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Parameters:

| Field   | Type   | Description                                                             |
| ------- | ------ | ----------------------------------------------------------------------- |
| keyword | String | If the keyword had a `0E` then it is `event_id`, otherwise `event_name` |

- Request Example:

- Request Example: `https://[HOST_NAME]/api/[API_VERSION]/event/search?keyword=0E10`, `https://[HOST_NAME]/api/[API_VERSION]/event/search?keyword=麥噹噹`

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
        "event_id": 5,
        "name": "沒人可以打敗麥噹噹",
        "shop_name": "某家麥當勞",
        "latitude": 25.0388368,
        "longitude": 121.5325665,
        "people_limit": 6,
        "people_num": 6,
        "distance": 0.0
      },
      {
        "event_id": 12,
        "name": "麥噹噹 YYDS",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0400737,
        "longitude": 121.53261,
        "people_limit": 4,
        "people_num": 2,
        "distance": 502.3
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

- End Point: `/shop/search`
- Method: `GET`
- Request Header;

| Field         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| Authorization | String | Access token preceding `Bearer` . For example: `Bearer token` |

- Request Parameters:

| Field   | Type   | Description         |
| ------- | ------ | ------------------- |
| keyword | String | Keyword of the shop |

- Request Example:

- Request Example: `https://[HOST_NAME]/api/[API_VERSION]/shop/search?keyword=麥當勞-台北濟南餐廳`

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
        "event_id": 1,
        "name": "吃一波",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0388368,
        "longitude": 121.5325665,
        "people_limit": 6,
        "people_num": 6,
        "distance": 0.0
      },
      {
        "event_id": 12,
        "name": "麥噹噹 YYDS",
        "shop_name": "麥當勞-台北濟南餐廳",
        "latitude": 25.0400737,
        "longitude": 121.53261,
        "people_limit": 4,
        "people_num": 2,
        "distance": 502.3
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
