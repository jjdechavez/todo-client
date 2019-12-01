function todos (parent, args, context, info) {
  return context.prisma.todos();
}

module.exports = {
  todos
}