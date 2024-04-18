const { Server, User, Users_server } = require("../models/index")

module.exports = {
  getAllServers: async (userId) => {
    try {
      const servers = []
      
      const users = await User.findOne({
        where: { id: userId },
        include: [{
          model: Users_server,
          include: [{
            model: Server
          }]
        }]
      })

      for(let i=0; i<users.Users_servers.length; ++i) {
        servers.push(users.Users_servers[i].Server)
      }

      return { ok: true, data: servers }
    }catch(e) {
      console.log(e)
      return { ok: false }
    }
  }
}