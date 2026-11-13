#!/usr/bin/env python3
"""Nur statische Dateien auf dem eigenen Rechner ausliefern. Keine Formulardaten."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

class PreviewHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs': 'text/javascript', '.webp': 'image/webp'}

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

    def list_directory(self, path):
        self.send_error(404)

    def log_message(self, fmt, *args):
        pass

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent / 'dist'
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PreviewHandler, directory=str(root)))
    print(f'Local: http://127.0.0.1:{args.port}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
