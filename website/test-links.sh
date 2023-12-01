#!/bin/bash
set -e

find_available_port() {
    local port=3000
    while true; do
        if ! nc -z localhost $port &>/dev/null; then
            echo $port
            break
        fi
        port=$((port+1))
    done
}

start_server() {
    echo " 🏗️ - Building docs site... "
    npm run build -- --locale en
    echo " ✅ - Docs site built.  "

    local port=$(find_available_port)
    echo " 👉 Starting server on port $port..."
    npx serve build/ -l $port &
    echo $! > server.pid
    echo $port > server.port
    echo "🚀 - Server started with PID $(cat server.pid) on port $(cat server.port)"
}

wait_for_server() {
    if [ -f server.port ]; then
        local port=$(cat server.port)
        npx wait-on http://localhost:$port
    else
        echo "⛔️ - Server port file not found!"
        exit 1
    fi
}

stop_server() {
    if [ -f server.pid ]; then
        SERVER_PID=$(cat server.pid)
        if ps -p $SERVER_PID > /dev/null; then
           kill $SERVER_PID && echo "Server stopped."
        else
           echo "⛔️ - Server process $SERVER_PID not found. It probably stopped already. :)"
        fi
        rm server.pid server.port
    else
        echo ⛔️ - "No server to stop. PID file not found."
    fi
}

check_links() {
    use_trap=${1:-false}

    if [ ! -f server.port ]; then
        echo "⛔️ - Server is not running. Please start the server first."
        exit 1
    fi
    local port=$(cat server.port)
    local base_url="http://localhost:$port"
    echo "Checking for broken links on $base_url..."

    if [ "$use_trap" = true ]; then
        # Setup trap to catch any error and stop the server
        trap 'echo "Error encountered. Stopping server..."; stop_server; exit 1' ERR
    fi

    npx linkinator $base_url --config linkinator.config.json

    if [ "$use_trap" = true ]; then
        # Disable the trap after successful completion
        trap - ERR
    fi
}

test() {
    start_server
    wait_for_server
    check_links true
}

# Command line argument handling
case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    check)
        check_links
        ;;
    test)
        test
        ;;
    *)
        echo "Usage: $0 {start|stop|check|start-check}"
        exit 1
        ;;
esac
