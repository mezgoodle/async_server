# python

[![Language](https://img.shields.io/badge/language-python-brightgreen?style=flat-square)](https://uk.wikipedia.org/wiki/Python)

Hello everyone! This is the part of my **async_server** repository with _Python_.

## Table of contents

- [Motivation](#motivation)
- [Build status](#build-status)
- [Badges](#badges)
- [Features](#features)
- [Code Example](#code-example)
- [Installation](#installation)
- [Fast usage](#fast-usage)
- [API Reference](#api-reference)
- [Tests](#tests)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)

## Motivation

I wanted to create REST API service on Python. I do something already [here](https://github.com/mezidia/flask-jobs) with Flask, but I wanted to know if something could be done without libraries. I tried different ways, look for examples in Internet, but just realized that JavaScript will win here. Also I have found tutorial with **FastAPI** and took it. Then I added testing.

## Build status

Here you can see build status of [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration):

![Python application](https://github.com/mezgoodle/async_server/workflows/Python%20application/badge.svg)

## Badges

Other badges

[![Theme](https://img.shields.io/badge/Theme-REST_API-brightgreen?style=flat-square)](https://uk.wikipedia.org/wiki/REST)
[![Platform](https://img.shields.io/badge/Platform-FastAPI-brightgreen?style=flat-square)](https://fastapi.tiangolo.com/)

## Features

On the site you can **get** all cities or a single one, **post** a new one and **delete** something.

## Code Example

- Test script:

```python
import pytest
from httpx import AsyncClient

from ..server import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        response = await ac.get('/')
    assert response.status_code == 200
    assert response.json() == {'msg': 'Hello world!'}


@pytest.mark.asyncio
async def test_failure():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        response = await ac.get('/city')
    assert response.status_code == 404
    assert response.json() == {'detail': 'Not Found'}
```

## Installation

1. Clone this repository:

```bash
git clone https://github.com/mezgoodle/async_server.git
```

2. Move to _python_ folder, activate _virtual environment_ and install dependencies:

```bash
cd python
python -m venv .venv
cd .venv && cd Scripts && activate.bat
сd ../../
uvicorn server:app --reload
```

3. Test the server with [pytest](https://docs.pytest.org/en/stable/):

```bash
pytest
```

## Fast usage

1. Start the server with [uvicorn](https://www.uvicorn.org/):

```bash
uvicorn server:app --reload
```

2. Open `http://127.0.0.1:8000/docs` in browser

## API Reference

Method    | Route     | Argument     | Status code | Description
--------|----------|--------------|---------|------------
GET | `/` | `None` | `200`  | test the work of server
GET | `/cities` | `None` | `200`  | get all cities
GET | `/cities/:id` | `id` | `200`  | get a single city
POST | `/cities` | `None` | `200`  | create a city
DELETE | `/cities/:id` | `id` | `200`  | delete a city

## Tests

All tests are in [test](https://github.com/mezgoodle/async_server/blob/master/python/tests/test_main.py) folder. I'm using [pytest](https://docs.pytest.org/en/stable/) and [httpx](https://github.com/encode/httpx).

## Contribute

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also look at the [CONTRIBUTING.md](https://github.com/mezgoodle/async_server/blob/master/CONTRIBUTING.md).

## Credits

Links to resources which inspired me to build this project:

- [Article about servers on Python](https://iximiuz.com/ru/posts/writing-python-web-server-part-2/)

- [REST-API with aiohttp](https://dev.to/apcelent/how-to-create-rest-api-using-aiohttp-54p1)

- [FastAPI tutorial](https://www.youtube.com/watch?v=BalvzyKg_4k&feature=youtu.be)

- [FastAPI testing](https://fastapi.tiangolo.com/advanced/async-tests/#pytest-asyncio)

## License

MIT © [mezgoodle](https://github.com/mezgoodle)
