#!/bin/bash
source "$(dirname "$0")/.venv/bin/activate"
exec python "$(dirname "$0")/manage.py" runserver 0.0.0.0:8000
