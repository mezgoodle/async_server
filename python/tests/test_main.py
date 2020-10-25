import pytest
from httpx import AsyncClient

from ..server import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        response = await ac.get('/')
    assert response.status_code == 200
    assert response.json() == {'msg' : 'Hello world!'}


@pytest.mark.asyncio
async def test_failure():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        response = await ac.get('/city')
    assert response.status_code == 404
    assert response.json() == {"detail":"Not Found"}


@pytest.mark.asyncio
async def test_cities():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        response = await ac.get('/cities')
    assert response.status_code == 200
    assert response.json() == [
  {
    "id": 3,
    "name": "Adak",
    "timezone": "America/Adak",
    "current_time": "2020-10-25T00:00:16.304182-09:00"
  },
  {
    "id": 4,
    "name": "Yellowknife",
    "timezone": "America/Yellowknife",
    "current_time": "2020-10-25T03:00:16.352230-06:00"
  },
  {
    "id": 5,
    "name": "Amsterdam",
    "timezone": "Europe/Amsterdam",
    "current_time": "2020-10-25T10:00:16.352080+01:00"
  }
]
