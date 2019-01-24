using classico.Models.Entities;
using classico.Models.Node;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Data.Contexts
{
    public class NodesContext: INodesContext
    {
        private readonly IMongoDatabase _db;
        public NodesContext(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }
        public IMongoCollection<Node> Nodes => _db.GetCollection<Node>("nodes");
    }
}
