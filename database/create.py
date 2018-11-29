import pymysql


Project = """CREATE TABLE Project(
    Project_id CHAR(30) NOT NULL,
    Project_Name CHAR(50),
    Sponsor CHAR(30),
    Active BOOLEAN,
    PRIMARY KEY(Project_id)
);"""

Researcher = """CREATE TABLE Researcher(
    Researcher_id CHAR(30) NOT NULL,
    FirstName CHAR(30),
    LastName CHAR(30),
    PRIMARY KEY(Researcher_id)
);"""

Institution = """CREATE TABLE Institution(
    Institution_id CHAR(30) NOT NULL,
    InstitutionType CHAR(30),
    Name CHAR(30),
    PRIMARY KEY(Institution_id)
);"""

ResearchArea = """CREATE TABLE ResearchArea(
    Area_id CHAR(30) NOT NULL,
    Field CHAR(30),
    AreaName CHAR(30),
    PRIMARY KEY(Area_id)
);"""

Advisor = """CREATE TABLE Advisor(
    id CHAR(30) PRIMARY KEY,
    Password CHAR(30) NOT NULL,
    FirstName CHAR(30),
    LastName CHAR(30),
    SeekingStatus INT,
    Title CHAR(30)
);"""

Student = """CREATE TABLE Student(
    id CHAR(30) PRIMARY KEY,
    Password CHAR(30) NOT NULL,
    FirstName CHAR(30),
    LastName CHAR(30),
    SeekingStatus INT,
    Degree CHAR(30),
    SchoolYear CHAR(30),
    GPA FLOAT,
    GroupPreference CHAR(30),
    Advisor CHAR(30),
    FOREIGN KEY (Advisor) REFERENCES Advisor (id)
);"""

Contributor = """CREATE TABLE Contributor(
    Researcher_id CHAR(30),
    Project_id CHAR(30),
    PRIMARY KEY (Researcher_id,Project_id)
);"""

StudentContributor = """CREATE TABLE StudentContributor(
    id CHAR(30),
    Project_id CHAR(30),
    PRIMARY KEY (id,Project_id),
    FOREIGN KEY (id) REFERENCES Student (id),
    FOREIGN KEY (Project_id) REFERENCES Project (Project_id)
);"""

AdvisorContributor = """CREATE TABLE AdvisorContributor(
    id CHAR(30),
    Project_id CHAR(30),
    PRIMARY KEY (id,Project_id),
    FOREIGN KEY (id) REFERENCES Advisor (id),
    FOREIGN KEY (Project_id) REFERENCES Project (Project_id)
);"""

Affliation = """CREATE TABLE Affliation(
    Researcher_id CHAR(30),
    Institution_id CHAR(30),
    PRIMARY KEY (Researcher_id,Institution_id)
);"""

ProjectRelatedArea = """CREATE TABLE ProjectRelatedArea(
    Project_id CHAR(30),
    Area_id CHAR(30),
    PRIMARY KEY (Project_id,Area_id)
);"""

ResearcherRelatedArea = """CREATE TABLE ResearcherRelatedArea(
    Researcher_id CHAR(30),
    Area_id CHAR(30),
    PRIMARY KEY (Researcher_id,Area_id)
);"""

# UserLogin = """CREATE TABLE UserLogin(
#     id CHAR(30) PRIMARY KEY,
#     Password CHAR(20) NOT NULL,
#     FirstName CHAR(20),
#     LastName CHAR(20),
#     SeekingStatus INT,
#     Degree CHAR(15),
#     SchoolYear CHAR(10),
#     GPA FLOAT,
#     GroupPreference CHAR(20),
#     Advisor CHAR(10),
#     FOREIGN KEY (Advisor) REFERENCES Advisor (id)
# );"""


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
    # createdb(connection, Researcher)
    createdb(connection, Institution)
    createdb(connection, ResearchArea)
    createdb(connection, Advisor)
    createdb(connection, Student)
    createdb(connection, Contributor)
    createdb(connection, Affliation)
    createdb(connection, ProjectRelatedArea)
    createdb(connection, ResearcherRelatedArea)
    # createdb(connection, UserLogin)
    closedb(connection)


if __name__ == '__main__':
    main()