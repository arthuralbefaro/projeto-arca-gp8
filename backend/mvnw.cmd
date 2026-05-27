@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements. See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership. The ASF licenses this file to
@REM you under the Apache License, Version 2.0 (the "License");
@REM you may not use this file except in compliance with the License.
@REM You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing, software
@REM distributed under the License is distributed on an "AS IS" BASIS,
@REM WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM See the License for the specific language governing permissions and
@REM limitations under the License.
@REM ----------------------------------------------------------------------------

@REM Apache Maven Wrapper startup batch script, version 3.3.2

@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0")

@SET MAVEN_PROJECTBASEDIR=%BASE_DIR%

@SET MAVEN_WRAPPER_PROPERTIES=%BASE_DIR%.mvn\wrapper\maven-wrapper.properties

@IF EXIST "%MAVEN_WRAPPER_PROPERTIES%" (
  @FOR /F "usebackq tokens=1,* delims==" %%a IN ("%MAVEN_WRAPPER_PROPERTIES%") DO (
    @IF "%%a"=="distributionUrl" SET "DISTRIBUTION_URL=%%b"
  )
)

@IF NOT DEFINED MAVEN_USER_HOME (
  SET "MAVEN_USER_HOME=%USERPROFILE%\.m2"
)

@FOR %%i IN ("%DISTRIBUTION_URL%") DO SET "distributionFileName=%%~nxi"
@SET "distributionVersion=%distributionFileName:-bin.zip=%"
@SET "distributionDir=%MAVEN_USER_HOME%\wrapper\dists\%distributionVersion%"

@IF NOT EXIST "%distributionDir%" (
  @MKDIR "%distributionDir%"
  @echo Downloading Maven from %DISTRIBUTION_URL%
  @powershell -Command "Invoke-WebRequest -Uri '%DISTRIBUTION_URL%' -OutFile '%distributionDir%\maven.zip'"
  @powershell -Command "Expand-Archive -Path '%distributionDir%\maven.zip' -DestinationPath '%distributionDir%'"
  @DEL "%distributionDir%\maven.zip"
)

@SET "MAVEN_HOME=%distributionDir%\%distributionVersion%"

@CALL "%MAVEN_HOME%\bin\mvn.cmd" %*
