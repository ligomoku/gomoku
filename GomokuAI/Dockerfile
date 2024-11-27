# Шаг 1: Билдер
FROM alpine:latest AS builder

# Установка инструментов сборки
RUN apk add --no-cache build-base cmake git

WORKDIR /app
COPY . /app

# Если Rapfi находится в директории rapfi, укажите правильный путь
RUN cd rapfi/Rapfi && mkdir build && cd build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_FLAGS="-static" && \
    cmake --build .

# Шаг 2: Минимальный образ
FROM alpine:latest

WORKDIR /app

# Копирование скомпилированного бинарника из этапа сборки
COPY --from=builder /app/Rapfi/build/pbrain-rapfi /app/

# Настройка команды запуска
CMD ["/app/pbrain-rapfi"]
