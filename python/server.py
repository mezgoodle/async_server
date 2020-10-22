import asyncio
import sys

counter = 0

async def run_server(host, port):
    server = await asyncio.start_server(serve_client, host, port)
    await server.serve_forever()

async def serve_client(reader, writer):
    global counter
    cid = counter
    counter += 1
    print(f'Client #{cid} connected')

    request = await read_request(reader)
    if request is None:
        print(f'Client #{cid} unexpectedly disconnected')
    else:
        response = await handle_request(request)
        await write_response(writer, response, cid)

async def read_request(reader, delimiter=b'!'):
    request = bytearray()
    while True:
        chunk = await reader.read(4)
        if not chunk:
            break

        request += chunk
        if delimiter in request:
            return request

    return None

async def handle_request(request):
    await asyncio.sleep(1)
    return request[::-1]

async def write_response(writer, response, cid):
    writer.write(response)
    await writer.drain()
    writer.close()
    print(f'Client #{cid} has been served')

if __name__ == '__main__':
    asyncio.run(run_server('127.0.0.1', 5000))
