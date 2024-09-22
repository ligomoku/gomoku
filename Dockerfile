ARG DOTNET_OS_VERSION="-alpine"
ARG DOTNET_SDK_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_SDK_VERSION}${DOTNET_OS_VERSION} AS build
WORKDIR /src

COPY GomokuServer/GomokuServer.sln ./
COPY GomokuServer/src src/
COPY GomokuServer/tests tests/
COPY envs/ GomokuServer/envs/

RUN dotnet restore
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_SDK_VERSION}
ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT [ "dotnet", "GomokuServer.Api.dll" ]
