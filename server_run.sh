#!/bin/bash


cd backend


# Setup DB or any other environment variables you want to setup.

mvn clean install
java -jar target/backend-0.0.1-SNAPSHOT.jar
