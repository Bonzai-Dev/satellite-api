
# Satellite-API
Using tools like [OOTK](https://github.com/thkruz/ootk-core), this simple API that is free to use for everyone can track, post, and find information about satellites in space. It also uses data from [KeepTrack](https://keeptrack.space) and [CelesTrak](https://celestrak.org/) to get the TLE data from various satellites in space.

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
