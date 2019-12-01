async function newTodo(parent, args, context, info) {
  const todo = await context.prisma.createTodo({...args})
  return todo
}

async function doneTodo(parent, args, context, info) {
  return 'done todo'
}

module.exports = {
  newTodo,
  doneTodo
}