ARG DOTNET_OS_VERSION="-alpine"
ARG DOTNET_SDK_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_SDK_VERSION}${DOTNET_OS_VERSION} AS build

WORKDIR /src
# Copy the entire solution
COPY . .
RUN dotnet restore "GomokuServer/src/GomokuServer.Api/GomokuServer.Api.csproj"
RUN dotnet publish "GomokuServer/src/GomokuServer.Api/GomokuServer.Api.csproj" -c Release -o /app --p:DebugType=None
COPY envs/ /app/envs/

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_SDK_VERSION}${DOTNET_OS_VERSION}
WORKDIR /app

ENV ASPNETCORE_URLS http://+:8080
ENV ASPNETCORE_ENVIRONMENT Production
EXPOSE 8080

COPY --from=build /app .
ENTRYPOINT ["dotnet", "GomokuServer.Api.dll"]
