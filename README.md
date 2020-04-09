# schemestack
A Query Builder utilizing Presto SQL Engine

Hi! Welcome to Scheme!

This project intends to be a fast, no hassle, easy to set up and pain free query builder, utilizing a Presto Cluster to run SQL queries. 

Do you know SQL? Fear Not! If you, or, more likely, your company, use a Presto SQL Cluster as your data processing engine, you can 
connect Scheme painlessly and generate SQL queries effortlessly with the guided query builder. Generate complex queries with multiple
where statements, join statments, orders, and limit statements. More functionality will be rolling out shortly as well and I hope to 
cover all query use cases (Select statements only).

How do I run this project? What dependencies do I need?

Fortunately, all you need is docker desktop or a docker-compose compatible service.

Wow! This program will run the same on any device that is capable of running docker, hassle free! We all hate long and tedious software 
setup processes, so I tried to make this as hassle free as possible!

Steps to Run:
  
  1.) clone this git repository onto your machine
  2.) open powershell/terminal and go to the directory where you downloaded the repository
  3.) in the root folder of the project, type: docker-compose up --build schemefront modelsapi schemeapi schememodels
  4.) wait while docker compiles the project, downloads dependencies, and initializes containers
  3.) once ready, in your browser go to either http://yourhost.com:8088 or, on the machine running docker, http://localhost:8088
  5.) thats it!
  
 Query on I guess!
  
