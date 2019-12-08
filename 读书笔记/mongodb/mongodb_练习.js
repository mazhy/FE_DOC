//1.进入my_test数据库
use my_test
//2.向数据库的user集合中插入一个文档
db.user.insert({name:'zhangsan',age:23});
//3.查询user集合中的文档
db.user.find({});
//4.向数据库的user集合中插入一个文档	
db.user.insertOne({name:'sunwukong',age: 23, gender:'male'});
//5.查询数据库user集合中的文档
db.user.find({});
//6.统计数据库user集合中的文档数量
db.user.find().count();
//7.查询数据库user集合中username为sunwukong的文档
db.user.find({username: 'sunwukong'});
//8.向数据库user集合中的username为sunwukong的文档，添加一个address属性，属性值为huaguoshan
db.user.insert({username:'shaheshang',age:23});
db.user.update({username:'shaheshang'},{$set:{address:'liushahe'}});

//9.使用{username:"tangseng"} 替换 username 为 zhubajie的文档
db.user.replaceOne({username:'tangseng'},{username:'zhubajie'});

//10.删除username为sunwukong的文档的address属性
db.user.find({username:'sunwukong'})
db.user.update({username:'sunwukong'},{$unset:{address:0}});//删除第一个

//11.向username为sunwukong的文档中，添加一个hobby:{cities:["beijing","shanghai","shenzhen"] , movies:["sanguo","hero"]}
db.user.update({username:'sunwukong'},{$set:{hobby:{cities:["beijing","shanghai","shenzhen"] , movies:["sanguo","hero"]}}});
//12.向username为tangseng的文档中，添加一个hobby:{movies:["A Chinese Odyssey","King of comedy"]}
db.user.find({username:'tangseng'});
db.user.insert({username:'tangseng',age:22,gender:'male'});
//13.查询喜欢电影hero的文档
v//14.向tangseng中添加一个新的电影Interstellar
//15.删除喜欢beijing的用户
//16.删除user集合

//17.向numbers中插入20000条数据


//18.查询numbers中num为500的文档
//19.查询numbers中num大于5000的文档
//20.查询numbers中num小于30的文档
//21.查询numbers中num大于40小于50的文档
//22.查询numbers中num大于19996的文档
//23.查看numbers集合中的前10条数据
//24.查看numbers集合中的第11条到20条数据
//25.查看numbers集合中的第21条到30条数据

//26.将dept和emp集合导入到数据库中
db.dept.insert([
{
  "_id" : ObjectId("5941f2bac1bc86928f4de49a"),
  "deptno" : 10.0,
  "dname" : "财务部",
  "loc" : "北京"
},
{
  "_id" : ObjectId("5941f2bac1bc86928f4de49b"),
  "deptno" : 20.0,
  "dname" : "办公室",
  "loc" : "上海"
},
{
  "_id" : ObjectId("5941f2bac1bc86928f4de49c"),
  "deptno" : 30.0,
  "dname" : "销售部",
  "loc" : "广州"
},
{
  "_id" : ObjectId("5941f2bac1bc86928f4de49d"),
  "deptno" : 40.0,
  "dname" : "运营部",
  "loc" : "深圳"
}

]);

db.emp.insertMany([
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4ac"),
  "empno" : 7369.0,
  "ename" : "林冲",
  "job" : "职员",
  "mgr" : 7902.0,
  "hiredate" : ISODate("1980-12-16T16:00:00Z"),
  "sal" : 800.0,
  "depno" : 20.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4ad"),
  "empno" : 7499.0,
  "ename" : "孙二娘",
  "job" : "销售",
  "mgr" : 7698.0,
  "hiredate" : ISODate("1981-02-19T16:00:00Z"),
  "sal" : 1600.0,
  "comm" : 300.0,
  "depno" : 30.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4ae"),
  "empno" : 7521.0,
  "ename" : "扈三娘",
  "job" : "销售",
  "mgr" : 7698.0,
  "hiredate" : ISODate("1981-02-21T16:00:00Z"),
  "sal" : 1250.0,
  "comm" : 500.0,
  "depno" : 30.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4af"),
  "empno" : 7566.0,
  "ename" : "卢俊义",
  "job" : "经理",
  "mgr" : 7839.0,
  "hiredate" : ISODate("1981-04-01T16:00:00Z"),
  "sal" : 2975.0,
  "depno" : 20.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b0"),
  "empno" : 7654.0,
  "ename" : "潘金莲",
  "job" : "销售",
  "mgr" : 7698.0,
  "hiredate" : ISODate("1981-09-27T16:00:00Z"),
  "sal" : 1250.0,
  "comm" : 1400.0,
  "depno" : 30.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b1"),
  "empno" : 7698.0,
  "ename" : "西门庆",
  "job" : "经理",
  "mgr" : 7839.0,
  "hiredate" : ISODate("1981-04-30T16:00:00Z"),
  "sal" : 2850.0,
  "depno" : 30.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b2"),
  "empno" : 7782.0,
  "ename" : "柴进",
  "job" : "经理",
  "mgr" : 7839.0,
  "hiredate" : ISODate("1981-06-08T16:00:00Z"),
  "sal" : 2450.0,
  "depno" : 10.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b3"),
  "empno" : 7788.0,
  "ename" : "公孙胜",
  "job" : "分析师",
  "mgr" : 7566.0,
  "hiredate" : ISODate("1987-07-12T16:00:00Z"),
  "sal" : 3000.0,
  "depno" : 20.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b4"),
  "empno" : 7839.0,
  "ename" : "宋江",
  "job" : "董事长",
  "hiredate" : ISODate("1981-11-16T16:00:00Z"),
  "sal" : 5000.0,
  "depno" : 10.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b5"),
  "empno" : 7844.0,
  "ename" : "阎婆惜",
  "job" : "销售",
  "mgr" : 7698.0,
  "hiredate" : ISODate("1981-09-07T16:00:00Z"),
  "sal" : 1500.0,
  "comm" : 0.0,
  "depno" : 30.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b6"),
  "empno" : 7876.0,
  "ename" : "李逵",
  "job" : "职员",
  "mgr" : 7902.0,
  "hiredate" : ISODate("1987-07-12T16:00:00Z"),
  "sal" : 1100.0,
  "depno" : 20.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b7"),
  "empno" : 7900.0,
  "ename" : "武松",
  "job" : "职员",
  "mgr" : 7782.0,
  "hiredate" : ISODate("1981-12-02T16:00:00Z"),
  "sal" : 950.0,
  "depno" : 10.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b8"),
  "empno" : 7902.0,
  "ename" : "吴用",
  "job" : "分析师",
  "mgr" : 7566.0,
  "hiredate" : ISODate("1981-12-02T16:00:00Z"),
  "sal" : 3000.0,
  "depno" : 20.0
},
{
  "_id" : ObjectId("5941f5bfc1bc86928f4de4b9"),
  "empno" : 7934.0,
  "ename" : "鲁智深",
  "job" : "职员",
  "mgr" : 7782.0,
  "hiredate" : ISODate("1982-01-22T16:00:00Z"),
  "sal" : 1300.0,
  "depno" : 10.0
}

]);
//27.查询工资小于2000的员工
//28.查询工资在1000-2000之间的员工
//29.查询工资小于1000或大于2500的员工
//30.查询财务部的所有员工
//31.查询销售部的所有员工
//32.查询所有mgr为7698的所有员工
//33.为所有薪资低于1000的员工增加工资400元










































