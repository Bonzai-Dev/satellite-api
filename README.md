
# Satellite-API

A simple API, free for everyone to use to track, post and find information about satellites in space.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

## API Reference

#### Get all satellites
```http
  GET /api/get/satellites
```

#### Get a random satellite
```http
  GET /api/get/satellites/random
```

#### Search satellite
```http
  GET /api/items/${id}
```

#### Get all posted satellites
```http
  GET /api/get/posted-satellites
```

#### Post satellite
```http
  POST /api/post/post-satellites/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. NORAD ID of the satellite |
