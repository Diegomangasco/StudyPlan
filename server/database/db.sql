DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS incompatibilities;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_courses;

CREATE TABLE courses(
    id VARCHAR(7) NOT NULL,
    name VARCHAR(25) NULL,
    CFU INTEGER NULL,
    max_students INTEGER NULL,
    enrolled_students INTEGER NULL,
    preparatory_course VARCHAR(7) NULL,
    PRIMARY KEY("id")
);

INSERT INTO courses(id, name, CFU, max_students, enrolled_students, preparatory_course)
VALUES  ('02GOLOV', 'Architetture dei sistemi di elaborazione', 12, NULL, 1, NULL),
        ('02LSEOV', 'Computer architectures', 12, NULL, 0, NULL),
        ('01SQJOV', 'Data Science and Database Technology', 8, NULL, 0, NULL),
        ('01SQMOV', 'Data Science e Tecnologie per le Basi di Dati', 8, NULL, 1, NULL),
        ('01SQLOV', 'Database systems', 8, NULL, 0, NULL),
        ('01OTWOV', 'Computer network technologies and services', 6, 3, 0, NULL),
        ('02KPNOV', 'Tecnologie e servizi di rete', 6, 3, 0, NULL),
        ('01TYMOV', 'Information systems security services', 12, NULL, 1, NULL),
        ('01UDUOV', 'Sicurezza dei sistemi informativi', 12, NULL, 1, NULL),
        ('05BIDOV', 'Ingegneria del software', 6, NULL, 0, '02GOLOV'),
        ('04GSPOV', 'Software engineering', 6, NULL, 0, '02LSEOV'),
        ('01UDFOV', 'Applicazioni Web I', 6, NULL, 0, NULL),
        ('01TXYOV', 'Web Applications I', 6, 3, 3, NULL),
        ('01TXSOV', 'Web Applications II', 6, NULL, 1, '01TXYOV'),
        ('02GRSOV', 'Programmazione di sistema', 6, NULL, 1, NULL),
        ('01NYHOV', 'System and device programming', 6, 3, 0, NULL),
        ('01SQOOV', 'Reti Locali e Data Center', 6, NULL, 1, NULL),
        ('01TYDOV', 'Software networking', 7, NULL, 2, NULL),
        ('03UEWOV', 'Challenge', 5, NULL, 1, NULL),
        ('01URROV', 'Computational intelligence', 6, NULL, 2, NULL),
        ('01OUZPD', 'Model based software design', 4, NULL, 1, NULL),
        ('01URSPD', 'Internet Video Streaming', 6, 2, 2, NULL);

CREATE TABLE incompatibilities(
    course_A VARCHAR(7) NOT NULL,
    course_B VARCHAR(7) NOT NULL,
    PRIMARY KEY (course_A, course_B)
);

INSERT INTO incompatibilities(course_A, course_B)
VALUES  ('02GOLOV', '02LSEOV'),
        ('01SQJOV', '01SQMOV'),
        ('01SQJOV', '01SQLOV'),
        ('01OTWOV', '02KPNOV'),
        ('01TYMOV', '01UDUOV'),
        ('05BIDOV', '04GSPOV'),
        ('01UDFOV', '01TXYOV'),
        ('02GRSOV', '01NYHOV'),
        ('01SQMOV', '01SQLOV');

CREATE TABLE users(
    id INTEGER NOT NULL,
    name VARCHAR(50) NULL,
    surname VARCHAR(50) NULL,
    email VARCHAR(50) NULL,
    password VARCHAR(50) NULL,
    salt VARCHAR(25) NULL,
    part_time INTEGER NULL, 
    CHECK(part_time=0 OR part_time=1)
    PRIMARY KEY(id)
);

INSERT INTO users(id, name, surname, email, password, salt,  part_time)
VALUES (296762, 'Diego', 'Gasco', 's296762@studenti.polito.it', 'e36e2fd3addb3459e4383dd683e1bdb892d533c9a082635502c44747e84e80a9', '10charl1220d1699', NULL),
       (298754, 'Amine', 'Hamdi', 's298754@studenti.polito.it', 'c48f1cb5959ad9de644cad0ddeeb93ff27024dec8469b3ebb65df16daad57de1', '8ddc7df9db322a76', NULL),
       (285697, 'Enrico', 'Magliano', 's285697@studenti.polito.it', '2b5dd101906e53a1e710e2f0ab2e6845b0d70ee555f4b197c461d235b4174ed2', '16ddf587ff12sse1', 1),
       (298454, 'Luigi', 'Molinengo', 's298454@studenti.polito.it', '715546c3ce7cc3edfdbc39d8e30fcbacbb5642630f619aa1e94bc1750c3d19e8', '72e4eeb14def3b21', 0),
       (265835, 'Davide', 'Aimar', 's265835@studenti.polito.it', '09fac4f6e5a27d584508b2d8f6e86e510cdcbc6e193611bdddd1e500d1527aa6', 'de456ddefhy52yt', 1);

-- password1, password2, ...

CREATE TABLE users_courses(
    sid INTEGER NOT NULL,
    cid VARCHAR(7) NOT NULL,
    PRIMARY KEY("sid", "cid")
);

INSERT INTO users_courses(sid, cid)
VALUES  (285697, '02GOLOV'),
        (285697, '01URSPD'),
        (285697, '01TYDOV'),
        (285697, '01TXYOV'),
        (298454, '02GRSOV'),
        (298454, '01TXYOV'),
        (298454, '01TXSOV'),
        (298454, '01UDUOV'),
        (298454, '01OUZPD'),
        (298454, '01URROV'),
        (298454, '01SQMOV'),
        (298454, '03UEWOV'),
        (298454, '01TYDOV'),
        (298454, '01URSPD'),
        (265835, '01TYMOV'),
        (265835, '01SQOOV'),
        (265835, '01TXYOV'),
        (265835, '01URROV');

