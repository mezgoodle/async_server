import inspect
import json
from collections import OrderedDict
from ..models import models
from aiohttp.http_exceptions import HttpBadRequest
from aiohttp.web_exceptions import HTTPMethodNotAllowed
from aiohttp.web import Request, Response
from aiohttp.web_urldispatcher import UrlDispatcher

DEFAULT_METHODS = ('GET', 'POST', 'PUT', 'DELETE')


class RestEndpoint:
    def __init__(self) -> None:
        self.methods = {}
        for method_type in DEFAULT_METHODS:
            method = getattr(self, method_type.lower(), None)
            if method:
                self.register_method(method_type, method)

    def register_method(self, method_type, method):
        self.methods[method_type.upper()] = method
