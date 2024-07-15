import express from 'express';
import bodyParser from 'body-parser';

// Mock 数据
const Users = [
    {id: 1, name: '张三', age: 18},
    {id: 2, name: '李四', age: 20},
    {id: 3, name: '王五', age: 22},
];

const app = express();
const port = 3000;

app.use(bodyParser.json());

//查询所有用户列表
app.get('/users', (req, res) => {
    res.json(Users);
});

//根据ID查询用户信息
app.get('/users/:id', (req, res) => {
    const user = Users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

//创建一个新的用户
app.post('/users', (req, res) => {
    const {name, age} = req.body;
    const newUser = {id: Users.length + 1, name, age};
    Users.push(newUser);
    res.status(201).send(newUser);
});

//更新用户信息
app.put('/users/:id', (req, res) => {
    const user = Users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    const {name, age} = req.body;
    user.name = name;
    user.age = age;
    res.send(user);
});

//删除一个用户信息
app.delete('/users/:id', (req, res) => {
    const index = Users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('User not found');
    }
    Users.splice(index, 1);
    res.status(204).send();
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});