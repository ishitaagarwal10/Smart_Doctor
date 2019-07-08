# sih_trial
trial run
-------------------------------elastic beanstalk-----------------------------
we are using this for hosting java API on aws sever.For this we have to create a new env with tomcat platform.
go to config tab and change the RDS config of EBS and create a RDS instance with is used by API.
for deploying API press upload button and give the path of war file and version no.These war file with different version get stored in seprate 
s3 bucket.Then copy the endpoint of env and paste it in browser this will call the API and can use this endpoint address in our nodejs file.
--------------------------------RDS-------------------------------------------------
go to create new instance and select database type as MySQL and select the db engine type as default and select amount of the size allocated 
as default.select the port no as 3306.Now give the db name and master user id and password as "root" and "doctalk2019".After these things 
create security grp for port 3306 and give aceess as anywhere and select the default IP by going inside inbounds settings.
---------------------------------connecting RDS with local MySQL workbench--------------
open new conn tab in mySQL workbench give the conn name any instead of localhost give the endpoint address of RDS instance and set the port as 3306
and master id and password.this will allow to access the RDS instance and then run all the create table and insert command by using "code.txt" file.
