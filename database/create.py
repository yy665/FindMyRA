import pymysql


Project = """CREATE TABLE Project(
    Project_id CHAR(10) NOT NULL,
    Project_Name CHAR(50),
    Sponsor CHAR(20),
    Active BOOLEAN,
    PRIMARY KEY(Project_id)
);"""

Researcher = """CREATE TABLE Researcher(
    Researcher_id CHAR(10) NOT NULL,
    FirstName CHAR(20),
    LastName CHAR(20),
    PRIMARY KEY(Researcher_id)
);"""

Institution = """CREATE TABLE Institution(
    Institution_id CHAR(10) NOT NULL,
    InstitutionType CHAR(10),
    Name CHAR(20),
    PRIMARY KEY(Institution_id)
);"""

ResearchArea = """CREATE TABLE ResearchArea(
    Area_id CHAR(10) NOT NULL,
    Field CHAR(10),
    AreaName CHAR(20),
    PRIMARY KEY(Area_id)
);"""

Advisor = """CREATE TABLE Advisor(
    id CHAR(10) PRIMARY KEY,
    FirstName CHAR(20),
    LastName CHAR(20),
    SeekingStatus INT,
    Title CHAR(20)
);"""

Student = """CREATE TABLE Student(
    id CHAR(10) PRIMARY KEY,
    FirstName CHAR(20),
    LastName CHAR(20),
    SeekingStatus INT,
    Degree CHAR(15),
    SchoolYear CHAR(10),
    GPA FLOAT,
    GropuPreference CHAR(20),
    Advisor CHAR(10),
    FOREIGN KEY (Advisor) REFERENCES Advisor (id)
);"""

Contributor = """CREATE TABLE Contributor(
    Researcher_id CHAR(10),
    Project_id CHAR(10),
    PRIMARY KEY (Researcher_id,Project_id)
);"""

Affliation = """CREATE TABLE Affliation(
    Researcher_id CHAR(10),
    Institution_id CHAR(10),
    PRIMARY KEY (Researcher_id,Institution_id)
);"""

ProjectRelatedArea = """CREATE TABLE ProjectRelatedArea(
    Project_id CHAR(10),
    Area_id CHAR(10),
    PRIMARY KEY (Project_id,Area_id)
);"""

ResearcherRelatedArea = """CREATE TABLE ResearcherRelatedArea(
    Researcher_id CHAR(10),
    Area_id CHAR(10),
    PRIMARY KEY (Researcher_id,Area_id)
);"""


def connectdb():
    print('connecting to mysql server..')
    db = pymysql.connect("localhost", "root", "password", "test")
    print('connected!')
    return db


def checkTableExists(dbcon, tablename):
    dbcur = dbcon.cursor()
    dbcur.execute("""
        SELECT COUNT(*)
        FROM information_schema.tables
        WHERE table_name = '{0}'
        """.format(tablename.replace('\'', '\'\'')))
    if dbcur.fetchone()[0] == 1:
        dbcur.close()
        return True

    dbcur.close()
    return False


def createdb(connection, sql):
    with connection.cursor() as cursor:
        sql_split = sql.split(" ")
        # print(sql_split[2][:-2]))
        if(not checkTableExists(connection, sql_split[2][:-2])):
            cursor.execute(sql)


def closedb(db):
    db.close()


def main():
    connection = connectdb()
    createdb(connection, Project)
    createdb(connection, Researcher)
    createdb(connection, Institution)
    createdb(connection, ResearchArea)
    createdb(connection, Advisor)
    createdb(connection, Student)
    createdb(connection, Contributor)
    createdb(connection, Affliation)
    createdb(connection, ProjectRelatedArea)
    createdb(connection, ResearcherRelatedArea)
    closedb(connection)


if __name__ == '__main__':
    main()