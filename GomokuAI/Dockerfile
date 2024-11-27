FROM ubuntu:20.04

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    clang \
    wget \
    git

# Создание рабочей директории
WORKDIR /app

# Клонирование репозитория Rapfi
RUN git clone --recursive https://github.com/dhbloo/rapfi.git

# Сборка Rapfi
WORKDIR /app/rapfi
RUN mkdir build && cd build && cmake .. -DCMAKE_BUILD_TYPE=Release && cmake --build .

# Точка входа
CMD ["./build/rapfi"]
