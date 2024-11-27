# Используем базовый образ
FROM alpine:latest

# Устанавливаем зависимости
RUN apk add --no-cache \
    git \
    build-base \
    cmake \
    g++ \
    gcc \
    make

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем проект
COPY . .

# Сборка проекта
RUN cd rapfi/Rapfi && \
    mkdir build && cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_FLAGS="-static" && \
    cmake --build .

# Указываем исполняемый файл
CMD ["./rapfi/Rapfi/build/pbrain-rapfi"]
