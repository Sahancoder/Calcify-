"""
Gunicorn configuration for Calcify API
"""
import os

bind = f"0.0.0.0:{os.environ.get('PORT', 8000)}"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
timeout = 120
keepalive = 5
