FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    cmake \
    g++ \
    make \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/GomokuAI

RUN git clone --recurse-submodules https://github.com/vkuprin/rapfi.git rapfi && \
    cd rapfi/Rapfi && \
    mkdir build && cd build && \
    cmake .. \
        -DCMAKE_BUILD_TYPE=Release \
        -DUSE_SSE=ON \
        -DUSE_AVX2=OFF \
        -DUSE_AVX512=OFF \
        -DUSE_BMI2=OFF \
        -DUSE_VNNI=OFF \
        -DUSE_NEON=OFF \
        -DUSE_NEON_DOTPROD=OFF && \
    cmake --build .

WORKDIR /app/GomokuAI/rapfi/Rapfi
COPY wrapper.js .

RUN npm install express

CMD ["node", "wrapper.js"]
