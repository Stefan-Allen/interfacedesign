FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["testingbackend/testingbackend.csproj", "testingbackend/"]
RUN dotnet restore "testingbackend/testingbackend.csproj"
COPY . .
WORKDIR "/src/testingbackend"
RUN dotnet build "testingbackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "testingbackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "testingbackend.dll"]
