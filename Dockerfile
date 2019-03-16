FROM microsoft/dotnet:latest
COPY . /app
WORKDIR /app
RUN dotnet restore
RUN dotnet build

EXPOSE 44312/tcp
ENV ASPNETCORE_URLS http://*:44312
ENV ASPNETCORE_ENVIRONMENT docker

ENTRYPOINT dotnet run