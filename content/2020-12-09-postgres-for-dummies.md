---
date: 2020-12-09
featured: true
title: "Postgresql for dummies"
cover: "https://i.imgur.com/xxKNSK6.jpg"
categories: 
    - Programming
tags:
    - database
    - postgresql
    - sql
    - nosql
    - data
slug: "/postgresql-for-dummies"
---

## Installation

Postgres is an open-source RDBMS that can be hosted independently on a machine, or hosted via a database service using EDB. PostgreSQL can be installed in different ways depending on the operating system that is being used.

- macOS: There are 3 main ways of installing Postgres on macOS - Installation via interactive EDB, installation using postgres.app made specifically for macOS, or installation using homebrew. More details can be found on this [link](https://www.postgresql.org/download/macosx/)

- Windows: Postgres can be installed on Windows using the EDB installer. Follow this [link](https://www.postgresql.org/download/windows/) to get more information.

- Linux: Postgres is available as a package that can be installed using the package management systems provided by Linux. This [link](https://www.postgresql.org/download/linux/) provides basic information for the installation procedure.

## Running the system

This section will discuss how to run PostgreSQL on Mac, and how to initiate the DB via the command line.


1. The Postgres usually keeps all its data in the path `/usr/local/var/postgres`. This path must be initiated so that the DB would start storing the databases and relations in this path.
```javascript
initdb /usr/local/var/postgres -E utf8
```

2. Run Postgresql on MacOS
```javascript
brew services start postgres
```

3. During the `initdb` phase, a database with the name `<user>` should be created. If this is not created, a manual creation would be necessary.
```javascript
createdb <user>
```

4. The psql acts like a command-line client to issue commands to your database. This can be started using the command
```javascript
psql
```

## Create a new user and grant permissions

By default, all the databases under Postgres will be created under the main user. This main user contains superuser permissions. Normally you would want to create a database and give permissions to access DB at various levels.

- Create a new user by issuing the following command:

```javascript
CREATE USER <username>
```

- Set a password to this user by the following command:

```javascript
ALTER USER <username> with encrypted password '<password>';
```

- Provide permissions to this user using the command:

```javascript
ALTER USER <username> with CREATEDB;
```

The other permissions that can be added to the user include the following:
1. LOGIN / NOLOGIN: Allow (or not) to login to PostgreSQL
2. SUPERUSER/NOSUPERUSER - Provide (or not) superuser permissions on the user. A database superuser will bypass other permission checks, except for LOGIN.
3. CREATEROLE - Allow (or not) the user to create various roles with different permissions on the DB
4. CREATEDB/NOCREATEDB - Allow (or not) the user to create new Databases.
5. REPLICATION - Grant (or not) replication permissions
6. CREATEUSER / NOCREATEUSER: Allow (or not) the ability to create new users.


## Createrole and alter role permissions

Sometimes we require a group of permissions to be given to several users. Instead of adding individual permissions to each user, a **role** can be created. Any new user that is created can be assigned a particular role. 

- Create a new role:
```javascript
CREATE ROLE <groupname> WITH <role1>, <role2>;
```

- The `GRANT` command can be used to provide a role to the user.
```javascript
GRANT <groupname> TO <username>
```

- The `REVOKE` command can be used to remove a role from the user.
```javascript
REVOKE <groupname> TO <username>
```

## Play with PSQL

Command-line tools are especially helpful when you are trying to visualize your database. You'd want to check what databases are present, what type of relations are present in your database. Note that all these commands should be used in **PSQL**

- List all your users in the system use
```javascript
\du
```
![userrole](https://i.imgur.com/9CMoxmP.png)

- List all the databases using the command
```javascript
\l
```
![databases](https://i.imgur.com/fneMzN0.png)

- To select a database and list the relations in the database
```javascript
\c <database name>
\dt
```
![relations](https://i.imgur.com/QI3KQ1I.png)

- When a database owner is a different user, the psql command-line interface should be launched with different user permissions. This can be done using
```javascript
psql -h localhost -p 5432 -U postgres
```
![user change](https://i.imgur.com/vV80Phf.png)

- To understand the schema of any given relation within a database
```javascript
 \d "<relation name>"
```
![schema](https://i.imgur.com/JfmUB9b.png)

And finally, now that you know the basics of working with Postgres, it is time to create new databases and explore various functionalities on your own. Just write your queries in a `.sql` file and execute it using the command:

```javascript
psql -f <filepath> -q <dbname> <username>
```

That's all for today, see you in the next article.
