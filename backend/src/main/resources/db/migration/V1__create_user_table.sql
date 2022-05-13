create table user(
    id bigint primary key auto_increment,
    name varchar(64) not null,
    email_id varchar(128) unique not null,
    password varchar(256) not null,
    image_url varchar(512),
    reward_points bigint not null default 0
)engine=InnoDB;

insert into user( name, email_id, password, reward_points)
    values
        ( 'Mayank', 'mayank.verma@sjsu.edu','abc', 10),
        ( 'Vivek', 'vivek.joshi@sjsu.edu','abc', 20),
        ( 'Suharsh', 'suharsh.cherukunnonarippa@sjsu.edu','abc', 40),
        ( 'Akshay', 'akshaykumar.bhimsenraokulkarni@sjsu.edu','abc', 10);
