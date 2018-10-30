import pymysql

test_insert_advisor = """
INSERT INTO Advisor
    VALUES ("34567", 0, "Professor");
"""
test_insert = """
INSERT INTO Student
    VALUES ("12345", 1, "Master", "18fall", 3.70, "Machine Learning", "34567");
"""


def connectdb():
    print('connecting to mysql server..')
    db = pymysql.connect("localhost", "root", "", "test")
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


def insertdb(connection, sql):
    with connection.cursor() as cursor:
        sql_split = sql.split(" ")
        if(not checkTableExists(connection, sql_split[2][:-2])):
            try:
                cursor.execute(sql)
            except:
                print("The element have already existed or you have run the wrong query!")
    connection.commit()


def closedb(db):
    db.close()


def main():
    connection = connectdb()
    # insertdb(connection, test_insert_advisor)
    insertdb(connection, test_insert)
    closedb(connection)


if __name__ == '__main__':
    main()