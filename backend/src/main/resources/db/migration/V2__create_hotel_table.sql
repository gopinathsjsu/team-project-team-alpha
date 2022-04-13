create table hotel(
     id bigint primary key auto_increment,
     name varchar(128) not null,
     contact_no varchar(128) not null unique,
     email_id varchar(128) unique not null unique,
     city varchar(128) not null,
     country varchar(128) not null,
     zip_code varchar(128) not null,
     password varchar(256) not null,
     image_url varchar(256)
     /*unique( name, city, country, zip_code)   */
)engine=InnoDB;

insert into hotel(name, contact_no, email_id, city, country, zip_code, password)
    values
        ('Wyndham Garden', '+1-408-453-5340', 'wyndham_hello@gmail.com', 'San Jose', 'USA', '95112', 'abc' ),
        ('Hyatt Place', '+1-669-342-0007', 'hyatt_hello@gmail.com','San Jose', 'USA', '95131', 'abc' ),
        ('La Quinta', '+1-408-435-8800', 'la_quinta_hello@gmail.com','San Jose', 'USA', '95131', 'abc' );
