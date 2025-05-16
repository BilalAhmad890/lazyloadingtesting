FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the .csproj file first and restore dependencies
# This allows Docker to cache the restored dependencies layer
COPY server.csproj ./
RUN dotnet restore

# Copy the rest of the application files
COPY . ./

# Publish the application
RUN dotnet publish server.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out .

# Copy wwwroot (if it's not included in the publish output by default, though it should be)
# Ensure wwwroot is correctly copied for static files like images
COPY --from=build /app/wwwroot ./wwwroot

# Expose the port the app runs on. Railway will map this.
# The PORT environment variable is automatically set by Railway.
ENV ASPNETCORE_URLS=http://+:${PORT}

# Add a health check (ensure you have a /health endpoint in your app)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f "http://localhost:${PORT}/health" || exit 1

ENTRYPOINT ["dotnet", "server.dll"]