FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_OPTIONS="--max_old_space_size=8192"

RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    cmake \
    g++ \
    make \
    python3 \
    openjdk-11-jre \
    nodejs \
    npm && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /emsdk
RUN git clone https://github.com/emscripten-core/emsdk.git . && \
    ./emsdk install latest && \
    ./emsdk activate latest

ENV PATH="/emsdk:/emsdk/upstream/emscripten:$PATH"
ENV EMCC_CLOSURE_ARGS=""

WORKDIR /app
RUN git clone --recurse-submodules https://github.com/vkuprin/rapfi.git rapfi

WORKDIR /app/rapfi/Rapfi
RUN sed -i 's/static_assert(sizeof(Edge) == 16, .*/\/\/&/' /app/rapfi/Rapfi/search/mcts/node.h && \
    mkdir build && cd build && \
    emcmake cmake .. \
        -DCMAKE_BUILD_TYPE=Release \
        -DNO_COMMAND_MODULES=ON \
        -DNO_MULTI_THREADING=ON \
        -DUSE_SSE=OFF \
        -DUSE_AVX2=OFF \
        -DUSE_AVX512=OFF \
        -DUSE_BMI2=OFF \
        -DUSE_VNNI=OFF \
        -Wno-dev && \
    emmake make

RUN mkdir -p /app/wasm-output && \
    cp build/*.wasm build/*.js build/*.data /app/wasm-output/

VOLUME ["/app/wasm-output"]

CMD ["ls", "/app/wasm-output"]
