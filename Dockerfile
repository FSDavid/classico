FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 53954
EXPOSE 44312

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY classico/classico.csproj classico/
RUN dotnet restore classico/classico.csproj
COPY . .
WORKDIR /src/classico
RUN dotnet build classico.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish classico.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "classico.dll"]
