from aiohttp.web import Application, run_app

from . import controller
from . import models
from sqlalchemy import engine_from_config


notes = {}
app = Application()
person_resource = controller.RestResource(
    'notes',
    models.Note,
    notes,
    ('title',
     'description',
     'created_at',
     'created_by',
     'priority'),
    'title')
person_resource.register(app.router)


if __name__ == '__main__':
    run_app(app)
