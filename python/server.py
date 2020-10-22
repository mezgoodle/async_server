import os
import socket
import sys
import time

def run_server(port=53210):
    serv_sock = create_serv_sock(port)
    active_children = set()
    cid = 0
    while True:
        client_sock = accept_client_conn(serv_sock, cid)
        child_pid = serve_client(client_sock, cid)
        active_children.add(child_pid)
        reap_children(active_children)
        cid += 1

def serve_client(client_sock, cid):
    child_pid = os.fork()
    if child_pid:
        client_sock.close()
        return child_pid

    request = read_request(client_sock)
    if request is None:
        print(f'Client #{cid} unexpectedly disconnected')
    else:
        response = handle_request(request)
        write_response(client_sock, response, cid)
    os._exit(0)

def reap_children(active_children):
    for child_pid in active_children.copy():
        child_pid, _ = os.waitpid(child_pid, os.WNOHANG)
        if child_pid:
            active_children.discard(child_pid)

def create_serv_sock(serv_port):
    serv_sock = socket.socket(socket.AF_INET,
                            socket.SOCK_STREAM,
                            proto=0)
    serv_sock.bind(('', serv_port))
    serv_sock.listen()
    return serv_sock

def accept_client_conn(serv_sock, cid):
    client_sock, client_addr = serv_sock.accept()
    print(f'Client #{cid} connected '
        f'{client_addr[0]}:{client_addr[1]}')
    return client_sock

def read_request(client_sock, delimiter=b'!'):
    request = bytearray()
    try:
        while True:
            chunk = client_sock.recv(4)
            if not chunk:
                return None

            request += chunk
            if delimiter in request:
                return request

    except ConnectionResetError:
        return None
    except:
        raise

def handle_request(request):
    time.sleep(5)
    return request[::-1]

def write_response(client_sock, response, cid):
    client_sock.sendall(response)
    client_sock.close()
    print(f'Client #{cid} has been served')


if __name__ == '__main__':
    run_server()