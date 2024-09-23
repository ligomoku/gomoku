ARG DOTNET_OS_VERSION="-alpine"
ARG DOTNET_SDK_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_SDK_VERSION}${DOTNET_OS_VERSION} AS build
WORKDIR /src

COPY GomokuServer/GomokuServer.sln ./
COPY GomokuServer/src/ ./src/

RUN dotnet restore ./src/GomokuServer.Api/GomokuServer.Api.csproj
RUN dotnet publish ./src/GomokuServer.Api/GomokuServer.Api.csproj -c Release -o /app
COPY envs/ /app/envs/

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_SDK_VERSION}
ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080
WORKDIR /app

COPY --from=build /app .
ENTRYPOINT [ "dotnet", "GomokuServer.Api.dll" ]
