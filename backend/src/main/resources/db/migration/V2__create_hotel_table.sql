-- create table hotel(
--      id bigint primary key auto_increment,
--      name varchar(128) not null,
--      contact_no varchar(128) not null unique,
--      email_id varchar(128) unique not null unique,
--      city varchar(128) not null,
--      country varchar(128) not null,
--      zip_code varchar(128) not null,
--      password varchar(256) not null,
--      image_url varchar(256),
--      service_list json not null
-- )engine=InnoDB;

create table hotel(
                      id bigint primary key auto_increment,
                      name varchar(128) not null,
                      contact_no varchar(128),
                      description varchar(128),
                      email_id varchar(128) unique not null unique,
                      city varchar(128),
                      country varchar(128),
                      zip_code varchar(128),
                      password varchar(256) not null,
                      image_url varchar(512),
                      service_list json
)engine=InnoDB;

insert into hotel(name, contact_no, email_id, city, country, zip_code, password, service_list)
    values
        ('Wyndham Garden', '+1-408-453-5340', 'wyndham_hello@gmail.com', 'San Jose', 'USA', '95112', 'abc',  '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]'),
        ('Hyatt Place', '+1-669-342-0007', 'hyatt_hello@gmail.com','San Jose', 'USA', '95131', 'abc',  '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]'),
        ('La Quinta', '+1-408-435-8800', 'la_quinta_hello@gmail.com','San Jose', 'USA', '95131', 'abc',  '[ { "type": "FITNESS_ROOM", "cost": 50 }, { "type": "SWIMMING_POOL", "cost": 50 }, { "type": "DAILY_PARKING", "cost": 50 }, { "type": "CONTINENTAL_BREAKFAST", "cost": 50 }, { "type": "ALL_MEALS_INCLUDED", "cost": 50 }]');
