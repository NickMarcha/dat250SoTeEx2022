## Lab Report: Software Technology Experiment Assignment 1, DAT250:

Written by `Nicolas M Mjøs | h578011`

As intelliJ installs JDK's and Maven for you I decided to go forward with the Heroku tutorial until something doesn't work. I've used intelliJ, java and Heroku before, a preliminary glance indicated components were installed.

### Validating Heroku CLI:

```
heroku login
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/[myloginurl]
Logging in... done
Logged in as [my@email.com]
```

CLI gave expected results.

### Validating github:

```
git clone https://github.com/heroku/java-getting-started
Cloning into 'java-getting-started'...
remote: Enumerating objects: 475, done.
remote: Counting objects: 100% (16/16), done.
remote: Compressing objects: 100% (14/14), done.
Receiving objects:  97% (461/475)ed 6 (delta 2), pack-reused 459
Receiving objects: 100% (475/475), 198.15 KiB | 1.08 MiB/s, done.
Resolving deltas: 100% (194/194), done.
```

After this I succesfully pushed to [web dyno](https://cryptic-everglades-35008.herokuapp.com/)

### Verifying billing information(papertrail addon):

```
heroku addons:create papertrail
Creating papertrail on ⬢ cryptic-everglades-35008... !
 !    Please verify your account to install this add-on plan (please enter a credit card) For more information, see
 !    https://devcenter.heroku.com/categories/billing Verify now at https://heroku.com/verify
```

As this step was listed as optional I decided not to go through with it.

### Postgres install:

[Cloud postgres url](https://cryptic-everglades-35008.herokuapp.com/db) validated \
First error:

```
heroku pg:psql
--> Connecting to postgresql-vertical-16394
 !    The local psql command could not be located. For help installing psql, see
 !    https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
```

I followed installation instructions and installed Postgres 14 for Windows and added it to path variables.
Did a chocolaty refreshenv command to keep same terminal open and new results:

```
heroku pg:psql
--> Connecting to postgresql-vertical-16394
psql (14.5, server 14.4 (Ubuntu 14.4-1.pgdg20.04+1))
WARNING: Console code page (850) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

cryptic-everglades-35008::DATABASE=> SELECT * FROM ticks;
            tick
----------------------------
 2022-08-24 09:26:58.910261
 2022-08-24 09:27:01.125702
(2 rows)
```

### Validating Maven through IntellJ

Runnin Maven -> Lifecycle -> Clean :

```
openjdk-17.0.2\bin\java.exe ... clean
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------< com.example:java-getting-started >------------------
[INFO] Building java-getting-started 1.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ java-getting-started ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.703 s
[INFO] Finished at: 2022-08-24T11:51:10+02:00
[INFO] ------------------------------------------------------------------------

Process finished with exit code 0
```

Runnin Maven -> Lifecycle -> Install

```
java.exe ... install
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------< com.example:java-getting-started >------------------
[INFO] Building java-getting-started 1.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- spring-boot-maven-plugin:2.3.0.RELEASE:build-info (default) @ java-getting-started ---
[INFO]
[INFO] --- maven-resources-plugin:3.1.0:resources (default-resources) @ java-getting-started ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 1 resource
[INFO] Copying 7 resources
[INFO]
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ java-getting-started ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to C:\Users\Nicol\OneDrive\Skrivebord\DAT250\Experiment Assignments\expass1\java-getting-started\target\classes
[INFO]
[INFO] --- maven-resources-plugin:3.1.0:testResources (default-testResources) @ java-getting-started ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory C:\Users\Nicol\OneDrive\Skrivebord\DAT250\Experiment Assignments\expass1\java-getting-started\src\test\resources
[INFO]
[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ java-getting-started ---
[INFO] No sources to compile
[INFO]
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ java-getting-started ---
[INFO] No tests to run.
[INFO]
[INFO] --- maven-jar-plugin:3.2.0:jar (default-jar) @ java-getting-started ---
[INFO] Building jar: C:\Users\Nicol\OneDrive\Skrivebord\DAT250\Experiment Assignments\expass1\java-getting-started\target\java-getting-started-1.0.jar
[INFO]
[INFO] --- spring-boot-maven-plugin:2.3.0.RELEASE:repackage (repackage) @ java-getting-started ---
[INFO] Replacing main artifact with repackaged archive
[INFO]
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ java-getting-started ---
[INFO] Installing C:\Users\Nicol\OneDrive\Skrivebord\DAT250\Experiment Assignments\expass1\java-getting-started\target\java-getting-started-1.0.jar to C:\Users\Nicol\.m2\repository\com\example\java-getting-started\1.0\java-getting-started-1.0.jar
[INFO] Installing C:\Users\Nicol\OneDrive\Skrivebord\DAT250\Experiment Assignments\expass1\java-getting-started\pom.xml to C:\Users\Nicol\.m2\repository\com\example\java-getting-started\1.0\java-getting-started-1.0.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  9.269 s
[INFO] Finished at: 2022-08-24T11:53:49+02:00
[INFO] ------------------------------------------------------------------------

Process finished with exit code 0
```

### Technical problem running locally Postgres Auth

Whenever running the `heroku local web` the application would crash with a long stacktrace. Discovered hidden in the stacktrace `null value for password`
after some searching I found [this article](https://devcenter.heroku.com/articles/connecting-to-relational-databases-on-heroku-with-java#using-the-spring_datasource_url-in-a-spring-boot-app) and it notes : \
"However the Postgres JDBC driver uses the following convention:"

```
jdbc:postgresql://<host>:<port>/<dbname>?user=<username>&password=<password>
```

So I added my Postgresql password user and password to the env file and was able to run succesfully with wroking database connection.

**I do wonder if this was the correct solution or if I needlessly added a password to postgres, since it seemed to not come up in the tutorial.**

### Last steps

The rest went smoothly, I added OpenJDK and Maven to path properly so I can fully use command line instead of doing things through IntelliJ as well.
