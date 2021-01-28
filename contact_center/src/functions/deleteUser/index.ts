
export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'DELETE',
        path: 'delete-user/{phoneNumber}',
        cors: true,
      }
    }
  ]
}
