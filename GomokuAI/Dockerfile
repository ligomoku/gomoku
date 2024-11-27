FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    cmake \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

# Debug commands to see directory structure
RUN echo "Root directory:" && \
    ls -la && \
    echo "\nContents of rapfi directory:" && \
    ls -la rapfi && \
    echo "\nRecursive find for CMakeLists.txt:" && \
    find . -name "CMakeLists.txt"
