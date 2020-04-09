create user 'schemeuser'@'%' identified by 'userscheme';
create user 'schemeuser'@'localhost' identified by 'userscheme';

grant all privileges on schememodels.* to 'schemeuser'@'%';
grant all privileges on schememodels.* to 'schemeuser'@'localhost';

create table if not exists schememodels.prestocreds (
    id bigint not null auto_increment,
    alias varchar(512) not null default '',
    host varchar(256) not null default '',
    port bigint not null default '8080',
    `catalog` varchar(256) not null default '',
    `schema` varchar(256) not null default '',
    user varchar(256) not null default '',
    primary key (id)
);

create table if not exists schememodels.schemas (
    table_catalog varchar(256) not null,
    table_schema varchar(256) not null,
    table_name varchar(256) not null,
    column_name varchar(256) not null,
    ordinal_position bigint not null,
    column_default varchar(256) default null,
    is_nullable varchar(256) not null default 'YES',
    data_type varchar(256) not null,
    comment varchar(256) default null,
    extra_info varchar(256) default null
);

create table if not exists schememodels.users (
    id bigint not null auto_increment,
    first_name varchar(256) not null,
    last_name varchar(256) not null,
    email varchar(256) not null,
    password varchar(256) not null,
    primary key (id)
);

create table if not exists schememodels.charts (
    id bigint not null auto_increment,
    presto_id bigint not null,
    chart_alias varchar(256) not null,
    chart_query varchar(256) not null,
    chart_type varchar(256) not null,
    primary key (id)
);