FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# Define argument & set default value; can be overwritten with --build-arg <name>=<value>
ARG ARCH=x86
# Workdir in the container
WORKDIR /app

# Copy the source code files to the working directory (need --link flag??)
COPY ShoeTracker/. .
# Installs necessary Nuget packages (-a $ARCH)
RUN dotnet restore
# Install Node
RUN apt-get update && apt-get install -y \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest
# Make directory for the HTTPS certificates
RUN mkdir -p /root/.aspnet/https
# Publish a deploy-ready version of the application (-a $ARCH)
RUN dotnet publish --no-restore -o /app/publish

# Copy Google credentials
COPY creds.json .

# Project built, now actually run it
FROM mcr.microsoft.com/dotnet/aspnet:8.0
# Expose necessary ports
EXPOSE 8080
# Setup workdir on this new container
WORKDIR /app
# Copy from the build container to the run container
COPY --from=build /app/publish .
COPY --from=build /app/creds.json .
# Sets the user to use for subsequent commands
USER $APP_UID
# Run the application
ENTRYPOINT ["./ShoeTracker.Server"]
