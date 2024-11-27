FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    cmake \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/GomokuAI

# Clone and check structure
RUN git clone --recurse-submodules https://github.com/dhbloo/rapfi.git rapfi && \
    echo "Contents of rapfi directory:" && \
    ls -la rapfi && \
    echo "\nRecursive find for CMakeLists.txt:" && \
    find rapfi -name "CMakeLists.txt" && \
    echo "\nContents of key subdirectories:" && \
    ls -la rapfi/Rapfi 2>/dev/null || echo "No Rapfi directory" && \
    ls -la rapfi/src 2>/dev/null || echo "No src directory"
