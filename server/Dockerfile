FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj first (better layer caching)
COPY ["server.csproj", "./"]
RUN dotnet restore

# Copy everything else
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./
COPY --from=build /app/wwwroot ./wwwroot

# Railway automatically sets PORT environment variable
ENV ASPNETCORE_URLS=http://+:${PORT}

# Add health check endpoint
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:${PORT}/health || exit 1

ENTRYPOINT ["dotnet", "server.dll"]