FROM ubuntu:20.04

RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    clang \
    wget \
    git

WORKDIR /app

RUN git clone --recursive https://github.com/dhbloo/rapfi.git

WORKDIR /app/rapfi
RUN mkdir build && cd build && cmake .. -DCMAKE_BUILD_TYPE=Release && cmake --build .

CMD ["./build/rapfi"]
