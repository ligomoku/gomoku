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

# Clone the repository with submodules
RUN git clone --recurse-submodules https://github.com/dhbloo/rapfi.git rapfi && \
    cd rapfi && \
    mkdir build && cd build && \
    cmake .. \
        -DCMAKE_BUILD_TYPE=Release \
        -DUSE_SSE=OFF \
        -DUSE_AVX2=OFF \
        -DUSE_AVX512=OFF \
        -DUSE_BMI2=OFF \
        -DUSE_VNNI=OFF \
        -DUSE_NEON=OFF \
        -DUSE_NEON_DOTPROD=OFF && \
    cmake --build .

# Adjust working directory and binary path
WORKDIR /app/GomokuAI/rapfi
CMD ["./build/pbrain-rapfi"]
