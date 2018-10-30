import pymysql


test_sql = """SELECT dii FROM Student"""


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


def querydb(connection, sql):
    with connection.cursor() as cursor:
        sql_split = sql.split(" ")
        if(not checkTableExists(connection, sql_split[2][:-2])):
            try:
                cursor.execute(sql)
                result = cursor.fetchone()
                print(result)
            except:
                print("you have run the wrong query!")


def closedb(db):
    db.close()


def main():
    connection = connectdb()
    querydb(connection, test_sql)
    closedb(connection)


if __name__ == '__main__':
    main()