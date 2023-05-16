import { loadFiles } from '@graphql-tools/load-files';
import axios from 'axios';
import { createYoga, createSchema } from 'graphql-yoga';
import { createServer } from 'http';

async function getUsers() {
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({ id, name, email, username }) => ({
            id: id,
            name: name,
            email: email,
            login: username,
        }))
    } catch (error) {
        throw error 
    }
}

async function getTodos() {
    try {
        const todos = await axios.get("https://jsonplaceholder.typicode.com/todos")
        // console.log(todos);
        return todos.data.map(({ id, userId, title, completed }) => ({
            id: id,
            title: title,
            completed: completed,
            user_id: userId,
        }))
    } catch (error) {
        throw error 
    }
}


async function todoById(parent, args, context, info) {
    const todos = await getTodos();
    return todos.find(todo => todo.id == args.id);
}

async function userById(parent, args, context, info) {
    const users = await getUsers();
    return users.find(user => user.id == args.id);
}

async function getTodosForUser(parent, args, context, info) {
    const todos = await getTodos();
    return todos.filter(t => t.user_id == parent.id);
}

async function getUserForTodo(parent, args, context, info) {
    const users = await getUsers();
    return users.find(u => u.id == parent.user_id);
}
   
const resolvers = {
    Query: {
        users: () => getUsers(),
        todos: () => getTodos(),
        todo: (parent, args, context, info) => todoById(parent, args, context, info),
        user: (parent, args, context, info) => userById(parent, args, context, info),
    },
    User: {
        todos: (parent, args, context, info) => getTodosForUser(parent, args, context, info)
    },
    ToDoItem: {
        user: (parent, args, context, info) => getUserForTodo(parent, args, context, info)
    },
};

const yoga = createYoga({
    schema: createSchema({
      typeDefs: await loadFiles('./src/schema.graphql'),
      resolvers: resolvers
    })
});

const server = createServer(yoga);
server.listen(4000, () => { console.info('Server is running on http://localhost:4000/graphql') });
